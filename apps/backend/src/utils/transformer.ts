import { plainToInstance } from 'class-transformer';

export function transformToResponseDto<T>(data: any, cls: new () => T): T {
  return plainToInstance(cls, data, {
    excludeExtraneousValues: true,
  });
}
