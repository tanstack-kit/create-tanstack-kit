import { log } from '../helper/log.js';
import ora from 'ora';
export const install = async (pkg) => {
    const wait = ora(`install using ${pkg}`).start();
    log.warn(`pkg: ${pkg}`);
    try {
        wait.succeed('yay');
    }
    catch (_err) {
        wait.fail('uuups');
    }
};
//# sourceMappingURL=install.js.map