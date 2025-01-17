import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsString,
  IsDateString,
  IsNumber,
  IsEnum,
  IsOptional,
  Min,
} from 'class-validator';

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
  AUD = 'AUD',
  CAD = 'CAD',
  RUB = 'RUB',
  TRY = 'TRY',
  OTHER = 'OTHER',
}

export enum Period {
  YEARLY = 'YEARLY',
  MONTHLY = 'MONTHLY',
  WEEKLY = 'WEEKLY',
}

export class SubscriptionRequestDto {
  @ApiProperty({ description: 'The Name of the subscription' })
  @Expose()
  @IsString()
  name!: string;

  @ApiProperty({ description: 'The Period' })
  @Expose()
  @IsEnum(Period)
  period!: Period;

  @ApiProperty({ description: 'Price per period in cents' })
  @Expose()
  @IsNumber()
  @Min(1)
  centsPerPeriod!: number;

  @ApiProperty({ description: 'Currency' })
  @IsEnum(Currency)
  @Expose()
  currency!: Currency;

  @ApiProperty({ description: 'The creation date of the subscription' })
  @Expose()
  @IsDateString()
  @IsOptional()
  cancelledAt!: Date | null | undefined;

  @ApiProperty({ description: 'The start date of the subscription' })
  @Expose()
  @IsDateString()
  startedAt!: Date;
}
