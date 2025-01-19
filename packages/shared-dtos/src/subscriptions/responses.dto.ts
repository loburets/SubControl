import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Currency, SubscriptionRequestDto } from './requests.dto';

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

  @ApiProperty({ description: 'Amount that already was spent in cents' })
  @Expose()
  totalSpent!: number;

  @ApiProperty({ description: 'Next payment date' })
  @Expose()
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

export class SubscriptionPaymentResponseDto {
  @ApiProperty({ description: 'The ID of the subscription' })
  @Expose()
  subscriptionId!: number;

  @ApiProperty({ description: 'The Name of the subscription' })
  @Expose()
  subscriptionName!: string;

  @ApiProperty({ description: 'Amount in cents' })
  @Expose()
  amount!: number;

  @ApiProperty({ description: 'Currency' })
  @Expose()
  currency!: Currency;

  @ApiProperty({ description: 'The date of the payment' })
  @Expose()
  date!: Date;
}

export class AmountResponseDto {
  @ApiProperty({ description: 'Amount in cents' })
  @Expose()
  amount!: number;

  @ApiProperty({ description: 'Currency' })
  @Expose()
  currency!: Currency;
}

export class SubscriptionStatsResponseDto {
  @ApiProperty({
    description: 'List of the next payments',
    type: [SubscriptionPaymentResponseDto],
  })
  @Expose()
  nextPayments!: SubscriptionPaymentResponseDto[];

  @ApiProperty({ description: 'Amount in cents', type: AmountResponseDto })
  @Expose()
  next30DaysAmount!: AmountResponseDto[];

  @ApiProperty({
    description: 'Amounts in cents split by currency',
    type: [AmountResponseDto],
  })
  @Expose()
  next365DaysAmount!: AmountResponseDto[];

  @ApiProperty({
    description: 'List of the next payments',
    type: [SubscriptionPaymentResponseDto],
  })
  @Expose()
  pastPayments!: SubscriptionPaymentResponseDto[];

  @ApiProperty({
    description: 'Amounts in cents split by currency',
    type: [AmountResponseDto],
  })
  @Expose()
  totalSpent!: AmountResponseDto[];

  @ApiProperty({
    description: 'Amounts in cents split by currency',
    type: [AmountResponseDto],
  })
  @Expose()
  expectedSpentThisYear!: AmountResponseDto[];

  @ApiProperty({
    description: 'Amounts in cents split by currency',
    type: [AmountResponseDto],
  })
  @Expose()
  spentLastYear!: AmountResponseDto[];

  @ApiProperty({
    description: 'Amounts in cents split by currency',
    type: [AmountResponseDto],
  })
  @Expose()
  spentPast30Days!: AmountResponseDto[];

  @ApiProperty({
    description: 'Amounts in cents split by currency',
    type: [AmountResponseDto],
  })
  @Expose()
  spentPast365Days!: AmountResponseDto[];
}
