import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { UIMessage, UseChatHelpers } from '@ai-sdk/react'; 
import { UIDataTypes, UITools } from 'ai';

export interface Attachment {
  url: string;
  name: string;
  contentType: string;
}

export interface ChatMessage {
  id : number;
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
  sendMessage: (message: any) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null > ;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => Promise<boolean>;
  attachments: Attachment[];
}



export interface ChatMessage2 {
  id:number;
  role: string;
  parts: Array<{
    type: string;
    text?: string;
    url?: string;
    name?: string;
    mediaType?: string;
  }>;
}

export interface ChatWindowProps {
  messages: any;
  input: string;
  setInput: (input: string) => void;
  sendMessage: (message:  any ) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null >  ;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => Promise<boolean>;
  attachments: Attachment[];
  // setMessages: (messages: ChatMessage2[]) => void;
  setMessages: Dispatch<SetStateAction<UIMessage<unknown, UIDataTypes, UITools>[]>>;
}

export interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  setMessages: Dispatch<SetStateAction<UIMessage<unknown, UIDataTypes, UITools>[]>>;
}