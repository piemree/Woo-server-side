import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/users.model';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './rooms.model';
import * as mongoose from 'mongoose';

@Injectable()
export class RoomsService {
  private rooms: Room[];

  constructor(
    @InjectModel('Room') private readonly roomModel: Model<Room>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const users = createRoomDto.users.map((id) => {
      return mongoose.Types.ObjectId(id);
    });

    const roomsUsers = await this.userModel.find({ _id: { $in: users } });
    createRoomDto.users = roomsUsers;
    const room = new this.roomModel(createRoomDto);
    return await room.save();
  }

  findAll() {
    return `This action returns all rooms`;
  }

  findOne(id: string) {
    return `This action returns a #${id} room`;
  }

  update(id: string, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  async remove(id: string) {
    return await this.roomModel.findByIdAndDelete(id);
  }
}
