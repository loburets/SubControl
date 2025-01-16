import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SubscriptionResponseDto {
  @ApiProperty({ description: 'The ID of the subscription' })
  @Expose()
  id!: number;

  @ApiProperty({ description: 'The Name of the subscription' })
  @Expose()
  name!: string;

  @ApiProperty({ description: 'The creation date of the subscription' })
  @Expose()
  createdAt!: Date;
}

export class SubscriptionListResponseDto {
  @ApiProperty({
    description: 'The list of subscriptions',
    type: [SubscriptionResponseDto],
  })
  @Expose()
  subscriptions!: SubscriptionResponseDto[];
}
