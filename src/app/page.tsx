
'use client';
import React, { useState, useRef, useCallback, ChangeEvent } from 'react';
import { useChat } from '@ai-sdk/react';

import Sidebar from '../components/Sidebar/Sidebar';;
import ChatWindow from '../components/ChatWindow/ChatWindow';
import Header from '../components/Header/Header';
import { FaBars , FaTimes } from 'react-icons/fa'; 

import '../styles/global.css';
import ChatInput from '@/components/ChatInput/ChatInput';


export default function Chat() {
  interface Attachment {
    name: string;
    url: string;
    contentType: string;
  }

  const [input, setInput] = useState('');
  const { messages, sendMessage , setMessages} = useChat();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadQueue, setUploadQueue] = useState<Array<string>>([]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
    const [isSidebarOpen, setSidebarOpen] = useState(false);


  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        const { url, pathname, contentType } = data;
        return { url, name: pathname, contentType: contentType };
      }
      const { error } = await response.json();
      alert('Upload error: ' + error);
    } catch (error) {
      alert('Upload failed! Please try again.');
    }
  };

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);
      setUploadQueue(files.map((file) => file.name));
      try {
        const uploadPromises = files.map((file) => uploadFile(file));
        const uploadedAttachments = await Promise.all(uploadPromises);
        const successfullyUploadedAttachments = uploadedAttachments.filter(
          (attachment) => attachment !== undefined,
        );
        setAttachments((currentAttachments) => [
          ...currentAttachments,
          ...successfullyUploadedAttachments,
        ]);

        return true;
      } catch (error) {
        alert('Error uploading files!');
        return false;
      } finally {
        setUploadQueue([]);
      }
    },
    [],
  );

    const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const headerTitle = messages.length === 0 ? " " : "";
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'rgb(33, 33, 33)' }}>
     <button
        onClick={toggleSidebar}
        className={`
          fixed top-4 left-4 z-50 p-2 rounded-lg text-white
          hover:bg-gray-600 md:hidden
          
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-64' : 'translate-x-0'}
        `}
        aria-label="Toggle sidebar"
      >
        {/* Change icon based on the sidebar's state */}
        {!isSidebarOpen && <FaBars />}
      </button>

      <Sidebar 
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar} 
          setMessages = {setMessages}
      />
      <div style={{ flex: 1, marginLeft: 0}}>
        {/* <Header /> */}
        <div style={{ marginTop: 0 ,paddingLeft: 0 }}>
          <Header title={headerTitle} />
          <ChatWindow
          messages={messages} 
          setMessages = {setMessages}
          input={input}
          sendMessage={sendMessage}
          setInput={setInput}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
          attachments={attachments}
           />

                 <ChatInput
                           input={input}
                           setInput={setInput}
                           sendMessage={sendMessage}
                           fileInputRef={fileInputRef}
                           handleFileChange={handleFileChange}
                           attachments={attachments}
                 />
        </div>

      </div>
    </div>
  );
}




























