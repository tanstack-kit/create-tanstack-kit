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
  }
}
