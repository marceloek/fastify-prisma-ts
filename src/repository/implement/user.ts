import { User } from '@prisma/client'

interface IUserData {
  email: string
  name: string | null
  password: string
  salt: string
}

type IOmitUser = Omit<User, 'id' | 'passwordSalt'>

export type { IOmitUser, IUserData }
