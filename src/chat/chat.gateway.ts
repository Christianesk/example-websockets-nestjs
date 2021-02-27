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
  handleMessage(client: Socket, message: { sender: string, message: string }) {
    this.wss.emit('chatToClient', message);
  }
}
