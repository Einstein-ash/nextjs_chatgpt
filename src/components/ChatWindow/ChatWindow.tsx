'use client';

import { useState } from 'react';
import styles from './ChatWindow.module.css';
import ChatInput from '../ChatInput/ChatInput';
import LoadingDots from '../LoadingDots/LoadingDots';
import { FaPencilAlt } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { ChatMessage2, ChatWindowProps } from '@/models/chat.model';

export default function ChatWindow({
  my_messages ,
  input,
  setInput,
  my_sendMessage,
  fileInputRef,
  handleFileChange,
  attachments, 
  setMessages
  }: Readonly<ChatWindowProps>) {


  const [editMessageId, setEditMessageId] = useState<number | null >(null);
  const [newEditMessageText, setNewEditMessageText] = useState<string>("");
  
    
  const handleMessageInputEdit = (id:number, original_message : string) =>{

    setEditMessageId(id);
    setNewEditMessageText(original_message);


  }

  const handleMessageEdit = (id : number)=>{
    console.log("id->",id)
  
    // setMessages(my_messages.filter(message => message.id !== id));
    setMessages((my_messages : ChatMessage2[] ) => {
      const index = my_messages.findIndex((message) => message.id === id);
      if (index === -1) return my_messages; 
      return my_messages.slice(0, index);
    });

      setEditMessageId(null);

       my_sendMessage({
        role: "user",
        parts: [
          {
            type: "text",
            text: newEditMessageText,
          },
        ],
      });

    console.log(my_messages);

  }



  return (
    <main className={styles.window}>
      <h1 className={styles.title}>What's on your mind today?</h1>
      <div className={styles.messages}>
        {my_messages.map((message) => (
          
          <>
          
          <div
            key={message.id }
            className={`${styles.message} ${
              message.role === 'user' ? styles.userMessage : styles.aiMessage
            }`}
            >
              
          {message.id == editMessageId ? (
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
               (editMessageId === message.id ? (
                 <button onClick={() => handleMessageEdit(message.id)}>   <FiSend /></button>
               )
               :(
                <div>
                  <button onClick={() => handleMessageInputEdit(message.id , message.parts[0].text)}> <FaPencilAlt /></button>
                </div>
               ))
            }
            </div>
          
            </>
        ))}


      {my_messages.length > 0 && my_messages[my_messages.length - 1].role === 'user' ? (
        <div className={styles.message}>
          <span className={styles.role}> </span>
          <LoadingDots />
        </div>
      ) : (
        ''
      )}



      </div>

      <ChatInput
                input={input}
                setInput={setInput}
                sendMessage={my_sendMessage}
                fileInputRef={fileInputRef}
                handleFileChange={handleFileChange}
                attachments={attachments}
      />
    </main>
  );
}