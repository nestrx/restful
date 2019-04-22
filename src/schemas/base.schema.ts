import { Model, Schema, Document, SchemaDefinition, SchemaOptions } from "mongoose";

export interface BaseSchema<T extends Document> {
  readonly modelName: string;
  readonly collection?: string;
  readonly definitions: SchemaDefinition;
  readonly options: SchemaOptions;
  readonly schema: Schema<T>;
  readonly model: Model<T>;
}


