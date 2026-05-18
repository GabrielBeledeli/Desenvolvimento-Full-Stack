import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany(
      {
        include:{
          author: true,
          tags: true,
        }
      }
    );
  }

  async create(data: any) {
    return this.prisma.task.create({ data: data });
  }

  async findOne(id: string) {
    return this.prisma.task.findUnique({
      where: { id: parseInt(id) },
      include: {
        author: true,
        tags: true,
      }
    });
  }

  async update(id: string, updateData: any) {
    return this.prisma.task.update({
      where: { id: parseInt(id) },
      data: updateData,
    });
  }

  async partialUpdate(id: string, updateData: any) {
    return this.prisma.task.update({
      where: { id: parseInt(id) },
      data: updateData,
    });
  }

  async remove(id: string) {
    return this.prisma.task.delete({
      where: { id: parseInt(id) },
    });
  }
}
