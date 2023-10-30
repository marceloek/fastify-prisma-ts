import { Prisma, User } from '@prisma/client'

import { prisma } from '@/lib/prisma.js'

import { IBaseController, IOmitId } from './implement/base.js'

export type IModelKeys = 'user' | 'post'

type IModel = Prisma.UserDelegate | Prisma.PostDelegate

export class BaseController<T> implements IBaseController<T> {
  model: IModel

  constructor(modelKey: IModelKeys) {
    this.model = prisma[modelKey]
  }

  async find(): Promise<T[]> {
    const values = await (this.model as Prisma.UserDelegate).findMany()

    return values as T[]
  }

  async findById(id: number): Promise<T> {
    const value = (this.model as Prisma.UserDelegate).findUniqueOrThrow({
      where: {
        id,
      },
    })

    return value as T
  }

  async create(data: IOmitId<T>): Promise<T> {
    const value = (this.model as Prisma.UserDelegate).create({
      data: data as IOmitId<User>,
    })

    return value as T
  }

  async updateById(id: number, data: IOmitId<T>): Promise<T> {
    await this.findById(id)

    const values = (this.model as Prisma.UserDelegate).update({
      where: {
        id,
      },
      data: data as IOmitId<User>,
    })

    return values as T
  }

  async deleteById(id: number): Promise<T> {
    await this.findById(id)

    const values = (this.model as Prisma.UserDelegate).delete({
      where: {
        id,
      },
    })

    return values as T
  }
}
