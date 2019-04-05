import { UserDocument } from './user-document';
import { DocmentSchema } from '../src/schemas';
import { Connection, Model, Schema, SchemaDefinition, SchemaOptions } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { AesGcmService } from '@nestrx/aes-gcm';

@Injectable()
export class UserSchema implements DocmentSchema<UserDocument> {

  collection = 'users';
  modelName = 'user';

  schemaDefinition: SchemaDefinition = {
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    },
    name: String,
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: String,
    createdAt: Date,
    updatedAt: { type: Date, default: Date.now }
  };

  schemaOptions: SchemaOptions = {
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.password;
      }
    }
  };

  schema: Schema<UserDocument> = new Schema<UserDocument>(this.schemaDefinition, this.schemaOptions);
  private _model: Model<UserDocument>;

  constructor(@InjectConnection() private readonly connection: Connection,
              private aes: AesGcmService) {
    this.middleware(aes);
  }

  get model(): Model<UserDocument> {
    if (!this._model) {
      this._model = this.connection.model(this.modelName, this.schema, this.collection);
    }
    return this._model;
  }

  private middleware(aes: AesGcmService) {
    this.schema.pre<UserDocument>('save', function(next: () => void) {
      if (this.isNew) {
        this.createdAt = new Date();
      }
      if (this.isModified('password') && this.password) {
        this.password = aes.encrypt(`${this.password}${this.id}`);
      }
      next();
    });

    this.schema.method('compare', function(password: string) {
      try {
        return aes.decrypt(this.password) === `${password}${this.id}`;
      } catch (e) {
        return false;
      }
    });
  }
}
