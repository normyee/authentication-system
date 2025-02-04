import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ListRepository {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, data: any) {
    return this.prisma.list.create({
      data: {
        ...data,
        userId: userId,
      },
    });
  }

  async getById(id: number) {
    return this.prisma.list.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: any) {
    return this.prisma.list.update({
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
