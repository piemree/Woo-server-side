import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema } from 'src/rooms/rooms.model';
import { RoomsModule } from 'src/rooms/rooms.module';
import { UserSchema } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  imports: [
    UsersModule,
    RoomsModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }])
  ],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
