import dude from 'debug-dude'
const { log } = dude('coffea-telegram:events')

import { message, command, error } from 'coffea'

const getSender = (evt) =>
  evt.chat && evt.chat.id !== evt.from.id ? evt.chat.id : evt.from.id

const makeForward = (dispatch) =>
  (evtName) => (evt) => dispatch({
    ...evt,
    type: evtName,
    sender: getSender(evt),
    text: evt.text
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
    }
  )

  const forward = makeForward(dispatch)

  bot.on('message', (evt) => dispatch(message(
    getSender(evt), // sender
    evt.text // message
    // ,evt // rest of the options
    // FIXME: type is getting overwritten right now
  )))

  bot.on('message', (evt) => {
    log('message event received: %o', evt)
    if (evt.text.charAt(0) === '/') { // example: /np@nowplayingbot username
      log(' |-> command detected')
      let args = evt.text.substring(1).split(' ') // [ 'np@nowplayingbot', 'username' ]
      let cmd = args.shift().split('@') // [ 'np', 'nowplayingbot' ]
      // args is now [ 'username' ]
      if (validCommand(me, cmd)) {
        log(' `-> valid command "%s" with args: %o', cmd[0], args)
        return dispatch(command(
          getSender(evt), // sender
          cmd[0], // cmd
          args // args
          // ,evt // rest of the options
        ))
      } else log(' !-> wrong recipient "%s", expected "%s"', cmd[1], me.username)
    }
  })

  bot.on('audio', forward('audio'))
  bot.on('document', forward('document'))
  bot.on('photo', forward('photo'))
  bot.on('sticker', forward('sticker'))
  bot.on('video', forward('video'))
  bot.on('voice', forward('voice'))
  bot.on('contact', forward('contact'))
  bot.on('location', forward('location'))
  bot.on('new_chat_participant', forward('new_chat_participant'))
  bot.on('left_chat_participant', forward('left_chat_participant'))
  bot.on('new_chat_title', forward('new_chat_title'))
  bot.on('new_chat_photo', forward('new_chat_photo'))
  bot.on('delete_chat_photo', forward('delete_chat_photo'))
  bot.on('group_chat_created', forward('group_chat_created'))
  bot.on('inline_query', forward('inline_query'))
  bot.on('chosen_inline_result', forward('chosen_inline_result'))

  bot.on('error', (err) => dispatch(error(err)))
}
