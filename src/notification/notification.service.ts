import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { UpdatePartialNotificationDto } from './dto/update-partial-notification.dto';

@Injectable()
export class NotificationService {

  constructor(private prisma: PrismaService) {}

  async create({message, from, to, typeId, ready}: CreateNotificationDto) {
    return await this.prisma.notification.create({
      data: {
        message,
        from,
        to,
        typeId,
        ready
      },
      select: {
        id: true,
        message: true
      }
    });
  }

  async findAll() {
    return this.prisma.notification.findMany({
      where: {
        ready: false,
      },
      include: {
        type: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.notification.findUnique({
      where: {
        id
      },
      include: {
        type: true,
      },
    })
  }

  async update(id: number, data: UpdateNotificationDto) {
    await this.exists(id);

    return this.prisma.notification.update({
      data,
      where: {
        id
      }
    })
  }

  async updatePartial(id: number, data: UpdatePartialNotificationDto) {
    await this.exists(id);

    return this.prisma.notification.update({
      data,
      where: {
        id
      }
    })
  }

  async remove(id: number) {
    await this.exists(id);

    return this.prisma.notification.delete({
      where: {
        id
      }
    })
  }

  async exists(id:number) {
    if (!(await this.findOne(id))) {
      throw new NotFoundException('User not found');
    }
  }
}
