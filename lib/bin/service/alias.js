import { log } from '../helper/log.js';
import ora from 'ora';
export const alias = async (importAlias) => {
    const wait = ora(`amend importAlias to ${importAlias}`).start();
    log.warn(`alias: ${importAlias}`);
    try {
        wait.succeed('yay');
    }
    catch (_err) {
        wait.fail('uuups');
    }
};
//# sourceMappingURL=alias.js.map