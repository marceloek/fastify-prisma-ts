import { Prisma, User } from '@prisma/client'

import { hashGenerator } from '@/utilts/hashGenerator.js'

import { BaseController } from './base.js'
import { IOmitUser, IUserData } from './implement/user.js'

export class UserController extends BaseController<User> {
  constructor() {
    super('user')
  }

  async create(data: IOmitUser): Promise<User> {
    const user = await (this.model as Prisma.UserDelegate).create({
      data: this.userData(data),
    })

    return user
  }

  async updateById(id: number, data: IOmitUser): Promise<User> {
    await this.findById(id)

    const user = await (this.model as Prisma.UserDelegate).update({
      where: {
        id,
      },
      data: this.userData(data),
    })

    return user
  }

  userData(data: IOmitUser): IUserData {
    const { email, name, password } = data

    const { hash, salt } = hashGenerator(password)

    return { email, name, password: hash, salt }
  }
}
