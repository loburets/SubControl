import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Currency, SubscriptionRequestDto } from './requests.dto';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

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

export class SubscriptionPaymentResponseDto {
  @ApiProperty({ description: 'The ID of the subscription' })
  @Expose()
  subscriptionId!: number;

  @ApiProperty({ description: 'The Name of the subscription' })
  @Expose()
  @IsString()
  subscriptionName!: string;

  @ApiProperty({ description: 'Amount in cents' })
  @Expose()
  @IsNumber()
  @Min(1)
  amount!: number;

  @ApiProperty({ description: 'Currency' })
  @IsEnum(Currency)
  @Expose()
  currency!: Currency;

  @ApiProperty({ description: 'The date of the payment' })
  @Expose()
  @IsDateString()
  date!: Date;
}

export class SubscriptionStatsResponseDto {
  @ApiProperty({
    description: 'List of the next payments',
    type: [SubscriptionPaymentResponseDto],
  })
  @Expose()
  nextPayments!: SubscriptionPaymentResponseDto[];

  @ApiProperty({ description: 'Amount in cents' })
  @Expose()
  @IsNumber()
  @Min(1)
  next30daysAmount!: number;

  @ApiProperty({ description: 'Amount in cents' })
  @Expose()
  @IsNumber()
  @Min(1)
  next365daysAmount!: number;

  @ApiProperty({
    description: 'List of the next payments',
    type: [SubscriptionPaymentResponseDto],
  })
  @Expose()
  pastPayments!: SubscriptionPaymentResponseDto[];

  @ApiProperty({ description: 'Amount in cents' })
  @Expose()
  @IsNumber()
  @Min(1)
  totalSpent!: number;

  @ApiProperty({ description: 'Amount in cents' })
  @Expose()
  @IsNumber()
  @Min(1)
  expectedSpentThisYear!: number;

  @ApiProperty({ description: 'Amount in cents' })
  @Expose()
  @IsNumber()
  @Min(1)
  spentLastYear!: number;

  @ApiProperty({ description: 'Amount in cents' })
  @Expose()
  @IsNumber()
  @Min(1)
  spentPast30days!: number;

  @ApiProperty({ description: 'Amount in cents' })
  @Expose()
  @IsNumber()
  @Min(1)
  spentPast365days!: number;
}
