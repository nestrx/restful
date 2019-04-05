import { Model, Schema, Document, SchemaDefinition, SchemaOptions } from "mongoose";

export interface DocmentSchema<T extends Document> {
  modelName: string;
  collection?: string;
  schemaDefinition: SchemaDefinition;
  schemaOptions: SchemaOptions;
  schema: Schema<T>;
  model?: Model<T>;
}


