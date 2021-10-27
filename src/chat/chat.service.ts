import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from 'src/rooms/rooms.model';
import { User } from 'src/users/users.model';

@Injectable()
export class ChatService {
  private rooms: Room[] = [];

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  createRoom(roomName: string) {
    const room = this.findRoom(roomName);

    if (room) return room;

    this.rooms.push({ name: roomName });

    return this.rooms[this.rooms.length - 1];
  }

  async addUserToRoom(username: string, roomName: string) {
    const user = await this.userModel.findOne({ username });
    const room = this.findRoom(roomName);

    if (!user) return new Error('User not exist');
    if (!room) this.createRoom(roomName);

    this.findRoom(roomName).users.push(user);

    return this.findRoom(roomName);
  }

  findRoom(roomName: string) {
    if (this.rooms.length === 0) return null;
    const roomIndex = Object.values(this.rooms).findIndex(({ name }) => {
      return name.toLowerCase() === roomName.toLowerCase();
    });
    console.log(roomIndex);
    if (roomIndex === -1) return null;
    return this.rooms[roomIndex];
  }
}
