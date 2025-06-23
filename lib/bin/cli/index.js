import { program } from 'commander';
import * as prompt from '@clack/prompts';
import { version } from '../helper/version.js';
const defaultConfiguration = {
    name: '',
    flag: {
        git: false,
        commit: false,
        install: false,
        language: 'typescript',
        importAlias: '@',
        lint: 'biome',
        authentication: 'none',
        analytic: 'none',
        tailwind: true,
        extra: []
    },
    pkg: 'pnpm'
};
export const cli = async () => {
    const configuration = defaultConfiguration;
    program
        .name('create-tanstack-kit')
        .description('a cli to make awesome stuff using tanstack')
        .argument('[path]', 'what shall we call your project?')
        // cli option list
        .option('--git', 'weather or not the cli should initialise a git repository', configuration.flag.git)
        .option('--commit', 'weather or not the cli should make an initial commit', configuration.flag.commit)
        .option('--install', 'weather or not the cli should install dependencies', configuration.flag.install)
        .option('-s, --syntax [javascript|typescript]', 'the flavour of *script you prefer', configuration.flag.language)
        .option('-a, --alias [string]', 'override the default import alias', configuration.flag.importAlias)
        .option('-l, --lint [biome]', 'which lint library (if any) to use', configuration.flag.lint)
        .option('-i, --iam [supabase|clerk]', 'which authentication library (if any) to use', configuration.flag.authentication)
        .option('-d, --data [posthog]', 'which analytic library (if any) to use', configuration.flag.analytic)
        .option('-t, --tailwind [boolean]', 'include tailwind', configuration.flag.tailwind)
        .option('-e, --extra [query,form,table]', 'include extra', configuration.flag.extra)
        //version
        .version(version(), '-v, --version');
    program.parse();
    const project_ = program.args[0];
    if (project_) {
        configuration.name = project_;
    }
    // const tmp = program.opts()
    // if(tmp) {
    //   return {
    //     name: configuration.name,
    //     flag: {
    //       git: tmp.git,
    //       commit: tmp.commit,
    //       install: tmp.install,
    //       language: tmp.language,
    //       importAlias: tmp.importAlias,
    //       lint: tmp.lint,
    //       authentication: tmp.authentication,
    //       analytic: tmp.analytic,
    //       tailwind: tmp.tailwind,
    //       extra: tmp.extra
    //     },
    //     pkg: configuration.pkg
    //   }
    // }
    const project = await prompt.group({
        name: () => {
            return prompt.text({
                message: 'what shall we call your project?',
                defaultValue: configuration.name,
                initialValue: configuration.name
            });
        },
        pkg: () => {
            return prompt.select({
                message: 'what is your chosen package manager?',
                options: [
                    { value: 'pnpm', label: 'pnpm' },
                    { value: 'bun', label: 'bun' },
                    { value: 'npm', label: 'npm' },
                ],
                initialValue: 'pnpm'
            });
        },
        git: () => {
            return prompt.confirm({
                message: 'initialise an empty git repository?',
                initialValue: defaultConfiguration.flag.git
            });
        },
        commit: ({ results }) => {
            if (results.git) {
                return prompt.confirm({
                    message: 'make initial commit?',
                    initialValue: defaultConfiguration.flag.commit
                });
            }
        },
        install: ({ results }) => {
            return prompt.confirm({
                message: `execute ${results.pkg} install?`,
                initialValue: defaultConfiguration.flag.install
            });
        },
        language: () => {
            return prompt.select({
                message: 'what is your chosen *script flavour?',
                options: [
                    { value: 'typescript', label: 'TypeScript' },
                    { value: 'javascript', label: 'JavaScript' },
                ],
                initialValue: 'typescript'
            });
        },
        importAlias: () => {
            return prompt.text({
                message: 'what import alias would you prefer?',
                defaultValue: defaultConfiguration.flag.importAlias,
                placeholder: defaultConfiguration.flag.importAlias,
            });
        },
        lint: () => {
            return prompt.select({
                message: 'which lint tool would you prefer?',
                options: [
                    { value: 'none', label: 'none' },
                    { value: 'biome', label: 'biome' },
                ],
                initialValue: 'none'
            });
        },
        authentication: () => {
            return prompt.select({
                message: 'which authentication provider would you prefer?',
                options: [
                    { value: 'none', label: 'none' },
                    { value: 'supabase', label: 'supabase' },
                    { value: 'clerk', label: 'clerk' },
                ],
                initialValue: 'none'
            });
        },
        analytic: () => {
            return prompt.select({
                message: 'which analytic provider would you prefer?',
                options: [
                    { value: 'none', label: 'none' },
                    { value: 'posthog', label: 'PostHog' },
                ],
                initialValue: 'none'
            });
        },
        tailwind: () => {
            return prompt.confirm({
                message: 'use tailwind?',
                initialValue: defaultConfiguration.flag.tailwind
            });
        },
        extra: () => {
            return prompt.multiselect({
                message: 'anything else?',
                options: [
                    { value: 'query', label: 'TanStack Query' },
                    { value: 'form', label: 'TanStack Form' },
                    { value: 'table', label: 'TanStack Table' },
                ],
                required: false
            });
        },
    }, {
        onCancel() {
            process.exit(1);
        },
    });
    //rly? surely not!
    const commit = project.commit;
    const install = project.install;
    return {
        name: project.name,
        flag: {
            git: project.git,
            commit: commit,
            install: install,
            language: project.language,
            importAlias: project.importAlias,
            lint: project.lint,
            authentication: project.authentication,
            analytic: project.analytic,
            tailwind: project.tailwind,
            extra: project.extra
        },
        pkg: project.pkg
    };
};
//# sourceMappingURL=index.js.map