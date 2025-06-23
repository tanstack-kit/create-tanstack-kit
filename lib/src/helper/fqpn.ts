//fully qualyfied project name
import path from 'path'
import { type Configuration } from '@/cli/index.js'

export const fqpn = (configuration: Configuration): string => {
  const project = path.resolve(process.cwd(), configuration.name)
  return project
}
