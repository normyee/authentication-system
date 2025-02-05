import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserDTO } from 'src/user-auth/application/dtos/user.dto';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.user.create({
      data,
    });
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async getUserByEmailToken(emailToken: string) {
    return this.prisma.user.findUnique({
      where: { emailToken },
    });
  }

  async get() {
    return this.prisma.user.findMany();
  }

  async update(id: number, data: any) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
