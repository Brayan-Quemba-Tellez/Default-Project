import { useState, useEffect, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { chatApi, ChatMessage } from '@/api/chat.api';
import { useChatStore } from '@/stores/chat.store';
import { useAuthStore } from '@/stores/auth.store';

const getSessionId = () => {
  let sessionId = localStorage.getItem('chat_session_id');
  if (!sessionId) {
    sessionId = 'sess_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
    localStorage.setItem('chat_session_id', sessionId);
  }
  return sessionId;
};

export const useChat = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const { isOpen, toggleOpen } = useChatStore();
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const sessionId = getSessionId();

  // Load history if any
  const historyQuery = useQuery({
    queryKey: ['chat-history', sessionId],
    queryFn: () => chatApi.history(sessionId),
    enabled: isOpen,
    staleTime: 30 * 1000,
  });

  useEffect(() => {
    if (historyQuery.data) {
      setMessages(historyQuery.data);
    }
  }, [historyQuery.data]);

  const startConversation = useCallback(async () => {
    if (!conversationId) {
      try {
        const conv = await chatApi.start(sessionId, user?.id);
        setConversationId(conv.id);
        return conv.id;
      } catch (err) {
        console.error('Error starting chat conversation', err);
        return null;
      }
    }
    return conversationId;
  }, [conversationId, sessionId, user?.id]);

  const sendMessageMutation = useMutation({
    mutationFn: async (text: string) => {
      const activeConvId = conversationId || (await startConversation());
      if (!activeConvId) throw new Error('No active conversation');

      const userMsg: ChatMessage = {
        id: 'temp_' + Date.now(),
        conversation_id: activeConvId,
        sender: 'user',
        message: text,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMsg]);

      const res = await chatApi.send({
        conversation_id: activeConvId,
        message: text,
        sender: 'user',
      });

      const botMsg: ChatMessage = {
        id: res.message_id || 'bot_' + Date.now(),
        conversation_id: activeConvId,
        sender: 'bot',
        message: res.bot_response,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMsg]);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-history', sessionId] });
    },
  });

  return {
    isOpen,
    toggleOpen,
    messages,
    sendMessage: sendMessageMutation.mutateAsync,
    isSending: sendMessageMutation.isPending,
    isLoading: historyQuery.isLoading,
  };
};
