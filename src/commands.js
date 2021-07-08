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
    'startPolling': (event) =>
      bot.startPolling(event.options),
    'stopPolling': (event) =>
      bot.stopPolling(),
    // TODO: isPolling
    'openWebHook': (event) =>
      bot.openWebHook(),
    'closeWebHook': (event) =>
      bot.closeWebHook(),
    // TODO: hasOpenWebHook
    'getMe': (event) =>
      bot.getMe(),
    'setWebHook': (event) =>
      bot.setWebHook(event.url, event.options),
    'deleteWebHook': (event) =>
      bot.deleteWebHook(),
    'getWebHookInfo': (event) =>
      bot.getWebHookInfo(),
    'getUpdates': (event) =>
      bot.getUpdates(event.options),
    // TODO: processUpdate
    'sendMessage': (event) =>
      bot.sendMessage(event.chat, event.text, event.options),
    'answerInlineQuery': (event) =>
      bot.answerInlineQuery(event.inlineQueryId, event.results, event.options),
    'forwardMessage': (event) =>
      bot.forwardMessage(event.chat, event.fromChatId, event.messageId, event.options),
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
    'restrictChatMember': (event) =>
      bot.restrictChatMember(event.chat, event.userId, event.options),
    'promoteChatMember': (event) =>
      bot.restrictChatMember(event.chat, event.userId, event.options),
    'exportChatInviteLink': (event) =>
      bot.exportChatInviteLink(event.chat),
    'setChatPhoto': (event) =>
      bot.setChatPhoto(event.chat, event.photo),
    'deleteChatPhoto': (event) =>
      bot.deleteChatPhoto(event.chat),
    'setChatTitle': (event) =>
      bot.setChatTitle(event.chat, event.title),
    'setChatDescription': (event) =>
      bot.setChatDescription(event.chat, event.description),
    'pinChatMessage': (event) =>
      bot.pinChatMessage(event.chat, event.messageId),
    'unpinChatMessage': (event) =>
      bot.unpinChatMessage(event.chat),
    'answerCallbackQuery': (event) =>
      bot.answerCallbackQuery(event.options),
    'editMessageText': (event) =>
      bot.editMessageText(event.text, { chat_id: event.chat, ...event.options }),
    'editMessageCaption': (event) =>
      bot.editMessageCaption(event.caption, { chat_id: event.chat, ...event.options }),
    'editMessageReplyMarkup': (event) =>
      bot.editMessageReplyMarkup(event.replyMarkup, { chat_id: event.chat, ...event.options }),
    'getUserProfilePhotos': (event) =>
      bot.getUserProfilePhotos(event.userId, event.options),
    'sendLocation': (event) =>
      bot.sendLocation(event.chat, event.latitude, event.longitude, event.options),
    'sendVenue': (event) =>
      bot.sendVenue(event.chat, event.latitude, event.longitude, event.title, event.address, event.options),
    'sendContact': (event) =>
      bot.sendContact(event.chat, event.phoneNumber, event.firstName, event.options),
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
    'getGameHighScores': (event) =>
      bot.getGameHighScores(event.userId, event.options),
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
