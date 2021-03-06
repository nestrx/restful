import { NotFoundException } from '@nestjs/common';
import { Document, Model, QueryFindOneAndRemoveOptions, SaveOptions } from 'mongoose';
import { ListDto, ViewDto } from '../dto';

export class BaseService<T extends Document> {
  constructor(public model: Model<T>) {
  }

  async findOne(condition: any, projection?: any, options?: any): Promise<T> {
    return await this.model.findOne(condition, projection, options).exec();
  }

  async findById(id: string, projection?: any, options?: any): Promise<T> {
    return await this.model.findById(id, projection, options).exec();
  }

  async create(data: any, options?: SaveOptions): Promise<T> {
    try {
      return await new this.model(data).save(options);
    } catch (e) {
      throw e;
    }
  }

  async list(query?: ListDto): Promise<T[]> {
    try {
      const { filter = {}, fields = {}, skip = 0, limit = 20, expands = [] } = query;
      let command = this.model.find(filter).select(fields).skip(skip).limit(limit);
      if (Array.isArray(expands) && expands.length) {
        for (let expand of expands) {
          command.populate(expand);
        }
      }
      return await command.exec();
    } catch (e) {
      throw e;
    }
  }

  async view(condition: any, query?: ViewDto) {
    try {
      const { fields = {}, expands = [] } = query;
      let command = this.model.findOne(condition).select(fields);
      if (Array.isArray(expands) && expands.length) {
        for (let expand of query.expands) {
          command.populate(expand);
        }
      }
      let doc = await command.exec();
      if (!doc) {
        throw new NotFoundException('The request document was not found.');
      }
      return doc;
    } catch (e) {
      throw e;
    }
  }

  async update(condition: any, data: any, options?: SaveOptions): Promise<T> {
    try {
      let document: T = await this.findOne(condition);
      if (document) {
        for (let key of Object.keys(data)) {
          document[key] = data[key];
        }
        return await document.save(options);
      } else {
        throw new NotFoundException('The request document was not found.');
      }
    } catch (e) {
      throw e;
    }
  }

  async remove(condition: any, options?: QueryFindOneAndRemoveOptions): Promise<T | null> {
    try {
      return await this.model.findOneAndRemove(condition, options).exec();
    } catch (e) {
      throw e;
    }
  }
}


