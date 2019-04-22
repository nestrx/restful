import { Transform } from 'class-transformer';

export class ListDto {
  @Transform(value => value || {}) filter: any = {};
  @Transform(value => value || {}) fields: any = {};
  @Transform((v) => parseInt(v) || 10, { toPlainOnly: true }) limit: number = 10;
  @Transform(value => parseInt(value) || 0) skip: number = 0;
  @Transform(value => value || []) expands: any[] = [];
}
