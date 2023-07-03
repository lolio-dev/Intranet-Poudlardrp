import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { request } from 'express';

@Catch(QueryFailedError)
export class QueryFailedFilter implements ExceptionFilter {
  constructor(private message: string) {}

  catch(exception: QueryFailedError, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const { url } = request;
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      path: url,
      message: this.message,
      timestamp: new Date().toISOString(),
      statusCode: httpStatus
    }

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}
