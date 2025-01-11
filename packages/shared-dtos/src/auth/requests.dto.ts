import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsDefined, MinLength } from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({ description: 'Email of the user' })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsDefined({ message: 'Email is required' })
  @Expose()
  email!: string;

  @ApiProperty({ description: 'Password of the user' })
  @IsDefined({ message: 'Password is required' })
  @MinLength(3, { message: 'Password must be at least 3 characters long' })
  @Expose()
  password!: string;
}

export class LoginUserRequestDto {
  @ApiProperty({ description: 'Email of the user' })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsDefined({ message: 'Email is required' })
  @Expose()
  email!: string;

  @ApiProperty({ description: 'Password of the user' })
  @IsDefined({ message: 'Password is required' })
  @MinLength(3, { message: 'Password must be at least 3 characters long' })
  @Expose()
  password!: string;
}
