

// 'use client';
// import React, { useState, useRef, useCallback, ChangeEvent } from 'react';
// import { useChat } from '@ai-sdk/react';

// import Sidebar from '../components/Sidebar/Sidebar.tsx';
// import Header from '../components/Header/Header.tsx';
// import ChatWindow from '../components/ChatWindow/ChatWindow.tsx';
// import ChatInput from '../components/ChatInput/ChatInput.tsx';

// import '../styles/global.css';

// export default function Chat() {
//   interface Attachment {
//     name: string;
//     url: string;
//     contentType: string;
//   }

//   const [input, setInput] = useState('');
//   const { messages, sendMessage } = useChat();
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [uploadQueue, setUploadQueue] = useState<Array<string>>([]);
//   const [attachments, setAttachments] = useState<Attachment[]>([]);

//   const uploadFile = async (file: File) => {
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await fetch('/api/files/upload', {
//         method: 'POST',
//         body: formData,
//       });
//       if (response.ok) {
//         const data = await response.json();
//         const { url, pathname, contentType } = data;
//         return { url, name: pathname, contentType: contentType };
//       }
//       const { error } = await response.json();
//       alert('Upload error: ' + error);
//     } catch (error) {
//       alert('Upload failed! Please try again.');
//     }
//   };

//   const handleFileChange = useCallback(
//     async (event: ChangeEvent<HTMLInputElement>) => {
//       const files = Array.from(event.target.files || []);
//       setUploadQueue(files.map((file) => file.name));
//       try {
//         const uploadPromises = files.map((file) => uploadFile(file));
//         const uploadedAttachments = await Promise.all(uploadPromises);
//         const successfullyUploadedAttachments = uploadedAttachments.filter(
//           (attachment) => attachment !== undefined,
//         );
//         setAttachments((currentAttachments) => [
//           ...currentAttachments,
//           ...successfullyUploadedAttachments,
//         ]);
//       } catch (error) {
//         alert('Error uploading files!');
//       } finally {
//         setUploadQueue([]);
//       }
//     },
//     [],
//   );

//   return (
//     <div style={{ display: 'flex', minHeight: '100vh', background: '#23272f' }}>
//       <Sidebar />
//       <div style={{ flex: 1, marginLeft: 220 }}>
//         <Header />
//         <div style={{ marginTop: 56, marginBottom: 110, paddingLeft: 0 }}>
//           <ChatWindow messages={messages} />
//         </div>
//         <ChatInput
//           input={input}
//           setInput={setInput}
//           sendMessage={sendMessage}
//           fileInputRef={fileInputRef}
//           handleFileChange={handleFileChange}
//           attachments={attachments}
//         />
//       </div>
//     </div>
//   );
// }



















// ---------- aboce is working  good===========
//  below is just to test the  loading three dots  ( wsiting for ai reponse )




//  page.tsx

'use client';
import React, { useState, useRef, useCallback, ChangeEvent } from 'react';
import { useChat } from '@ai-sdk/react';

import Sidebar from '../components/Sidebar/Sidebar.tsx';
import Header from '../components/Header/Header.tsx';
import ChatWindow from '../components/ChatWindow/ChatWindow.tsx';
import ChatInput from '../components/ChatInput/ChatInput.tsx';
import LoadingDots from '../components/LoadingDots/LoadingDots.tsx/index.js';


import '../styles/global.css';


export default function Chat() {
  interface Attachment {
    name: string;
    url: string;
    contentType: string;
  }

  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadQueue, setUploadQueue] = useState<Array<string>>([]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
    const [isSidebarOpen, setSidebarOpen] = useState(true);


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

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'rgb(33, 33, 33)' }}>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div style={{ flex: 1, marginLeft: 0}}>
        {/* <Header /> */}
        <div style={{ marginTop: 0 ,paddingLeft: 0 }}>
          <ChatWindow
           messages={messages} 
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
          attachments={attachments}
           />
        </div>
        {/* <ChatInput
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
          attachments={attachments}
        /> */}
      </div>
    </div>
  );
}




























