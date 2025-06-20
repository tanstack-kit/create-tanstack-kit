import chalk from 'chalk';
export const log = {
    error(...arg) {
        console.log(chalk.red(...arg));
    },
    warn(...arg) {
        console.log(chalk.yellow(...arg));
    },
    notice(...arg) {
        console.log(chalk.cyan(...arg));
    },
    success(...arg) {
        console.log(chalk.green(...arg));
    }
};
//# sourceMappingURL=log.js.map