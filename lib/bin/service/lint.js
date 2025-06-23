import { log } from '../helper/log.js';
import ora from 'ora';
export const lint = async () => {
    const wait = ora('lint').start();
    log.warn(`lint`);
    try {
        wait.succeed('yay');
    }
    catch (_err) {
        wait.fail('uuups');
    }
};
//# sourceMappingURL=lint.js.map