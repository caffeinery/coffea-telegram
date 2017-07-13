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
    'action': (event) =>
      bot.sendChatAction(event.chat, event.action),
    'video_note': (event) =>
      bot.sendVideoNote(event.chat, extractFileId(event.data), event.options),
    // TODO: add more types and encourage using message types instead

    // commands
    'stopPolling': (event) =>
      bot.stopPolling(),
    'getMe': (event) =>
      bot.getMe(),
    'setWebHook': (event) =>
      bot.setWebHook(event.url, event.cert),
    'getUpdates': (event) =>
      bot.getUpdates(event.timeout, event.limit, event.offset),
    'answerInlineQuery': (event) =>
      bot.answerInlineQuery(event.inlineQueryId, event.results, event.options),
    'forwardMessage': (event) =>
      bot.forwardMessage(event.chat, event.fromChatId, event.messageId),
    'sendPhoto': (event) =>
      bot.sendPhoto(event.chat, event.photo, event.options),
    'sendAudio': (event) =>
      bot.sendAudio(event.chat, event.audio, event.options),
    'sendDocument': (event) =>
      bot.sendDocument(event.chat, event.document, event.options),
    'sendSticker': (event) =>
      bot.sendSticker(event.chat, event.sticker, event.options),
    'sendVideo': (event) =>
      bot.sendVideo(event.chat, event.video, event.options),
    'sendVoice': (event) =>
      bot.sendVoice(event.chat, event.voice, event.options),
    'sendChatAction': (event) =>
      bot.sendChatAction(event.chat, event.action),
    'kickChatMember': (event) =>
      bot.kickChatMember(event.chat, event.userId),
    'unbanChatMember': (event) =>
      bot.unbanChatMember(event.chat, event.userId),
    'answerCallbackQuery': (event) =>
      bot.answerCallbackQuery(event.callbackQueryId, event.text, event.showAlert, event.options),
    'editMessageText': (event) =>
      bot.editMessageText(event.text, { chat_id: event.chat, ...event.options }),
    'editMessageCaption': (event) =>
      bot.editMessageCaption(event.caption, { chat_id: event.chat, ...event.options }),
    'editMessageReplyMarkup': (event) =>
      bot.editMessageReplyMarkup(event.replyMarkup, { chat_id: event.chat, ...event.options }),
    'getUserProfilePhotos': (event) =>
      bot.getUserProfilePhotos(event.userId, event.offset, event.limit),
    'sendLocation': (event) =>
      bot.sendLocation(event.chat, event.latitude, event.longitude, event.options),
    'sendVenue': (event) =>
      bot.sendVenue(event.chat, event.latitude, event.longitude, event.title, event.address, event.options),
    'getFile': (event) =>
      bot.getFile(event.fileId),
    'getFileLink': (event) =>
      bot.getFileLink(event.fileId),
    'downloadFile': (event) =>
      bot.downloadFile(event.fileId, event.downloadDir),
    'getChat': (event) =>
      bot.getChat(event.chat),
    'getChatAdministrators': (event) =>
      bot.getChatAdministrators(event.chat),
    'getChatMembersCount': (event) =>
      bot.getChatMembersCount(event.chat),
    'getChatMember': (event) =>
      bot.getChatMember(event.chat, event.userId),
    'leaveChat': (event) =>
      bot.leaveChat(event.chat),
    'sendGame': (event) =>
      bot.sendGame(event.chat, event.gameShortName, event.options),
    'setGameScore': (event) =>
      bot.setGameScore(event.userId, event.score, event.options),
    'deleteMessage': (event) =>
      bot.deleteMessage(event.chat, event.messageId, event.options),
    'sendInvoice': (event) =>
      bot.sendInvoice(
        event.chat,
        event.title,
        event.description,
        event.payload,
        event.providerToken,
        event.startParameter,
        event.currency,
        event.prices,
        event.options
      ),
    'answerShippingQuery': (event) =>
      bot.answerShippingQuery(event.shippingQueryId, event.ok, event.options),
    'answerPreCheckoutQuery': (event) =>
      bot.answerPreCheckoutQuery(event.preCheckoutQueryId, event.ok, event.options)
  }
}
