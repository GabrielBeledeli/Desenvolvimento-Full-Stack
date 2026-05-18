import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server | undefined;

  private userSessions = new Map<string, string>();

  async handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
    
    // Envia o histórico de mensagens para o usuário que acabou de conectar
    const history = await this.chatService.findAll();
    client.emit('chatHistory', history);
  }

  handleDisconnect(client: Socket) {
    const userName = this.userSessions.get(client.id) || client.id;
    console.log(`Usuário desconectado: ${userName}`);
    
    // Notifica todos sobre a saída
    this.server?.emit('presence', {
      event: 'disconnect',
      userName: userName,
      message: `${userName} saiu do chat`,
    });

    this.userSessions.delete(client.id);
  }

  @SubscribeMessage('joinChat')
  handleJoin(@ConnectedSocket() client: Socket, @MessageBody() data: { userName: string }) {
    this.userSessions.set(client.id, data.userName);
    
    // Notifica todos sobre a entrada
    this.server?.emit('presence', {
      event: 'connection',
      userName: data.userName,
      message: `${data.userName} entrou no chat`,
    });
  }

  @SubscribeMessage('msgToServer')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sender: string; message: string },
  ) {
    // Persiste a mensagem no banco
    const savedMsg = await this.chatService.create(data);

    // Broadcast: Envia para TODOS os clientes conectados (inclusive quem enviou)
    this.server?.emit('msgToClient', {
      ...savedMsg,
      time: savedMsg.createdAt.toLocaleTimeString(),
    });
  }
}
