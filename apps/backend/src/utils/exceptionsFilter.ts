import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import Bugsnag from '@bugsnag/js';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    Bugsnag.notify(exception as Error);
    super.catch(exception, host);
  }
}
