import * as prompt from '@clack/prompts'
import ora from 'ora'

import type { CLIFlag } from '@/cli/index.js'

import { join, resolve } from 'node:path'
import { access, cp, readdir, rm } from 'node:fs/promises'

export const create = async (fqpn: string, _flag: CLIFlag): Promise<void> => {
  const tmpPath = resolve(import.meta.dirname, '../../template/base')

  const wait = ora('beep boop beep create project').start()

  try {
    await access(fqpn)

    const content = await readdir(fqpn)
    if (content.length === 0) {
      if (fqpn !== '.') {
        wait.info('fqpn already exists, but is empty.')
      }
    } else {
      wait.stopAndPersist()

      const continueScaffold = await prompt.select({
        message: 'looks like that already exists and is not empty',
        options: [
          { label: 'abort (recommended)', value: 'abort' },
          { label: 'continue and override', value: 'continue' },
        ],
        initialValue: 'abort',
      })

      if (prompt.isCancel(continueScaffold) || continueScaffold === 'abort') {
        wait.fail('abort...')
        process.exit(1)
      }

      const confirmContinueScaffold = await prompt.confirm({
        message: 'are you sure? this operation can not be undone...',
        initialValue: false,
      })

      if (
        prompt.isCancel(confirmContinueScaffold) ||
        !confirmContinueScaffold
      ) {
        wait.fail('abort...')
        process.exit(1)
      }

      const rlyConfirmContinueScaffold = await prompt.confirm({
        message: 'are you sure? last chance...',
        initialValue: false,
      })

      if (
        prompt.isCancel(rlyConfirmContinueScaffold) ||
        !rlyConfirmContinueScaffold
      ) {
        wait.fail('abort...')
        process.exit(1)
      }

      content.map((file) => {
        rm(join(fqpn, file), { recursive: true, force: true })
      })
    }
  } catch (_err) {}

  try {
    wait.start()
    await cp(tmpPath, fqpn, {
      recursive: true,
    })
    wait.succeed('yay')
  } catch (_err) {
    wait.fail('uuups')
  }
}
