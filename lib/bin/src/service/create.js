import { log } from '../helper/log.js';
import ora from 'ora';
import {} from '../cli/index.js';
export const create = async (fqpn, flag) => {
    const wait = ora('beep boop beep create project').start();
    log.warn(`fqpn: ${fqpn}`);
    log.warn(`flag: ${flag}`);
    try {
        wait.succeed('yay');
    }
    catch (_err) {
        wait.fail('uuups');
    }
};
//# sourceMappingURL=create.js.map