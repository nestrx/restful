import { Transform } from "class-transformer";

export class ViewDto {
  @Transform(value => value || {}) fields: any = {};
  @Transform(value => value || []) expands: any[] = [];
}
