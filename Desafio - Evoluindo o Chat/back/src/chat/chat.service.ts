import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async create(data: { sender: string; message: string }) {
    return this.prisma.chatMessage.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.chatMessage.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
