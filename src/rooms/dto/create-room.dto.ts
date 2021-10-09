import { IsArray, IsNotEmpty } from 'class-validator';

interface User {
  userId: string;
  username: string;
}

export class CreateRoomDto {
  @IsArray()
  users: User[];
  
  @IsNotEmpty()
  name: string;
}
