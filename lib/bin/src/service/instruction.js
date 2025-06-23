import { log } from '../helper/log.js';
import { outro } from '@clack/prompts';
import chalk from 'chalk';
import {} from '../cli/index.js';
export const instruction = async (configuration) => {
    outro(chalk.green(`${configuration.name} is ready`));
    log.notice('what now?');
    log.visual(`  cd ${configuration.name}`);
    if (!configuration.flag.install) {
        log.visual(`  ${configuration.pkg} install\n`);
    }
    if (!configuration.flag.git) {
        log.visual(`  git init`);
    }
    if (!configuration.flag.commit) {
        log.visual(`  git add .`);
        log.visual(`  git commit -m 'initial commit'\n`);
    }
    log.visual('  cp .env.e .env');
    log.mute('  //populate all values in `.env`\n');
    console.log(chalk.cyan(`at last, run`), chalk.yellow(`${configuration.pkg} dev`), '\n');
    log.notice('make something awesome');
    log.notice('made with 🫰 and ☕ in 🇫🇮');
};
//# sourceMappingURL=instruction.js.map