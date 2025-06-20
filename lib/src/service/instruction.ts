import chalk from 'chalk'
import { outro } from '@clack/prompts'

import { type Configuration } from '../cli/index.js'

export const instruction = async(_configuration: Configuration): Promise<void> => {
  outro(chalk.green('success'))
  console.log('make something awesome')
  console.log('made with 🫰 and ☕ in 🇫🇮')
}
