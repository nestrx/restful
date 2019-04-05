import { Expose } from 'class-transformer';

export class UpdateDto {
  @Expose({ groups: ['admin'] }) role: 'admin' | 'user';
  name?: string;
  username: string;
  @Expose({ groups: ['user'] }) password?: string;
  createdAt: Date;
  updatedAt: Date;
}
