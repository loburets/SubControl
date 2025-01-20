import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransformersService {
  transformToResponseDto<T>(data: object, cls: new () => T): T {
    return plainToInstance(cls, data, {
      excludeExtraneousValues: true,
    });
  }
}
