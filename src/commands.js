export default function makeCommands (bot) {
  return {
    // TODO: standardize these commands and document in coffea
    //       e.g. message(...), me(), photo(...), ...
    'message': (event) =>
      bot.sendMessage(event.chat, event.text, event.options),
    'getMe': (event) =>
      bot.getMe(),
    'setWebHook': (event) =>
      bot.setWebHook(event.url, event.cert),
    'getUpdates': (event) =>
      bot.getUpdates(event.id, event.results, event.options),
    'answerInlineQuery': (event) =>
      bot.answerInlineQuery(event.id, event.results, event.options),
    'forwardMessage': (event) =>
      bot.forwardMessage(event.id, event.fromChatId, event.messageId),
    'sendPhoto': (event) =>
      bot.sendPhoto(event.id, event.photo, event.options),
    'sendAudio': (event) =>
      bot.sendAudio(event.id, event.audio, event.options),
    'sendDocument': (event) =>
      bot.sendDocument(event.id, event.document, event.options),
    'sendSticker': (event) =>
      bot.sendSticker(event.id, event.sticker, event.options),
    'sendVideo': (event) =>
      bot.sendVideo(event.id, event.video, event.options),
    'sendVoice': (event) =>
      bot.sendVoice(event.id, event.voice, event.options),
    'sendChatAction': (event) =>
      bot.sendChatAction(event.id, event.action),
    'getUserProfilePhotos': (event) =>
      bot.getUserProfilePhotos(event.id, event.offset, event.limit),
    'sendLocation': (event) =>
      bot.sendLocation(event.id, event.latitude, event.longitude, event.options),
    'getFile': (event) =>
      bot.getFile(event.id),
    'getFileLink': (event) =>
      bot.getFileLink(event.id),
    'downloadFile': (event) =>
      bot.downloadFile(event.id, event.downloadDir)
  }
}
