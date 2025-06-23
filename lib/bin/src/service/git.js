import { log } from '../helper/log.js';
import ora from 'ora';
export const git = async (commit) => {
    const wait = ora('initialise git repository').start();
    log.warn(`commit: ${commit}`);
    try {
        wait.succeed('yay');
    }
    catch (_err) {
        wait.fail('uuups');
    }
};
//# sourceMappingURL=git.js.map