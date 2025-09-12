// 'use client';

// import { useChat } from '@ai-sdk/react';
// import React, { useState,
//    useRef ,useCallback ,
//      type ChangeEvent,


// } from 'react';

// export default function Chat() {

//   interface Attachment {
//   name: string;
//   url: string;
//   contentType: string;
// }

//   const [input, setInput] = useState('');
//   const { messages, sendMessage } = useChat();
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [uploadQueue, setUploadQueue] = useState<Array<string>>([]);
//   const [attachments, setAttachments] = useState<Attachment[]>([]);

//     const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setInput(event.target.value);
//   };

//   const imageUrl = './test.jpg';



//   const uploadFile = async (file: File) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     // console.log(file);

//     try {
//       const response = await fetch('/api/files/upload', {
//         method: 'POST',
//         body: formData,
 
//       });


//       console.log("before res.ok");

//       if (response.ok) {
//         const data = await response.json();
//         const { url, pathname, contentType } = data;

//         return {
//           url,
//           name: pathname,
//           contentType: contentType,
//         };
//       }

//       const { error } = await response.json();
//       console.log("try errorr from upload file ", error);
//       // toast.error(error);
//       //  alert(' from try - Failed to upload file, please try again!')
//     } catch (error) {
//       alert('from catch = Failed to upload file, please try again!')
//       // toast.error('Failed to upload file, please try again!');
//     }
//   };




//     const handleFileChange = useCallback(
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
//         console.error('Error uploading files!', error);
//       } finally {
//         setUploadQueue([]);
//       }
//     },
//     [setAttachments],
//   );



//   return (
//     <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
//       {messages.map(message => (
//         <div key={message.id} className="whitespace-pre-wrap">
//           {message.role === 'user' ? 'User: ' : 'AI: '}
//           {message.parts.map((part, i) => {
//             switch (part.type) {
//               case 'text':
//                 return <div key={`${message.id}-${i}`}>{part.text}</div>;
//             }
//           })}
//         </div>
//       ))}

//       <form


//         onSubmit={async (e) => {
//           e.preventDefault();
//           // sendMessage({ text: input });

//     sendMessage({
//       role: 'user',
//       parts: [
//         ...attachments.map((attachment) => ({
//           type: 'file' as const,
//           url: attachment.url,
//           name: attachment.name,
//           mediaType: attachment.contentType,
//         })),
//         {
//           type: 'text',
//           text: input,
//         },
//       ],
//     });


//           setInput('');
//         }}
//       >

//         <input
//         className = "fixed dark:bg-zinc-900 bottom-20 w-60 max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
//         type="file"
//         ref={fileInputRef}
//         multiple
//         onChange={handleFileChange}
//         tabIndex={-1}
//       />


//         <input
//           className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
//           value={input}
//           placeholder="Say something..."
//           onChange={e => setInput(e.currentTarget.value)}
//         />

//       </form>
//     </div>
//   );
// }










































'use client';
import React, { useState, useRef, useCallback, ChangeEvent } from 'react';
import { useChat } from '@ai-sdk/react';

import Sidebar from '../components/Sidebar/Sidebar.tsx';
import Header from '../components/Header/Header.tsx';
import ChatWindow from '../components/ChatWindow/ChatWindow.tsx';
import ChatInput from '../components/ChatInput/ChatInput.tsx';

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
      } catch (error) {
        alert('Error uploading files!');
      } finally {
        setUploadQueue([]);
      }
    },
    [],
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#23272f' }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: 220 }}>
        <Header />
        <div style={{ marginTop: 56, marginBottom: 110, paddingLeft: 0 }}>
          <ChatWindow messages={messages} />
        </div>
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
  );
}
