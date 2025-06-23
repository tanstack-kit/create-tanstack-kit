import chalk from 'chalk'

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
