import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  UnprocessableEntityException
} from '@nestjs/common';
import { Response } from 'express';
import { Error } from 'mongoose';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    if (exception instanceof UnprocessableEntityException) {
      return res.status(200).json({
        success: false,
        status: 422,
        errors: exception.message.message || exception.message
      });
    } else if (exception instanceof HttpException) {
      const status = exception.getStatus();
      return res.status(200).json({
        success: false,
        status: status,
        message: exception.message.message || exception.message
      });
    } else if (exception instanceof Error.ValidationError) {
      const filters = this.filterError(exception);
      const errors = [];
      this.deptClean(filters, errors);
      return res.status(200).json({
        success: false,
        status: 422,
        errors: errors
      });
    } else {
      return res.status(200).json({
        status: 500,
        message: 'Unknown Error',
        timestamp: new Date().toISOString()
      });
    }
  }

  filterError(exception: Error.ValidationError | any) {
    if (exception.errors) {
      return Object.keys(exception.errors).map((key: any) => {
        return this.filterError(exception[key]);
      });
    } else {
      return { kind: exception.kind, value: exception.value, path: exception.path };
    }
  }

  deptClean(arr: any[], results = []) {
    if (Array.isArray(arr)) {
      arr.forEach(v => {
        return this.deptClean(v, results);
      });
    } else {
      results.push(arr);
    }
  }

}
