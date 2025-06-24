import { log } from '@/helper/log.js'
import ora from 'ora'

export const install = async (fqpn: string, pkg: string): Promise<void> => {
  const wait = ora(`install using ${pkg}`).start()

  log.warn(`fqpn: ${fqpn}`)
  log.warn(`pkg: ${pkg}`)

  try {
    wait.succeed('yay')
  } catch (_err) {
    wait.fail('uuups')
  }
}
