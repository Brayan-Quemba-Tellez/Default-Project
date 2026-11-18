import { apiClient } from './client';

export interface ChatConversation {
  id: string;
  session_id: string;
  user_id?: string;
  status: string;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender: string;
  message: string;
  created_at: string;
}

export interface SendMessageData {
  conversation_id: string;
  message: string;
  sender?: string;
}

export const chatApi = {
  start: (session_id: string, user_id?: string) =>
    apiClient.post<ChatConversation>('/api/v1/chat/start', { session_id, user_id }).then(r => r.data),

  send: (data: SendMessageData) =>
    apiClient.post<{ bot_response: string; message_id: string }>('/api/v1/chat/message', data).then(r => r.data),

  history: (session_id: string) =>
    apiClient.get<ChatMessage[]>(`/api/v1/chat/history/${session_id}`).then(r => r.data),
};
