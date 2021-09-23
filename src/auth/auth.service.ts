import { Injectable } from '@nestjs/common';
import { User } from 'src/users/users.model';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly UsersService: UsersService) {}
  async findOne(username: string): Promise<User | undefined> {
    return await this.UsersService.findByUsername(username);
  }
}
