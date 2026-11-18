export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'agent';
  text: string;
  timestamp: string;
  options?: string[];
}

export interface ChatSession {
  id: string;
  user_id?: string;
  messages: ChatMessage[];
  status: 'active' | 'closed';
}
