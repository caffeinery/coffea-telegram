import dude from 'debug-dude'
const { log } = dude('coffea-telegram:events')

import { connection, message, command, error } from 'coffea'

const isPrivate = (evt) =>
  evt.chat && evt.chat.type === 'private'

const getChat = (evt) =>
  isPrivate(evt) ? evt.from && evt.from.id : evt.chat && evt.chat.id

const getUser = (evt) =>
  evt.from && evt.from.id

const makeForward = (dispatch) =>
  (evtName) => (evt) => dispatch({
    type: evtName,
    chat: getChat(evt),
    user: getUser(evt), // user
    text: evt.text,
    data: evt[evtName],
    raw: evt
  })

const validCommand = (me, cmd) => {
  if (cmd.length > 1) { // /command@botusername syntax was used
    // true if: bot already knows its username and it matches
    return me && cmd[1] === me.username
  }

  // global /command syntax was used
  return true
}

export default function events (bot, dispatch) {
  let me
  bot.getMe().then(
    (user) => {
      me = user
      dispatch(connection({ me }))
    }
  )

  const forward = makeForward(dispatch)

  bot.on('text', (evt) => dispatch(message({
    chat: getChat(evt), // chat
    user: getUser(evt), // user
    text: evt.text, // message
    private: isPrivate(evt), // private message or not?
    raw: evt // rest of the options
  })))

  bot.on('text', (evt) => {
    log('message event received: %o', evt)

    /*
     * Check if we're dealing with a command, and emit a `command` event if so.
     *
     * The entities are parsed to ensure that formatted text beginning with
     * a slash isn't erroneously interpreted as a command.
     *
     * Examples of valid commands:
     *
     * /np username
     * /np@nowplayingbot username
     */

    let isCommand = false
    let cmdEntity

    if (evt.entities) {
      for (const entity of evt.entities) {
        if (entity.type === 'bot_command' && entity.offset === 0) {
          isCommand = true
          cmdEntity = entity
          break
        }
      }
    }

    if (!isCommand) return

    log(' |-> command detected')

    let cmd = evt.text.slice(1, cmdEntity.length).split('@')

    // .filter(Boolean) is used to filter out empty string
    let args = evt.text.slice(cmdEntity.length + 1).split(/\s+/).filter(Boolean)

    if (validCommand(me, cmd)) {
      log(' `-> valid command "%s" with args: %o', cmd[0], args)
      return dispatch(command({
        chat: getChat(evt), // chat
        user: getUser(evt), // user
        cmd: cmd[0], // cmd
        args, // args
        raw: evt // rest of the options
      }))
    } else {
      log(' !-> wrong recipient "%s", expected "%s"', cmd[1], me.username)
    }
  })

  bot.on('audio', forward('audio'))
  bot.on('document', forward('document'))
  bot.on('photo', forward('photo'))
  bot.on('sticker', forward('sticker'))
  bot.on('video', forward('video'))
  bot.on('video_note', forward('video_note'))
  bot.on('voice', forward('voice'))
  bot.on('contact', forward('contact'))
  bot.on('location', forward('location'))
  bot.on('new_chat_members', forward('new_chat_members'))
  bot.on('left_chat_member', forward('left_chat_member'))
  bot.on('new_chat_title', forward('new_chat_title'))
  bot.on('new_chat_photo', forward('new_chat_photo'))
  bot.on('delete_chat_photo', forward('delete_chat_photo'))
  bot.on('group_chat_created', forward('group_chat_created'))
  bot.on('callback_query', forward('callback_query'))
  bot.on('inline_query', forward('inline_query'))
  bot.on('chosen_inline_result', forward('chosen_inline_result'))
  bot.on('edited_message', forward('edited_message'))
  bot.on('edited_message_text', forward('edited_message_text'))
  bot.on('edited_message_caption', forward('edited_message_caption'))
  bot.on('channel_post', forward('channel_post'))
  bot.on('edited_channel_post_text', forward('edited_channel_post_text'))
  bot.on('edited_channel_post_caption', forward('edited_channel_post_caption'))
  bot.on('shipping_query', forward('shipping_query'))
  bot.on('pre_checkout_query', forward('pre_checkout_query'))

  bot.on('error', (err) => dispatch(error({ err })))
}
