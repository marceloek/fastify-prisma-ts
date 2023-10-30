import { User } from '@prisma/client'

import { BaseController } from './base.js'

export class UserController extends BaseController<User> {
  constructor() {
    super('user')
  }
}
