import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export type Message = {
  id?: number;
  sender: string;
  message: string;
  time?: string;
  createdAt?: string;
  isPresence?: boolean;
};

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:3000');

    // Carrega o histórico
    socketRef.current.on('chatHistory', (history: Message[]) => {
      const formattedHistory = history.map(msg => ({
        ...msg,
        time: msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString() : undefined
      }));
      setMessages(formattedHistory);
    });

    // Novas mensagens
    socketRef.current.on('msgToClient', (newMsg: Message) => {
      setMessages((prev) => [...prev, newMsg]);
    });

    // Eventos de presença
    socketRef.current.on('presence', (presence: { message: string }) => {
      setMessages((prev) => [...prev, { 
        sender: 'Sistema', 
        message: presence.message, 
        isPresence: true 
      }]);
    });

    return () => {
      socketRef.current?.off('chatHistory');
      socketRef.current?.off('msgToClient');
      socketRef.current?.off('presence');
      socketRef.current?.disconnect();
    };
  }, []);

  const sendMessage = (sender: string, message: string) => {
    socketRef.current?.emit('msgToServer', { sender, message });
  };

  const joinChat = (userName: string) => {
    socketRef.current?.emit('joinChat', { userName });
  };

  return { messages, sendMessage, joinChat };
  };