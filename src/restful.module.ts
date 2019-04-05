import { DynamicModule, Global, Module } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { PipeDto } from "./dto";

@Global()
@Module({})
export class RestfulModule {
  static forPipe(): DynamicModule {
    return {
      module: RestfulModule,
      providers: [
        { provide: APP_PIPE, useClass: PipeDto }
      ]
    };
  }
}
