import { program } from 'commander'
import * as prompt from '@clack/prompts'

import { getLocalVersion } from '@/helper/version.js'
// import chalk from 'chalk'

// import { log } from '@//helper/log.js'

export interface CLIFlag {
  git: boolean
  commit: boolean
  install: boolean

  language: 'javascript' | 'typescript'
  importAlias: string
  lint: 'none' | 'biome'

  authentication: 'none' | 'supabase' | 'clerk'
  analytic: 'none' | 'posthog'

  tailwind: boolean

  extra: Array<'query' | 'form' | 'table'>
}

export interface Configuration {
  name: string
  flag: CLIFlag
  pkg: 'pnpm' | 'bun' | 'npm'
}

const defaultConfiguration: Configuration = {
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
}

export const cli = async(): Promise<Configuration> => {
  const configuration = defaultConfiguration

  program
    .name('create-tanstack-kit')
    .description('a cli to make awesome stuff using tanstack')
    .argument(
      '[path]',
      'what shall we call your project?'
    )
    // cli option list
    .option(
      '--git',
      'weather or not the cli should initialise a git repository',
      configuration.flag.git
    )
    .option(
      '--commit',
      'weather or not the cli should make an initial commit',
      configuration.flag.commit
    )
    .option(
      '--install',
      'weather or not the cli should install dependencies',
      configuration.flag.install
    )
    .option(
      '-s, --syntax [javascript|typescript]',
      'the flavour of *script you prefer',
      configuration.flag.language
    )
    .option(
      '-a, --alias [string]',
      'override the default import alias',
      configuration.flag.importAlias
    )
    .option(
      '-l, --lint [biome]',
      'which lint library (if any) to use',
      configuration.flag.lint
    )
    .option(
      '-i, --iam [supabase|clerk]',
      'which authentication library (if any) to use',
      configuration.flag.authentication
    )
    .option(
      '-d, --data [posthog]',
      'which analytic library (if any) to use',
      configuration.flag.analytic
    )
    .option(
      '-t, --tailwind [boolean]',
      'include tailwind',
      configuration.flag.tailwind
    )
    .option(
      '-e, --extra [query,form,table]',
      'include extra',
      configuration.flag.extra
    )
    //version
    .version(getLocalVersion(), '-v, --version')

  program.parse()

  const project_ = program.args[0]
  if(project_) {
    configuration.name = project_
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

  const project = await prompt.group(
    {
      name: () => {
        return prompt.text({
          message: 'what shall we call your project?',
          defaultValue: configuration.name,
          initialValue: configuration.name
        })
      },
      pkg: () => {
        return prompt.select({
          message: 'what is your chosen package manager?',
          options: [
            { value: 'pnpm', label: 'pnpm'},
            { value: 'bun', label: 'bun'},
            { value: 'npm', label: 'npm'},
          ] as const,
          initialValue: 'pnpm'
        }) as Promise<'pnpm' | 'bun' | 'npm'>
      },
      git: () => {
        return prompt.confirm({
          message: 'initialise an empty git repository?',
          initialValue: defaultConfiguration.flag.git
        })
      },
      commit: ({ results }) => {
        if (results.git) {
          return prompt.confirm({
            message: 'make initial commit?',
            initialValue: defaultConfiguration.flag.commit
          })
        }
      },
      install: ({ results }) => {
        return prompt.confirm({
          message: `execute ${results.pkg} install?`,
          initialValue: defaultConfiguration.flag.install
        })
      },
      language: () => {
        return prompt.select({
          message: 'what is your chosen *script flavour?',
          options: [
            { value: 'typescript', label: 'TypeScript'},
            { value: 'javascript', label: 'JavaScript'},
          ] as const,
          initialValue: 'typescript'
        }) as Promise<'typescript' | 'javascript'>
      },
      importAlias: () => {
        return prompt.text({
          message: 'what import alias would you prefer?',
          defaultValue: defaultConfiguration.flag.importAlias,
          placeholder: defaultConfiguration.flag.importAlias,
        })
      },
      lint: () => {
        return prompt.select({
          message: 'which lint tool would you prefer?',
          options: [
            { value: 'none', label: 'none'},
            { value: 'biome', label: 'biome'},
          ] as const,
          initialValue: 'none'
        }) as Promise<'none' | 'biome'>
      },
      authentication: () => {
        return prompt.select({
          message: 'which authentication provider would you prefer?',
          options: [
            { value: 'none', label: 'none'},
            { value: 'supabase', label: 'supabase'},
            { value: 'clerk', label: 'clerk'},
          ] as const,
          initialValue: 'none'
        }) as Promise<'none' | 'supabase' | 'clerk'>
      },
      analytic: () => {
        return prompt.select({
          message: 'which analytic provider would you prefer?',
          options: [
            { value: 'none', label: 'none'},
            { value: 'posthog', label: 'PostHog'},
          ] as const,
          initialValue: 'none'
        }) as Promise<'none' | 'posthog'>
      },
      tailwind: () => {
        return prompt.confirm({
          message: 'use tailwind?',
          initialValue: defaultConfiguration.flag.tailwind
        })
      },
      extra: () => {
        return prompt.multiselect({
          message: 'anything else?',
          options: [
            { value: 'query', label: 'TanStack Query'},
            { value: 'form', label: 'TanStack Form'},
            { value: 'table', label: 'TanStack Table'},
          ],
          required: false
        })
      },
    },
    {
      onCancel() {
        process.exit(1)
      },
    },
  )

  //rly? surely not!
  const commit = project.commit as boolean | false
  const install = project.install as boolean | false

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
  }
}
