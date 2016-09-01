const extractFileId = (data) => {
  if (Array.isArray(data)) { // array of photos, pick the largest (last) one
    return extractFileId(data[data.length - 1])
  } else {
    return data && data.file_id ? data.file_id : data
  }
}

export default function makeCommands (bot) {
  return {
    // TODO: standardize these commands and document in coffea
    //       e.g. message(...), me(), photo(...), ...
    // TODO: add helpers for these types
    // types
    'message': (event) =>
      bot.sendMessage(event.chat, event.text, event.options),
    'voice': (event) =>
      bot.sendVoice(event.chat, extractFileId(event.data), event.options),
    'audio': (event) =>
      bot.sendAudio(event.chat, extractFileId(event.data), event.options),
    'sticker': (event) =>
      bot.sendSticker(event.chat, extractFileId(event.data), event.options),
    'photo': (event) =>
      bot.sendPhoto(event.chat, extractFileId(event.data), event.options),
    'video': (event) =>
      bot.sendVideo(event.chat, extractFileId(event.data), event.options),
    'document': (event) =>
      bot.sendDocument(event.chat, extractFileId(event.data), event.options),

    // commands
    'getMe': (event) =>
      bot.getMe(),
    'setWebHook': (event) =>
      bot.setWebHook(event.url, event.cert),
    // TODO: change event.id to event.chat
    'getUpdates': (event) =>
      bot.getUpdates(event.id, event.results, event.options),
    'answerInlineQuery': (event) =>
      bot.answerInlineQuery(event.id, event.results, event.options),
    'forwardMessage': (event) =>
      bot.forwardMessage(event.id, event.fromChatId, event.messageId),
    // TODO: remove send* commands and encourage using message types (see above) instead
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
      bot.downloadFile(event.id, event.downloadDir),
    'editMessageText': (event) =>
      bot.downloadFile(event.text, event.options),
    'editMessageCaption': (event) =>
      bot.downloadFile(event.caption, event.options),
    'editMessageReplyMarkup': (event) =>
      bot.downloadFile(event.reply_markup, event.options)
  }
}
