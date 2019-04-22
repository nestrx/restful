import { DynamicModule, Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AllExceptionFilter, PipeDto, TransformInterceptor } from './common';

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

  static forFilter(): DynamicModule {
    return {
      module: RestfulModule,
      providers: [
        { provide: APP_FILTER, useClass: AllExceptionFilter }
      ]
    };
  }

  static forInterceptor(): DynamicModule {
    return {
      module: RestfulModule,
      providers: [
        { provide: APP_INTERCEPTOR, useClass: TransformInterceptor }
      ]
    };
  }

  static forRoot(): DynamicModule {
    return {
      module: RestfulModule,
      providers: [
        { provide: APP_PIPE, useClass: PipeDto },
        { provide: APP_FILTER, useClass: AllExceptionFilter },
        { provide: APP_INTERCEPTOR, useClass: TransformInterceptor }
      ]
    };
  }
}
