import { Body, Controller, Post } from '@nestjs/common';
import { OwnedController } from '../src/controllers';
import { UserDocument } from './user-document';
import { UserService } from './user.service';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';


@Controller('users')
export class UserController extends OwnedController<UserDocument, CreateDto, UpdateDto> {
  constructor(public service: UserService) {
    super(service);
  }

  // override action to allow guest to create account
  @Post()
  async create(@Body() data: CreateDto): Promise<UserDocument> {
    return this.service.create(data);
  }
}
