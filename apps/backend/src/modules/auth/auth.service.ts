import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: { email: string; id: number }) {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(user: { email: string; password: string }) {
    const hashedPassword = await this.hashPassword(user.password);
    const newUser = await this.usersService.create({
      email: user.email,
      hashedPassword,
    });

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
