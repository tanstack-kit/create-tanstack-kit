import { log } from '../helper/log.js'
import ora from 'ora'

import { type CLIFlag } from '../cli/index.js'

export const create = async(fqpn: string, flag: CLIFlag): Promise<void> => {
  const wait = ora('beep boop beep create project').start()

  log.warn(`fqpn: ${fqpn}`)
  log.warn(`flag: ${flag}`)

  try {
    wait.succeed('yay')
  } catch(_err) {
    wait.fail('uuups')
  }
}
