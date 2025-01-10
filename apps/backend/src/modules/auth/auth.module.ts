import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [AuthService, JwtStrategy],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_secret_key', // Provide the secret key here
      signOptions: { expiresIn: '1h' }, // Optional: Set expiration time
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
