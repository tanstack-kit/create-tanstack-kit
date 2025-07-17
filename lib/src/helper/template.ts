import { access, constants, cp, readdir, readFile, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'

import type { Ora } from 'ora'

const TEMPLATE_PATH = resolve(import.meta.dirname, '../../template')
const BASE_PATH = join(TEMPLATE_PATH, 'base')
const PARTIAL_PATH = join(TEMPLATE_PATH, 'partial')

const getPartialPath = (partial: string): string => {
  return join(PARTIAL_PATH, partial)
}

export const apply = async(fqpn: string, partialList: string[], wait: Ora): Promise<void> => {
  await createDirectory(BASE_PATH, fqpn)
  wait.info('base directory')

  for (const partial of partialList) {
    await handlePartial(partial, fqpn)
    wait.info(`${partial} partial directory`)
  }

  for (const partialInject of partialList) {
    await handlePartialInject(partialInject, fqpn)
    wait.info(`${partialInject} inject file`)
  }

  const overrideMap = await handlePartialOverride(partialList, fqpn)
  wait.info(`find and apply override variant`)
  for (const [destination, source] of overrideMap) {
    await cp(source, destination, { recursive: true })
  }
}

const handlePartial = async(partial: string, destination: string): Promise<void> => {
  const partialPath = getPartialPath(partial)

  await isPath(partialPath, async() => {
    await createDirectoryWithFilter(partialPath, destination, (filename) => {
      return !filename.includes('.inject.') && !filename.includes('.override.')
    })
  })
}

const handlePartialInject = async(partialInject: string, destination: string): Promise<void> => {
  const partialInjectPath = getPartialPath(partialInject)

  await isPath(partialInjectPath, async() => {
    const injectFileList = await getFileList(partialInjectPath, '.inject.')

    for (const injectFile of injectFileList) {
      const destinationFile = injectFile.replace('.inject.', '.')
      const destinationPath = join(destination, destinationFile)

      const sourcePath = join(partialInjectPath, injectFile)

      await mergeInjectFile(sourcePath, destinationPath)
    }
  })
}

const mergeInjectFile = async(injectFile: string, sourceFile: string): Promise<void> => {
  if (!await _isPath(sourceFile)) {
    await cp(injectFile, sourceFile)
    return
  }

  const [injectFileContent, sourceFileContent] = await Promise.all([
    readFile(injectFile, 'utf-8'),
    readFile(sourceFile, 'utf-8')
  ])

  try {
    const injectFileData = JSON.parse(injectFileContent)
    const sourceFileData = JSON.parse(sourceFileContent)

    const merge = await mergeFile(injectFileData, sourceFileData)

    await writeFile(sourceFile, JSON.stringify(merge, null, 2), 'utf-8')
  } catch {
    await mergeTextFile(injectFileContent, sourceFileContent, sourceFile)
  }
}

const mergeFile = async(injectFile: any, sourceFile: any): Promise<any> => {
  const result = { ...sourceFile }

  for (const key in injectFile) {
    const injectValue = injectFile[key]
    const sourceValue = result[key]

    const isSimpleObject = (val: any) =>
      val !== null &&
      typeof val === 'object' &&
      val.constructor === Object

    if (isSimpleObject(injectValue) && isSimpleObject(sourceValue)) {
      result[key] = await mergeFile(injectValue, sourceValue)
    } else {
      result[key] = injectValue
    }
  }

  return result
}

const mergeTextFile = async(injectFileContent: string, sourceFileContent: string, sourceFile: string): Promise<void> => {
  const merge = `${sourceFileContent}\n${injectFileContent}`
  await writeFile(sourceFile, merge, 'utf-8')
}

const handlePartialOverride = async(partialOverride: string[], destination: string): Promise<Map<string, string>> => {
  const override = new Map<string, string>()
  const seenTarget = new Set<string>()

  for (let i = 0; i < partialOverride.length; i++) {
    const partial = partialOverride[i]
    const partialOverridePath = getPartialPath(partial)
    const overrideFileList = await getFileList(partialOverridePath, '.override.')

    for (const overrideFile of overrideFileList) {
      const targetFile = await getOverrideTarget(overrideFile)

      if(seenTarget.has(targetFile)) continue

      const targetPath = join(destination, targetFile)
      const defaultPath = join(partialOverridePath, overrideFile)

      const variant = await findVariant(targetFile, partialOverride, partialOverridePath, i)

      if (variant) {
        override.set(targetPath, join(partialOverridePath, variant))
      } else {
        override.set(targetPath, defaultPath)
      }

      seenTarget.add(targetFile)
    }
  }

  return override
}

const getOverrideTarget = async(overrideFile: string): Promise<string> => {
  return overrideFile
    .replace('.override.', '.')
    .replace(/\.with-[^.]+\./, '.')
}

const findVariant = async(targetFile: string, partialList: string[], currentPartialPath: string, currentPartialIndex: number): Promise<string | null> => {
  const [base, ext] = await getFilePart(targetFile)

  const remaining = partialList.slice(currentPartialIndex +1)
  const combinationList = await getCombinationList(remaining)

  for (const combination of combinationList) {
    const variantFile = `${base}.with-${combination.join('-')}.override.${ext}`
    const variantPath = join(currentPartialPath, variantFile)

    if (await _isPath(variantPath)) {
      return variantFile
    }
  }

  return null
}

const getFilePart = async(filename: string): Promise<[string, string]> => {
  const lastIndex = filename.lastIndexOf('.')

  if (lastIndex === -1) {
    return [filename, '']
  }

  return [
    filename.substring(0, lastIndex),
    filename.substring(lastIndex +1)
  ]
}

const getCombinationList = async(partialList: string[]): Promise<string[][]> => {
  const combinationList: string[][] = []

  for (let i = partialList.length; i > 1; i--) {
    combinationList.push(partialList.slice(0, i))
  }

  return combinationList
}

const createDirectory = async(source: string, destination: string): Promise<void> => {
  await createDirectoryWithFilter(source, destination, () => true)
}

const createDirectoryWithFilter = async(source: string, destination: string, filter: (filename: string) => boolean): Promise<void> => {
  const entryList = await readdir(source, { withFileTypes: true })

  for (const entry of entryList) {
    const sourcePath = join(source, entry.name)
    const destinationPath = join(destination, entry.name)

    if (entry.isDirectory()) {
      await createDirectoryWithFilter(sourcePath, destinationPath, filter)
    } else if (filter(entry.name)) {
      await cp(sourcePath, destinationPath, { recursive: true })
    }
  }
}

// const getFileList = async(partial: string, ext: string): Promise<string[]> => {
//   const entryList = await readdir(partial, { withFileTypes: true })

//   return entryList
//     .filter(entry => entry.isFile() && entry.name.includes(ext))
//     .map(entry => entry.name)
// }

const getFileList = async(partial: string, ext: string): Promise<string[]> => {
  const fileList: string[] = []

  const walkDirectory = async(dir: string, relativePath: string = ''): Promise<void> => {
    const entryList = await readdir(dir, { withFileTypes: true })

    for (const entry of entryList) {
      const fullPath = join(dir, entry.name)
      const relativeFilePath = relativePath ? join(relativePath, entry.name) : entry.name

      if (entry.isDirectory()) {
        await walkDirectory(fullPath, relativeFilePath)
      } else if (entry.isFile() && entry.name.includes(ext) && !entry.name.includes('.with-')) {
        fileList.push(relativeFilePath)
      }
    }
  }

  await walkDirectory(partial)
  return fileList
}

const _isPath = async(filepath: string): Promise<boolean> => {
  try {
    await access(filepath, constants.F_OK)
    return true
  } catch {
    return false
  }
}

const isPath = async(filepath:string, callback: () => Promise<void>): Promise<void> => {
  if (await _isPath(filepath)) await callback()
}
