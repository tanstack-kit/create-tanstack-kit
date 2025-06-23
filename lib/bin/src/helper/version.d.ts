export declare const getLocalVersion: () => string;
export declare const getRemoteVersion: () => Promise<string | null>;
export declare const isCurrent: () => Promise<void>;
