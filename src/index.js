import { forward } from 'coffea'

import init from './init'
import events from './events'
import makeCommands from './commands'

export default function telegram (config, dispatch) {
  const bot = init(config.token)
  const commands = makeCommands(bot)

  events(bot, dispatch)

  return forward(commands)
}
