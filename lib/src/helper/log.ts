import chalk from 'chalk'
import { summer } from 'gradient-string'

export const log = {
  error(...arg: unknown[]) {
    console.log(chalk.red(...arg))
  },
  warn(...arg: unknown[]) {
    console.log(chalk.yellow(...arg))
  },
  notice(...arg: unknown[]) {
    console.log(chalk.cyan(...arg))
  },

  success(...arg: unknown[]) {
    console.log(chalk.green(...arg))
  },

  visual(...arg: unknown[]) {
    console.log(chalk.magenta(...arg))
  },
  mute(...arg: unknown[]) {
    console.log(chalk.grey(...arg))
  },
}

export const welcome = (): void => {
  const message = `
    ______          ______           __     __ ___ __
   /_  __/__ ____  / __/ /____ _____/ /__  / //_(_) /_
    / / / _ \`/ _ \\_\\ \\/ __/ _ \`/ __/  '_/ / ,< / / __/
   /_/  \\_,_/_//_/___/\\__/\\_,_/\\__/_/\\_\\ /_/|_/_/\\__/
  `
  console.log('')
  console.log(summer.multiline(message))
}
