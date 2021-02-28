import { Logger } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayInit {

  @WebSocketServer() wss: Socket;

  afterInit(server: any) {
    this.logger.log('Initialized');
  }

  private logger: Logger = new Logger('ChatGateway');

  @SubscribeMessage('chatToServer')
  handleMessage(client: Socket, payload: { sender: string, room: string, message: string }) {
    this.wss.to(payload.room).emit('chatToClient', payload);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string){
    client.join(room);
    client.emit('joinedRoom',room);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string){
    client.leave(room);
    client.emit('leftRoom',room);
  }
}
