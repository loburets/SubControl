import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { SubscriptionRequestDto } from './requests.dto';

export class SubscriptionResponseDto extends SubscriptionRequestDto {
  @ApiProperty({ description: 'The ID of the subscription' })
  @Expose()
  id!: number;
}

export class SubscriptionListResponseDto {
  @ApiProperty({
    description: 'The list of subscriptions',
    type: [SubscriptionResponseDto],
  })
  @Expose()
  subscriptions!: SubscriptionResponseDto[];
}
