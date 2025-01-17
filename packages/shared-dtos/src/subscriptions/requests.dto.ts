import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SubscriptionRequestDto {
  @ApiProperty({ description: 'The Name of the subscription' })
  @Expose()
  name!: string;

  @ApiProperty({ description: 'The Period' })
  @Expose()
  period!: string;

  @ApiProperty({ description: 'Price per period in cents' })
  @Expose()
  centsPerPeriod!: number;

  @ApiProperty({ description: 'Currency' })
  @Expose()
  currency!: string;

  @ApiProperty({ description: 'The creation date of the subscription' })
  @Expose()
  createdAt!: Date;

  @ApiProperty({ description: 'The creation date of the subscription' })
  @Expose()
  cancelledAt!: Date | null;

  @ApiProperty({ description: 'The start date of the subscription' })
  @Expose()
  startedAt!: Date;
}
