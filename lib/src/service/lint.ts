import { log } from '@/helper/log.js'
import ora from 'ora'

export const lint = async (fqpn: string): Promise<void> => {
  const wait = ora('lint').start()

  log.warn(`fqpn: ${fqpn}`)
  log.warn(`lint`)

  try {
    wait.succeed('yay')
  } catch (_err) {
    wait.fail('uuups')
  }
}
