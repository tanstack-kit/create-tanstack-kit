import { log } from '@/helper/log.js'
import ora from 'ora'

import { execSync } from 'node:child_process'

const gitAvailable = (fqpn: string): boolean => {
  try {
    execSync('git --version', { cwd: fqpn })
    return true
  } catch (_err) {
    return false
  }
}

export const git = async (fqpn: string, commit: boolean): Promise<void> => {
  if (!gitAvailable(fqpn)) {
    log.warn('git not available')
    return
  }

  const wait = ora('initialise git repository').start()

  log.warn(`commit: ${commit}`)

  try {
    wait.succeed('yay')
  } catch (_err) {
    wait.fail('uuups')
  }
}
