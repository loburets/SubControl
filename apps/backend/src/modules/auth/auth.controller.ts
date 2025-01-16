import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import {
  CreateUserRequestDto,
  LoginUserRequestDto,
  AuthResponseDto,
} from '@subcontrol/shared-dtos/auth';
import { transformToResponseDto } from '../../utils/transformer';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 200,
    description: 'User has been registered.',
    type: AuthResponseDto,
  })
  @Post('register')
  async register(@Body() body: CreateUserRequestDto) {
    return transformToResponseDto(
      this.authService.register(body),
      AuthResponseDto
    );
  }

  @ApiResponse({
    status: 200,
    description: 'User has been logged it.',
    type: AuthResponseDto,
  })
  @Post('login')
  async login(@Body() body: LoginUserRequestDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    return transformToResponseDto(
      this.authService.login(user),
      AuthResponseDto
    );
  }
}
