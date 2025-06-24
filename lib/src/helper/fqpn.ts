//fully qualyfied project name
import path from 'node:path'
import type { Configuration } from '@/cli/index.js'

export const fqpn = (configuration: Configuration): string => {
  const project = path.resolve(process.cwd(), configuration.name)
  return project
}

const removeSlash = (str: string): string =>
  str.endsWith('/') ? str.slice(0, -1) : str

const validation = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/

export const projectIsValid = (rawProject: string): boolean => {
  const project = removeSlash(rawProject)

  if (project === '.') return true

  const part = project.split('/')
  const isScope = part.some((p) => p.startsWith('@'))

  const io = isScope
    ? part.slice(part.findIndex((p) => p.startsWith('@'))).join('/')
    : // biome-ignore lint/style/noNonNullAssertion: part can not be null
      part.at(-1)!

  return validation.test(io)
}
