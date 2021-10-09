import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
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
  
/*   @Public()
  @Get('me')
  getProfile(@Request() req: any) {
    return req.user;
  }
 */

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
