import { plainToInstance } from 'class-transformer';

export function transformToResponseDto<T>(data: object, cls: new () => T): T {
  return plainToInstance(cls, data, {
    excludeExtraneousValues: true,
  });
}
