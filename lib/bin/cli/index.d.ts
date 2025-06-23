export interface CLIFlag {
    git: boolean;
    commit: boolean;
    install: boolean;
    language: 'javascript' | 'typescript';
    importAlias: string;
    lint: 'none' | 'biome';
    authentication: 'none' | 'supabase' | 'clerk';
    analytic: 'none' | 'posthog';
    tailwind: boolean;
    extra: Array<'query' | 'form' | 'table'>;
}
export interface Configuration {
    name: string;
    flag: CLIFlag;
    pkg: 'pnpm' | 'bun' | 'npm';
}
export declare const cli: () => Promise<Configuration>;
