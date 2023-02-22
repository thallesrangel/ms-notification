import { Controller, Get, Post, Body, Put, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { UpdatePartialNotificationDto } from './dto/update-partial-notification.dto';

@Controller('notification')
export class NotificationController {
  
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async create(@Body() { message, from, to, typeId, ready }: CreateNotificationDto) {
    return this.notificationService.create({ message, from, to, typeId, ready });
  }

  @Get()
  async findAll() {
    return this.notificationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.notificationService.findOne(+id);
  }

  @Put(':id')
  async update(@Body() body: UpdateNotificationDto, @Param('id', ParseIntPipe) id: number) {
    return this.notificationService.update(id, body);
  }

  @Patch(':id')
  async updatePartial(@Param('id', ParseIntPipe) id: number, @Body() data: UpdatePartialNotificationDto) {
    return this.notificationService.updatePartial(+id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.notificationService.remove(+id);
  }
}
