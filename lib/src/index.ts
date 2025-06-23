import { cli } from './cli/index.js'

import { fqpn } from './helper/fqpn.js'
import { log, welcome } from './helper/log.js'

import { create } from './service/create.js'
import { alias } from './service/alias.js'
import { install } from './service/install.js'
import { lint } from './service/lint.js'
import { git } from './service/git.js'
import { instruction } from './service/instruction.js'

import { isCurrent } from './helper/version.js'

const main = async() => {
  welcome()

  isCurrent()

  const configuration = await cli()

  const fqpn_ = fqpn(configuration)
  await create(fqpn_, configuration.flag)

  if(configuration.flag.importAlias !== '@') {
    await alias(configuration.flag.importAlias)
  }

  if(configuration.flag.install) {
    await install(configuration.pkg)

    if(configuration.flag.lint === 'biome') {
      await lint()
    }
  }

  if(configuration.flag.git) {
    await git(configuration.flag.commit)
  }

  await instruction(configuration)
  process.exit(0)
}

main().catch((_err) => {
  log.error('uuups')
  process.exit(1)
})
