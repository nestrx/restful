import { Body, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { Document } from "mongoose";
import { BaseService } from "../services";
import { ListDto, ViewDto } from "../dto";

export class BaseController<T extends Document, C extends any, U extends any> {
  constructor(public service: BaseService<T>) {
  }

  @Post()
  async create(@Body() data: C) {
    try {
      return await this.service.create(data);
    } catch (e) {
      throw e;
    }
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() data: U) {
    try {
      return await this.service.update({ _id: id }, data);
    } catch (e) {
      throw e;
    }
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    try {
      return await this.service.remove({ _id: id });
    } catch (e) {
      throw e;
    }
  }

  @Get()
  async list(@Query() query: ListDto) {
    try {
      return await this.service.list(query);
    } catch (e) {
      throw e;
    }
  }

  @Get(":id")
  async view(@Param("id") id: string, @Query() query: ViewDto) {
    try {
      return await this.service.view({ _id: id }, query);
    } catch (e) {
      throw e;
    }
  }

}
