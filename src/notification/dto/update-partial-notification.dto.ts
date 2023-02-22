import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificationDto } from './create-notification.dto';

export class UpdatePartialNotificationDto extends PartialType(CreateNotificationDto) {}
