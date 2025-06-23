import chalk from 'chalk';
import { summer } from 'gradient-string';
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
    },
    visual(...arg) {
        console.log(chalk.magenta(...arg));
    },
    mute(...arg) {
        console.log(chalk.grey(...arg));
    },
};
export const welcome = () => {
    const message = `
    ______          ______           __     __ ___ __
   /_  __/__ ____  / __/ /____ _____/ /__  / //_(_) /_
    / / / _ \`/ _ \\_\\ \\/ __/ _ \`/ __/  '_/ / ,< / / __/
   /_/  \\_,_/_//_/___/\\__/\\_,_/\\__/_/\\_\\ /_/|_/_/\\__/
  `;
    console.log('');
    console.log(summer.multiline(message));
};
//# sourceMappingURL=log.js.map