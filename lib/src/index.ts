import { cli } from './cli/index.js'
import { instruction } from './service/instruction.js'

import { log } from './service/log.js'

const main = async() => {
  const configuration = await cli()

  await instruction(configuration)
  process.exit(0)
}

main().catch((_err) => {
  log.error('uuups')
  process.exit(1)
})
