import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get()
  async getAll() {
    return await this.UsersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.UsersService.findOne(id);
  }

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.UsersService.create(createUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.UsersService.remove(id);
  }
}
