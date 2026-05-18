'use client'

import { useState, useEffect, useRef } from 'react';
import { useChat } from '../hooks/useChat';

export default function ChatPage() {
  const [userName, setUserName] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const { messages, sendMessage, joinChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      joinChat(userName);
      setIsJoined(true);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      sendMessage(userName, inputMessage);
      setInputMessage('');
    }
  };

  if (!isJoined) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-50 p-4">
        <form 
          onSubmit={handleJoin} 
          className="w-full max-w-md rounded-2xl bg-white p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-zinc-100"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-black text-zinc-900 mb-2">Chat Realtime</h1>
            <p className="text-zinc-500">Insira seu apelido para começar a conversar</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-1 ml-1">Seu Nome/Apelido</label>
              <input
                type="text"
                placeholder="Ex: João Silva"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full rounded-xl border-2 border-zinc-100 p-4 text-zinc-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-4 font-bold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Entrar na Conversa
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-zinc-50">
      {/* Header */}
      <header className="bg-white px-6 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border-b border-zinc-100 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-black text-zinc-900">Chat Coletivo</h1>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <span className="text-xs text-zinc-500 font-medium">Online como <span className="text-blue-600 font-bold">{userName}</span></span>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, index) => {
          if (msg.isPresence) {
            return (
              <div key={index} className="flex justify-center my-2">
                <span className="rounded-full bg-zinc-100 border border-zinc-200 px-4 py-1 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                  {msg.message}
                </span>
              </div>
            );
          }

          const isMe = msg.sender === userName;

          return (
            <div
              key={index}
              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex flex-col max-w-[80%] sm:max-w-[60%] ${isMe ? 'items-end' : 'items-start'}`}
              >
                {!isMe && (
                  <span className="text-xs font-bold text-zinc-500 mb-1 ml-1">
                    {msg.sender}
                  </span>
                )}
                <div
                  className={`relative rounded-2xl px-5 py-3 shadow-md ${
                    isMe
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-white text-zinc-800 border border-zinc-100 rounded-tl-none'
                  }`}
                >
                  <p className="text-sm sm:text-base leading-relaxed break-words">{msg.message}</p>
                  <span
                    className={`block text-[10px] mt-2 font-medium ${
                      isMe ? 'text-blue-100/70' : 'text-zinc-400'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </main>

      {/* Footer / Input */}
      <footer className="bg-white p-4 border-t border-zinc-100">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            placeholder="Escreva sua mensagem aqui..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 rounded-xl border-2 border-zinc-100 bg-zinc-50 px-5 py-3 text-zinc-900 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="rounded-xl bg-blue-600 px-8 py-3 font-bold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 disabled:opacity-50 disabled:shadow-none transition-all active:scale-95"
          >
            Enviar
          </button>
        </form>
      </footer>
    </div>
  );
}
