import { Server } from 'socket.io';
import type * as HttpServer from 'http';

interface MessageType {
  text: string;
  roomId: string;
  senderId: string;
}

type RoomMessageFormat = Record<string, MessageType[]>;

const roomMessages: RoomMessageFormat = {};

let onlineUsers: { userId: string }[] = [];

export const initSocket = (httpServer: HttpServer.Server): void => {
  const socketIO = new Server(httpServer, {
    cors: {
      origin: process.env['CORS_URL'],
      credentials: true,
    },
  });

  socketIO.on('connection', (socket) => {
    socket.on('message', (data: MessageType) => {
      const { roomId } = data;
      roomMessages[roomId] ??= [];
      roomMessages[roomId].push(data);
      if (roomMessages[roomId].length > 50) roomMessages[roomId].shift();
      socketIO.to(roomId).emit('message_response', data);
    });

    socket.broadcast.emit('userJoined', socket.id);

    socket.on('private-room', ({ sender, recipent }) => {
      const roomId = [sender, recipent].sort().join('-');
      void socket.join(roomId);
      socketIO.to(roomId).emit('roomCreated', roomId);
      const history = roomMessages[roomId] ?? [];
      socket.emit('message_history', history);
    });

    socket.on('new-user-add', (userId: string) => {
      if (!onlineUsers.some((user) => user.userId === userId)) {
        onlineUsers.push({ userId });
      }
      socketIO.emit(
        'get-users',
        onlineUsers.map((u) => u.userId)
      );
    });

    socket.on('user_logout', (userId) => {
      onlineUsers = onlineUsers.filter((user) => user.userId !== userId);
      socketIO.emit(
        'get-users',
        onlineUsers.map((u) => u.userId)
      );
    });
  });
};
