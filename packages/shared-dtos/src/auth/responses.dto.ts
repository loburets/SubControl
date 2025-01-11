import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    description: 'Access token to be used in the Authorization Bearer header',
  })
  @Expose()
  accessToken!: string;
}
