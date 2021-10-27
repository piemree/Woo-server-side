import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { CreateRoomDto } from 'src/rooms/dto/create-room.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get()
  async getAll() {
    return await this.UsersService.findAll();
  }

  @Get('find/:id')
  async findOne(@Param('id') id: string) {
    return await this.UsersService.findOne(id);
  }

  @Patch('joinRoom/:roomId')
  async addRoomToUser(@Param("roomId") roomId: string,@Request() req: any) {
    return this.UsersService.findOneAndJoinRoom(req.user.userId,roomId)
  }

  @Patch('leaveRoom/:roomId')
  async deleteRoomFromUser(@Param("roomId") roomId: string,@Request() req: any) {
   return  this.UsersService.findOneAndDeleteRoom(req.user.userId,roomId)
  }
  

  @Public()
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.UsersService.create(createUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.UsersService.remove(id);
  }
}
