import { Injectable } from '@nestjs/common';
import { UserSchema } from './user-schema';
import { BaseService } from '../src/services';
import { UserDocument } from './user-document';

@Injectable()
export class UserService extends BaseService<UserDocument> {
  constructor(private schema: UserSchema) {
    super(schema.model);
  }
}
