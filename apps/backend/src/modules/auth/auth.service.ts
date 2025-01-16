import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    this.logger.log('Failed to login user, wrong credentials', {
      userId: user?.id,
    });
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: { email: string; id: number }) {
    const payload = { email: user.email, sub: user.id };
    this.logger.log('Logged in user', { userId: user.id });
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(user: { email: string; password: string }) {
    this.logger.log('Requested to register new user');

    const newUser = await this.usersService.create({
      email: user.email,
      hashPassword: async () => await this.hashPassword(user.password),
    });

    this.logger.log('Created new user', { userId: newUser.id });

    return {
      accessToken: this.jwtService.sign({
        sub: newUser.id,
        email: newUser.email,
      }),
    };
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
