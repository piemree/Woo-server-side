import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsArray()
  @IsString({ each: true })
  users: any[];

  @IsNotEmpty()
  name: string;
}
