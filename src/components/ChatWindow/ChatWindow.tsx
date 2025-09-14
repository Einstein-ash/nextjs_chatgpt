'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './ChatWindow.module.css';
import ChatInput from '../ChatInput/ChatInput';
import LoadingDots from '../LoadingDots/LoadingDots';
import { FaPencilAlt } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { ChatMessage2, ChatWindowProps } from '@/models/chat.model';


export default function ChatWindow({
  messages ,
  input,
  setInput,
  sendMessage,
  fileInputRef,
  handleFileChange,
  attachments, 
  setMessages
  }: Readonly<ChatWindowProps>) {


  const [editMessageId, setEditMessageId] = useState<string >("");
  const [newEditMessageText, setNewEditMessageText] = useState<string>("");
  
    
  const handleMessageInputEdit = (id:string, original_message : string) =>{

    setEditMessageId(id);
    setNewEditMessageText(original_message);


  }

  const handleMessageEdit = (id : string)=>{
    console.log("id->",id)
  
    // setMessages(my_messages.filter(message => message.id !== id));
    setMessages((messages  ) => {
      const index = messages.findIndex((message) => message.id === id);
      if (index === -1) return messages; 
      return messages.slice(0, index);
    });

      setEditMessageId("");

       sendMessage({
         role: "user",
         parts: [
           {
             type: "text",
             text: newEditMessageText,
           },
         ],
         id: 0
       });

    console.log(messages);

  }


const messagesEndRef = useRef<HTMLDivElement>(null);

// Add the auto-scroll effect
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  console.log(messages);
}, [messages]);



  return (
    <main className={styles.window}>

        <div className="flex h-full flex-col overflow-hidden">
    
    {/* 1. Wrap your message list in this scrolling div */}
<div className="flex-1 overflow-y-auto px-6 pt-1 pb-10">
      <h1 className={styles.title}>What &apos; s on your mind today?</h1>


      <div className={styles.messages}>
        {messages.map((message: { id: number; role: string; parts: any[]; }) => (
          
          <>
          
          <div
            key={message.id }
            className={`${styles.message} ${
              message.role === 'user' ? styles.userMessage : styles.aiMessage
            }`}
            >
              
          {message.id == parseInt(editMessageId) ? (
            <div>
              <textarea
                value={newEditMessageText}
                onChange={(e) => setNewEditMessageText(e.target.value)}
              />
            </div>
          ) : (
            message.parts.map((part, i) =>
              part.type === 'text' ? (
                <span key={i}>{part.text}</span>
              ) : null
            )
          )}

          </div>

           <div className={styles.userMessageEditBtn}>
              {message.role === 'user' &&
               (parseInt(editMessageId)  === message.id ? (
                 <button onClick={() => handleMessageEdit((message.id).toString())}>   <FiSend /></button>
               )
               :(
                <div>
                  <button onClick={() => handleMessageInputEdit((message.id).toString() , message.parts[0].text ?? '')}> <FaPencilAlt /></button>
                </div>
               ))
            }
            </div>
          
            </>
        ))}


      {messages.length > 0 && messages[messages.length - 1].role === 'user' ? (
        <div className={styles.message}>
          <span className={styles.role}> </span>
          <LoadingDots />
        </div>
      ) : (
        ''
      )}


      <div ref={messagesEndRef} />

          </div >
        </div>
      </div>

      {/* <ChatInput
                input={input}
                setInput={setInput}
                sendMessage={sendMessage}
                fileInputRef={fileInputRef}
                handleFileChange={handleFileChange}
                attachments={attachments}
      /> */}
    </main>
  );
}