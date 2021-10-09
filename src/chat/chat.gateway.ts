import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { Room } from 'src/rooms/rooms.model';
@WebSocketGateway({ cors: { origin: process.env.ORIGIN || '*' } })
export class ChatGateway
  implements  OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() private server: Server;

  private logger: Logger = new Logger('ChatGateway');

  @SubscribeMessage('sendMessage')
  handleMessage(
    client: Socket,
    payload: { room: Room; message: string },
  ): void {
    this.server
      .to(payload.room.name)
      .emit('message', { message: payload.message, id: client.id });
  }

  @SubscribeMessage('credentials')
  getCredentials(client: Socket, payload: any): void {
    console.log(payload);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    client.emit('setId', { id: client.id });
  }
}
