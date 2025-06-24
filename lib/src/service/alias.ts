import { log } from '@/helper/log.js'
import ora from 'ora'

export const alias = async (
  fqpn: string,
  importAlias: string,
): Promise<void> => {
  const wait = ora(`amend importAlias to ${importAlias}`).start()

  log.warn(`fqpn: ${fqpn}`)
  log.warn(`alias: ${importAlias}`)

  try {
    wait.succeed('yay')
  } catch (_err) {
    wait.fail('uuups')
  }
}
