import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SubscriptionRequestDto {
  @ApiProperty({ description: 'The Name of the subscription' })
  @Expose()
  name!: string;
}
