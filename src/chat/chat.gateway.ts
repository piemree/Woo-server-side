import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { UsersService } from 'src/users/users.service';
@WebSocketGateway({ cors: { origin: process.env.ORIGIN || '*' },path:"/socket" })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() private server: Server;

  private logger: Logger = new Logger('ChatGateway');


constructor(private readonly userService: UsersService){}

  @SubscribeMessage('sendMessage')
  handleMessage(
    client: Socket,
    payload: { roomName: string; message: string },
  ): void {
    this.server
      .to(payload.roomName)
      .emit('message', { message: payload.message, id: client.id });
  }

  @SubscribeMessage('joinRoom')
  joinRoom(client: Socket, roomName:string) {

    client.join(roomName);
  }

  @SubscribeMessage('credentials')
  getCredentials(client: Socket, payload: any): void {

  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    await client.join('oda1');
    this.logger.log(`Client connected: ${client.id}`);
    client.emit('setId', { id: client.id });
  }
}
