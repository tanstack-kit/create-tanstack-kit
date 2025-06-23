import { log } from '@/helper/log.js'
import ora from 'ora'

export const git = async(commit: boolean): Promise<void> => {
  const wait = ora('initialise git repository').start()

  log.warn(`commit: ${commit}`)

  try {
    wait.succeed('yay')
  } catch(_err) {
    wait.fail('uuups')
  }
}
