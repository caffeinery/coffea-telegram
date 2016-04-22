import TelegramBot from 'node-telegram-bot-api'

export default function init (token) {
  return new TelegramBot(token, { polling: true })
}
