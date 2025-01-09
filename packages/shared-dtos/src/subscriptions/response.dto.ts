import { Expose } from 'class-transformer';

export class SubscriptionResponseDto {
  @Expose() id!: number;
  @Expose() name!: string;
  @Expose() createdAt!: Date;
}
