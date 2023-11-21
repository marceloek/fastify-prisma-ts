import { Post, Prisma } from '@prisma/client'

import { BaseRepository } from './base.js'
import { IOmitId } from './implement/base.js'
import { UserRepository } from './user.js'

type IModelPost = Prisma.PostDelegate

export class PostRepository extends BaseRepository<Post> {
  userRepository: UserRepository

  constructor() {
    super('post')

    this.userRepository = new UserRepository()
  }

  async updateById(id: number, data: IOmitId<Post>): Promise<Post> {
    const { authorId } = data

    await this.userRepository.findById(authorId)

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
