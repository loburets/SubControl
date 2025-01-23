import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    email,
    hashPassword,
    isDemo,
  }: {
    email: string;
    hashPassword: () => Promise<string>;
    isDemo?: boolean;
  }) {
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email is already taken');
    }

    return this.prisma.user.create({
      data: {
        email,
        password: await hashPassword(),
        isDemo: isDemo || false,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
