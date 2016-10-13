# coffea-telegram

_telegram plugin for [coffea 1.0-beta](https://github.com/caffeinery/coffea/tree/1.0-beta)_


## Setup

 * Make sure to use the latest *beta* version of coffea by running: `npm install --save coffea@beta`
 * Install `coffea-telegram`: `npm install coffea-telegram`


## Usage

Specify the telegram protocol in your network config:

```js
{
  "protocol": "telegram",
  "token": "TOKEN"
}
```

coffea will automatically load `coffea-telegram` when it's needed! Thus, using telegram (or other protocols) this way should work on **any** coffea project, **without any tweaks** (other than installing `coffea-telegram` and specifying the config).

`coffea-telegram` aims to be compatible with coffea. Of course, features that telegram doesn't have (like joining channels) aren't available for telegram protocols, they will just
be ignored.


## Special Events

Telegram has some special events that IRC doesn't have, you can listen to them just like listening to messages and other events:

```
networks.on('EVENTNAME', (event, reply) => {
  console.log(event)
})
```

The following events are available: `text`, `audio`, `document`, `photo`, `sticker`, `video`, `voice`, `contact`, `location`, `new_chat_participant`, `left_chat_participant`, `new_chat_title`, `new_chat_photo`, `delete_chat_photo`, `group_chat_created`, [`callback_query`](https://core.telegram.org/bots/api#callbackquery), [`inline_query`](https://core.telegram.org/bots/api#inlinequery), [`chosen_inline_result`](https://core.telegram.org/bots/api#choseninlineresult), `edited_message`, `edited_message_text`, `edited_message_caption`

If you want to use inline queries, make sure to [enable inline mode](https://core.telegram.org/bots/api#inline-mode).

For some example bots, check out the [coffea-bots organisation](https://github.com/coffea-bots)
for existing bots, or the [coffea-starter repo](https://github.com/coffea-bots/coffea-starter),
if you want to create your own bot.


## Telegram API

You can use:

```js
networks.send({
  type: 'FUNCTION_NAME',
  arguments
})
```

to access the [telegram api](https://github.com/yagop/node-telegram-bot-api#api-reference).
All arguments have the same names, except `chatId` has been changed to `chat`
to be consistent with other coffea protocols and allow `reply` to work.

Here is an example:

```js
networks.send({
  type: 'getMe'
}).then(
  me => console.log(me)
)
```
