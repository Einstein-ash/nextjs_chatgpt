import { ChangeEvent } from "react";

export interface Attachment {
  url: string;
  name: string;
  contentType: string;
}

export interface ChatMessage {
  role: string;
  parts: Array<{
    type: string;
    text?: string;
    url?: string;
    name?: string;
    mediaType?: string;
  }>;
}

export interface MemoryResult {
  memory: string;
  score?: number;
  id?: string;
  metadata?: Record<string, any>;
}

export interface SearchResponse {
  success: boolean;
  results: MemoryResult[];
  total: number;
}

export interface AddResponse {
  success: boolean;
  result: any;
  message: string;
}

export interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  sendMessage: (message: ChatMessage) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => Promise<boolean>;
  attachments: Attachment[];
}



export interface ChatMessage2 {
  id: number; 
  role: string;
  parts: Array<{
    type: string;
    text: string;
    url?: string;
    name?: string;
    mediaType?: string;
  }>;
}

export interface ChatWindowProps {
  my_messages: ChatMessage2[];
  input: string;
  setInput: (input: string) => void;
  my_sendMessage: (message: ChatMessage2) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => Promise<boolean>;
  attachments: Attachment[];
  setMessages: (messages: ChatMessage2[]) => void;
}

