import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserDTO } from 'src/user-auth/application/dtos/user.dto';
import { IUserRepository } from 'src/user-auth/domain/repositories/user.repository';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.user.create({
      data,
    });
  }

  async getById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
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
