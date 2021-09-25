import { Injectable } from '@nestjs/common';
import { User } from 'src/users/users.model';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly UsersService: UsersService) {}

  /* async findOne(username: string): Promise<User | undefined> {
    return await this.UsersService.findByUsername(username);
  } */

  async validateUser(username: string, password: string): Promise<any> {
    const user: User = await this.UsersService.findByUsername(username);

    if (user) {
      const check = await compare(password, user.password);
      if (check) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }
}
