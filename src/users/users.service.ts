import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }
  async findOne(id: string) {
    return await this.userModel.findById(id).exec();
  }
  async findByUsername(username: string) {
    return await this.userModel.findOne({ username }).exec();
  }
  async create(user: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async findOneAndJoinRoom(userId: string, roomId: string) {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $push: { rooms: roomId } },
      { new: true, useFindAndModify: false },
    );
  }

  async findOneAndDeleteRoom(userId: string, roomId: string) {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $pullAll: { rooms: [roomId] } },
      { new: true, useFindAndModify: false },
    );
  }

  async remove(id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove(id);
  }
}
