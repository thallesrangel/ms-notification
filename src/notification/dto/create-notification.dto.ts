import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateNotificationDto {
    @IsString()
    message: string;

    @IsNumber()
    from: number;

    @IsNumber()
    to: number;
    
    @IsNumber()
    typeId: number;

    @IsOptional()
    @IsBoolean()
    ready: boolean;
}
