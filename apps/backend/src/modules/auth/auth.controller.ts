import { Controller, Post, Body, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateUserRequestDto,
  LoginUserRequestDto,
  AuthResponseDto,
} from '@subcontrol/shared-dtos/auth';
import { ApiResponse } from '@nestjs/swagger';
import { TransformersService } from '../transformers/transformers.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly transformersService: TransformersService
  ) {}

  @ApiResponse({
    status: 201,
    description: 'User has been registered.',
    type: AuthResponseDto,
  })
  @Post('register')
  async register(@Body() body: CreateUserRequestDto) {
    return this.transformersService.transformToResponseDto(
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
    this.logger.log('Requested to login user');

    const user = await this.authService.validateUser(body.email, body.password);
    return this.transformersService.transformToResponseDto(
      this.authService.login(user),
      AuthResponseDto
    );
  }

  @ApiResponse({
    status: 201,
    description: 'User has been registered and demo data was seeded.',
    type: AuthResponseDto,
  })
  @Post('demo')
  async createDemo() {
    const response = await this.authService.makeDemoAccount();
    return this.transformersService.transformToResponseDto(
      response,
      AuthResponseDto
    );
  }
}
