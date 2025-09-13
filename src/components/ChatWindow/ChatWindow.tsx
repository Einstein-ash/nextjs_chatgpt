// 'use client';
// import styles from './ChatWindow.module.css';

// export default function ChatWindow({ messages }) {
//   return (
//     <main className={styles.window}>
//       <h1 className={styles.title}>What's on your mind today?</h1>
//       <div className={styles.messages}>
//         {messages.map((message) => (
//           <div key={message.id} className={styles.message}>
//             <span className={styles.role}>
//               {message.role === 'user' ? 'User: ' : 'AI: '}
//             </span>
//             {message.parts.map((part, i) =>
//               part.type === 'text' ? (
//                 <span key={i}>{part.text}</span>
//               ) : null
//             )}
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }















'use client';
import styles from './ChatWindow.module.css';
import ChatInput from '../ChatInput/ChatInput';
import LoadingDots from '../LoadingDots/LoadingDots.tsx';

export default function ChatWindow({
   messages ,
    input,
  setInput,
  sendMessage,
  fileInputRef,
  handleFileChange,
  attachments, 
  }) {
  // console.log("mesg", messages);

  return (
    <main className={styles.window}>
      <h1 className={styles.title}>What's on your mind today?</h1>
      <div className={styles.messages}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${
              message.role === 'user' ? styles.userMessage : styles.aiMessage
            }`}
          >
            <span className={styles.role}>
              {/* {message.role === 'user' ? 'User: ' : 'AI: '} */}
            </span>
            {message.parts.map((part, i) =>
              part.type === 'text' ? (
                <span key={i}>{part.text}</span>
              ) : null
            )}

          </div>
        ))}


      {messages.length > 0 && messages[messages.length - 1].role === 'user' ? (
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
                sendMessage={sendMessage}
                fileInputRef={fileInputRef}
                handleFileChange={handleFileChange}
                attachments={attachments}
              />
    </main>
  );
}

//---------- aboce is  working good ------------



//  -----belwo is jsut to cehk the loading of three dots --------------------











// ---------- below is ui is ok but the mesage not shwoigni g 



// 'use client';

// import React, { FC, useRef, useEffect } from 'react';
// // import { UserIcon, BotIcon } from './Icons';
// import LoadingDots from '../LoadingDots/LoadingDots.tsx';

// interface ChatPart {
//     type: 'text' | 'file';
//     text?: string;
//   url?: string;
//   name?: string;
//   mediaType?: string;
// }

// interface ChatMessage {
//     id: string | number;
//     role: 'user' | 'assistant';
//     content?: string; // For useChat compatibility
//     parts?: ChatPart[];
//   }
  
//   interface ChatWindowProps {
//       messages: ChatMessage[];
//       isWaitingForResponse: boolean;
//     }
    
//     const ChatWindow: FC<ChatWindowProps> = ({ messages, isWaitingForResponse }) => {
//         const messagesEndRef = useRef<HTMLDivElement>(null);
      
//         useEffect(() => {
//             messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//           }, [messages, isWaitingForResponse]);
        
//           return (
//               <div className="flex-1 overflow-y-auto p-4 md:p-6">
//                 <div className="max-w-4xl mx-auto">
//                   {messages.length === 0 ? (
//                       <div className="text-center mt-16">
//                         <h1 className="text-3xl font-bold text-gray-300">What's on your mind today?</h1>
//                         <p className="text-gray-500 mt-2">Start a conversation by typing below.</p>
//                       </div>
//                     ) : (
//                         messages.map((message) => (
//                             <div key={message.id} className={`flex items-start gap-4 my-6 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
//                               {message.role === 'assistant' && (
//                                   <div className="w-8 h-8 flex-shrink-0 bg-gray-600 rounded-full flex items-center justify-center">
//                                     {/* <BotIcon className="w-5 h-5 text-white"/> */}
//                                   </div>
//                                 )}
//                                 <div className={`max-w-lg p-4 rounded-xl shadow-md ${message.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-[#2a2f3b] text-gray-200 rounded-bl-none'}`}>
//                                   {/* Handle both old useChat format (content) and new format (parts) */}
//                                   {message.content ? (
//                                       <p className="whitespace-pre-wrap">{message.content}</p>
//                                     ) : (
//                                         message.parts?.map((part, i) =>
//                                           part.type === 'text' ? <p key={i} className="whitespace-pre-wrap">{part.text}</p> : null
//                   )
//                 )}
//               </div>
//               {message.role === 'user' && (
//                   <div className="w-8 h-8 flex-shrink-0 bg-gray-600 rounded-full flex items-center justify-center">
//                     {/* <UserIcon className="w-5 h-5 text-white"/> */}
//                   </div>
//                 )}
//               </div>
//             ))
//           )}
//           {isWaitingForResponse && (
//               <div className="flex items-start gap-4 my-6 justify-start">
//                 <div className="w-8 h-8 flex-shrink-0 bg-gray-600 rounded-full flex items-center justify-center">
//                   <BotIcon className="w-5 h-5 text-white"/>
//                 </div>
//                 <div className="max-w-lg p-4 rounded-xl shadow-md bg-[#2a2f3b] text-gray-200 rounded-bl-none">
//                   <LoadingDots />
//                 </div>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>
//         </div>
//       );
//     };
    
//     export default ChatWindow;
    
    
    
    
    // ---------- above  is ui is ok but the mesage not shwoigni g 

    // ------- belwo repair it test ------------
    























//     'use client';

// import React, { FC, useRef, useEffect } from 'react';
// // import { UserIcon, BotIcon } from './Icons';
// import LoadingDots from '../LoadingDots/LoadingDots';

// interface ChatPart {
//   type: 'text' | 'file';
//   text?: string;
//   url?: string;
//   name?: string;
//   mediaType?: string;
// }

// interface ChatMessage {
//   id: string | number;
//   role: 'user' | 'assistant';
//   content?: string;
//   parts?: ChatPart[];
// }

// interface ChatWindowProps {
//   messages: ChatMessage[];
// }

// const ChatWindow: FC<ChatWindowProps> = ({ messages }) => {
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="flex-1 overflow-y-auto p-4 md:p-6">
//       <div className="max-w-4xl mx-auto">
//         {messages.length === 0 ? (
//           <div className="text-center mt-16">
//             <h1 className="text-3xl font-bold text-gray-300">What's on your mind today?</h1>
//             <p className="text-gray-500 mt-2">Start a conversation by typing below.</p>
//           </div>
//         ) : (
//           <>
//             {messages.map((message) => (
//               <div key={message.id} className={`flex items-start gap-4 my-6 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
//                 {message.role === 'assistant' && (
//                   <div className="w-8 h-8 flex-shrink-0 bg-gray-600 rounded-full flex items-center justify-center">
//                     <BotIcon className="w-5 h-5 text-white"/>
//                   </div>
//                 )}
//                 <div className={`max-w-lg p-4 rounded-xl shadow-md ${message.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-[#2a2f3b] text-gray-200 rounded-bl-none'}`}>
//                   {message.content ? (
//                     <p className="whitespace-pre-wrap">{message.content}</p>
//                   ) : (
//                     message.parts?.map((part, i) =>
//                       part.type === 'text' ? <p key={i} className="whitespace-pre-wrap">{part.text}</p> : null
//                     )
//                   )}
//                 </div>
//                 {message.role === 'user' && (
//                   <div className="w-8 h-8 flex-shrink-0 bg-gray-600 rounded-full flex items-center justify-center">
//                     {/* <UserIcon className="w-5 h-5 text-white"/> */}
//                   </div>
//                 )}
//               </div>
//             ))}

//             {messages.length > 0 && messages[messages.length - 1].role === 'user' && (
//               <div className="flex items-start gap-4 my-6 justify-start">
//                 <div className="w-8 h-8 flex-shrink-0 bg-gray-600 rounded-full flex items-center justify-center">
//                   {/* <BotIcon className="w-5 h-5 text-white"/> */}
//                 </div>
//                 <div className="max-w-lg p-4 rounded-xl shadow-md bg-[#2a2f3b] text-gray-200 rounded-bl-none">
//                   <LoadingDots />
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//         <div ref={messagesEndRef} />
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;