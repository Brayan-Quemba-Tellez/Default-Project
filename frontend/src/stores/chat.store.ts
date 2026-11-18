import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatMessage } from '@/types/chat.types';

interface ChatStore {
  conversations: ChatMessage[];
  isOpen: boolean;
  addMessage: (message: ChatMessage) => void;
  setMessages: (messages: ChatMessage[]) => void;
  toggleOpen: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      conversations: [],
      isOpen: false,
      addMessage: (message) => set((state) => ({ conversations: [...state.conversations, message] })),
      setMessages: (messages) => set({ conversations: messages }),
      toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    { name: 'chat-storage' }
  )
);
