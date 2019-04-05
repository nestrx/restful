import { Body, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { Role, User } from '@nestrx/access-control';
import { Document } from "mongoose";
import { BaseService } from "../services";
import { ListDto, ViewDto } from "../dto";


export class OwnedController<T extends Document, C extends any, U extends any> {
  constructor(public service: BaseService<T>) {
  }

  @Post()
  @Role()
  async create(@Body() data: C, @User("id") createdBy: string) {
    try {
      data.createdBy = createdBy;
      return await this.service.create(data);
    } catch (e) {
      throw e;
    }
  }

  @Put(":id")
  @Role()
  async update(@Param("id") id: string, @Body() data: U, @User("id") createdBy: string) {
    try {
      return await this.service.update({ _id: id, createdBy: createdBy }, data);
    } catch (e) {
      throw e;
    }
  }

  @Delete(":id")
  @Role()
  async remove(@Param("id") id: string, @User("id") createdBy: string) {
    try {
      return await this.service.remove({ _id: id, createdBy: createdBy });
    } catch (e) {
      throw e;
    }
  }

  @Get()
  @Role()
  async list(@Query() query: ListDto, @User("id") createdBy: string) {
    try {
      query.filter = query.filter || {};
      query.filter.createdBy = createdBy;
      return await this.service.remove(query);
    } catch (e) {
      throw e;
    }
  }

  @Get(":id")
  @Role()
  async view(@Param("id") id: string, @Query() query: ViewDto, @User("id") createdBy: string) {
    try {
      return await this.service.view({ _id: id, createdBy: createdBy }, query);
    } catch (e) {
      throw e;
    }
  }

}
