import { note } from '@clack/prompts';
import { log } from './log.js';
import pkg from '../../package.json' with { type: 'json' };
export const getLocalVersion = () => {
    return pkg.version;
};
export const getRemoteVersion = async () => {
    const url = 'https://registry.npmjs.org/create-tanstack-kit/latest';
    try {
        const res = await fetch(url);
        if (!res.ok) {
            return null;
        }
        const { version } = await res.json();
        return version;
    }
    catch (_err) {
        return null;
    }
};
export const isCurrent = async () => {
    try {
        const localVersion = getLocalVersion();
        const remoteVersion = await getRemoteVersion();
        if (!localVersion || !remoteVersion)
            return;
        const [localMajor, localMinor, localPatch] = localVersion.split('.').map(Number);
        const [remoteMajor, remoteMinor, remotePatch] = remoteVersion.split('.').map(Number);
        const hasUpdate = remoteMajor > localMajor ||
            (remoteMajor === localMajor && remoteMinor > localMinor) ||
            (remoteMajor === localMajor && remoteMinor === localMinor && remotePatch > localPatch);
        if (hasUpdate) {
            note(`${log.warn(`local: ${localVersion} ⇥ remote: ${remoteVersion}`)}`, '📦 update available');
        }
    }
    catch (_err) {
        return;
    }
};
//# sourceMappingURL=version.js.map