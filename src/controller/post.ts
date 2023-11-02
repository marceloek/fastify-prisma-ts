import { Post, Prisma } from '@prisma/client'

import { BaseController } from './base.js'
import { IOmitId } from './implement/base.js'
import { UserController } from './user.js'

type IModelPost = Prisma.PostDelegate

export class PostController extends BaseController<Post> {
  userController: UserController

  constructor() {
    super('post')

    this.userController = new UserController()
  }

  async updateById(id: number, data: IOmitId<Post>): Promise<Post> {
    const { authorId } = data

    await this.userController.findById(authorId)

    await this.findById(id)

    const post = await (this.model as IModelPost).update({
      where: {
        id,
      },
      data,
    })

    return post
  }
}
