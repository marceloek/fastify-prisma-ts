import { randomBytes, scryptSync } from 'node:crypto'

export function hashGenerator(word: string) {
  const salt = randomBytes(16).toString('hex')

  const hash = scryptSync(word, salt, 64).toString('hex')

  return { hash, salt }
}
