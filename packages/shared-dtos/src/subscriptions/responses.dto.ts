import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { SubscriptionRequestDto } from './requests.dto';
import { IsOptional } from 'class-validator';

export class SubscriptionResponseDto extends SubscriptionRequestDto {
  @ApiProperty({ description: 'The ID of the subscription' })
  @Expose()
  id!: number;

  @ApiProperty({ description: 'The creation date of the subscription' })
  @Expose()
  createdAt!: Date;

  @ApiProperty({ description: 'Cost per months in cents' })
  @Expose()
  costPerMonth!: number;

  @ApiProperty({ description: 'Cost per year in cents' })
  @Expose()
  costPerYear!: number;

  @ApiProperty({ description: 'Spent amount in cents' })
  @Expose()
  totalSpent!: number;

  @ApiProperty({ description: 'Next payment' })
  @Expose()
  @IsOptional()
  nextPaymentDate!: Date | null;
}

export class SubscriptionListResponseDto {
  @ApiProperty({
    description: 'The list of subscriptions',
    type: [SubscriptionResponseDto],
  })
  @Expose()
  subscriptions!: SubscriptionResponseDto[];
}
