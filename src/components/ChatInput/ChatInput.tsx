// 'use client';
// import styles from './ChatInput.module.css';
// import React from 'react';

// export default function ChatInput({
//   input,
//   setInput,
//   sendMessage,
//   fileInputRef,
//   handleFileChange,
//   attachments
// }) {
//   return (
//     <form
//       className={styles.form}
//       onSubmit={async (e) => {
//         e.preventDefault();
//         sendMessage({
//           role: 'user',
//           parts: [
//             ...attachments.map((attachment) => ({
//               type: 'file',
//               url: attachment.url,
//               name: attachment.name,
//               mediaType: attachment.contentType,
//             })),
//             {
//               type: 'text',
//               text: input,
//             },
//           ],
//         });
//         setInput('');
//       }}
//     >
//       <input
//         className={styles.file}
//         type="file"
//         ref={fileInputRef}
//         multiple
//         onChange={handleFileChange}
//         tabIndex={-1}
//       />
//       <div className={styles.inputBar}>
//         <span className={styles.plus}>+</span>
//         <input
//           className={styles.input}
//           value={input}
//           placeholder="Ask anything"
//           onChange={(e) => setInput(e.currentTarget.value)}
//         />
//         <button type="submit" className={styles.mic}>
//           <span role="img" aria-label="Send">🎤</span>
//         </button>
//       </div>
//     </form>
//   );
// }

















// -----------below is working  very great =============

import React, { useState } from "react";
import styles from "./ChatInput.module.css";



interface Attachment {
  url: string;
  name: string;
  contentType: string;
}

interface ChatMessage {
  role: string;
  parts: Array<{
    type: string;
    text?: string;
    url?: string;
    name?: string;
    mediaType?: string;
  }>;
}

interface MemoryResult {
  memory: string;
  score?: number;
  id?: string;
  metadata?: Record<string, any>;
}

interface SearchResponse {
  success: boolean;
  results: MemoryResult[];
  total: number;
}

interface AddResponse {
  success: boolean;
  result: any;
  message: string;
}

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  sendMessage: (message: ChatMessage) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => Promise<boolean>;
  attachments: Attachment[];
}


export default function ChatInput({
  input,
  setInput,
  sendMessage,
  fileInputRef,
  handleFileChange,
  attachments,
}) {
  // Add this function to trigger file dialog
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [uploadingStatus, setUploadingStatus] = useState<boolean>(false);
  const [localUploadedFiles, setLocalUploadedFiles] = useState<File[]>([]);

  const USER_ID = "customer-001"; // Should be unique per user



  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setLocalUploadedFiles(files);

    setUploadingStatus(true);

    const result = await handleFileChange(e);

    setUploadingStatus(false);

    if (!result) {
      alert("File upload failed.");
    }
  };


  const addMemory = async (memory: { role: string; content: string }) => {
    try {
      const response = await fetch("/api/memory/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: USER_ID,
          memory,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: AddResponse = await response.json();
      return result.success;
    } catch (error) {
      console.error("Failed to add memory:", error);
      return false;
    }
  };

  // Search memories from Mem0
  const searchMemories = async (query: string, limit: number = 5): Promise<string> => {
    try {
      const response = await fetch("/api/memory/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          userId: USER_ID, 
          query, 
          limit 
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: SearchResponse = await response.json();
      
      if (data.success && Array.isArray(data.results)) {
        return data.results
          .map((m: MemoryResult) => m.memory)
          .filter(Boolean)
          .join("\n");
      }
      
      return "";
    } catch (error) {
      console.error("Failed to search memories:", error);
      return "";
    }
  };


  // const handleSend = async (e) => {
  //   e.preventDefault();

  //   await fetch("/api/memory/add", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       userId: USER_ID,
  //       memory: { role: "user", content: input },
  //     }),
  //   });

  //   // Search memories
  //   const response = await fetch("/api/memory/search", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ userId: USER_ID , query : input}),
  //   });

  //   const memories = await response.json();
  //   const contextText = memories.map((m) => m.content).join("\n");

  //   setLocalUploadedFiles([]);

  //   sendMessage({
  //     role: "user",
  //     parts: [
  //       ...attachments.map((attachment) => ({
  //         type: "file",
  //         url: attachment.url,
  //         name: attachment.name,
  //         mediaType: attachment.contentType,
  //       })),
  //       {
  //         type: "text",
  //         text:  contextText + '\n' + input,
  //         // text: input,
  //       },
  //     ],
  //   });
  //   setInput("");
  // };



  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() ) return;
    
    // setIsSubmitting(true);

    try {
      const addSuccess = await addMemory({ 
        role: "user", 
        content: input.trim() 
      });

      if (!addSuccess) {
        console.warn("Failed to add memory, but continuing...");
      }

      const contextText = await searchMemories(input.trim());

      const finalText = contextText 
        ? `${contextText}\n\n${input.trim()}`
        : input.trim();

 
      setLocalUploadedFiles([]);


      sendMessage({
        role: "user",
        parts: [
          ...attachments.map((attachment) => ({
            type: "file",
            url: attachment.url,
            name: attachment.name,
            mediaType: attachment.contentType,
          })),

          {
            type: "text",
            // text: input,
            text: finalText,
          },
        ],
      });


      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      // setIsSubmitting(false);
    }
  };









  return (
    <form className={styles.form} onSubmit={handleSend}>
      {uploadingStatus ? "Loading..." : ""}

      {uploadingStatus && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
        </div>
      )}

      <div className={styles.imageGrid}>
        {localUploadedFiles.map((file, idx) => {
          const imageURL = URL.createObjectURL(file);
          return (
            <div
              key={idx}
              className={
                uploadingStatus ? styles.imageWrapperBlur : styles.imageWrapper
              }
            >
              <img className="imgss" src={imageURL} alt={`upload-${idx}`} />
            </div>
          );
        })}
      </div>

      <input
        className={styles.file}
        type="file"
        ref={fileInputRef}
        multiple
        onChange={handleFileUpload}
        tabIndex={-1}
      />
      <div className={styles.inputBar}>
        {/* Make "+" icon call triggerFileInput() */}
        <span
          className={styles.plus}
          onClick={triggerFileInput}
          style={{ cursor: "pointer" }}
          title="Upload file"
        >
          +
        </span>
        <input
          className={styles.input}
          value={input}
          placeholder="Ask anything"
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        <button type="submit" className={styles.mic}>
          <span role="img" aria-label="Send">
            🎤
          </span>
        </button>
      </div>
    </form>
  );
}



// -------------above is working bery very great ---------------
// bewpw os test for memo to work 


// import React, { useState, ChangeEvent } from "react";
// import styles from "./ChatInput.module.css";

// interface Attachment {
//   url: string;
//   name: string;
//   contentType: string;
// }

// interface ChatMessage {
//   role: string;
//   parts: Array<{
//     type: string;
//     text?: string;
//     url?: string;
//     name?: string;
//     mediaType?: string;
//   }>;
// }

// interface MemoryResult {
//   memory: string;
//   score?: number;
//   id?: string;
//   metadata?: Record<string, any>;
// }

// interface SearchResponse {
//   success: boolean;
//   results: MemoryResult[];
//   total: number;
// }

// interface AddResponse {
//   success: boolean;
//   result: any;
//   message: string;
// }

// interface ChatInputProps {
//   input: string;
//   setInput: (input: string) => void;
//   sendMessage: (message: ChatMessage) => void;
//   fileInputRef: React.RefObject<HTMLInputElement>;
//   handleFileChange: (e: ChangeEvent<HTMLInputElement>) => Promise<boolean>;
//   attachments: Attachment[];
// }

// export default function ChatInput({
//   input,
//   setInput,
//   sendMessage,
//   fileInputRef,
//   handleFileChange,
//   attachments,
// }: ChatInputProps) {
//   const [uploadingStatus, setUploadingStatus] = useState<boolean>(false);
//   const [localUploadedFiles, setLocalUploadedFiles] = useState<File[]>([]);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

//   const USER_ID = "customer-001"; // Should be unique per user

//   // Trigger file dialog
//   const triggerFileInput = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   // Handle file upload
//   const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     setLocalUploadedFiles(files);
//     setUploadingStatus(true);

//     try {
//       const result = await handleFileChange(e);
//       if (!result) {
//         alert("File upload failed.");
//       }
//     } catch (error) {
//       console.error("File upload error:", error);
//       alert("File upload failed.");
//     } finally {
//       setUploadingStatus(false);
//     }
//   };

//   // Add memory to Mem0
//   const addMemory = async (memory: { role: string; content: string }) => {
//     try {
//       const response = await fetch("/api/memory/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: USER_ID,
//           memory,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result: AddResponse = await response.json();
//       return result.success;
//     } catch (error) {
//       console.error("Failed to add memory:", error);
//       return false;
//     }
//   };

//   // Search memories from Mem0
//   const searchMemories = async (query: string, limit: number = 5): Promise<string> => {
//     try {
//       const response = await fetch("/api/memory/search", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ 
//           userId: USER_ID, 
//           query, 
//           limit 
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data: SearchResponse = await response.json();
      
//       if (data.success && Array.isArray(data.results)) {
//         return data.results
//           .map((m: MemoryResult) => m.memory)
//           .filter(Boolean)
//           .join("\n");
//       }
      
//       return "";
//     } catch (error) {
//       console.error("Failed to search memories:", error);
//       return "";
//     }
//   };

//   // Handle message send
//   const handleSend = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!input.trim() || isSubmitting) return;
    
//     setIsSubmitting(true);

//     try {
//       // 1. Add current user message to memory
//       const addSuccess = await addMemory({ 
//         role: "user", 
//         content: input.trim() 
//       });

//       if (!addSuccess) {
//         console.warn("Failed to add memory, but continuing...");
//       }

//       // 2. Search for relevant memories
//       const contextText = await searchMemories(input.trim());

//       // 3. Prepare the final message text
//       const finalText = contextText 
//         ? `${contextText}\n\n${input.trim()}`
//         : input.trim();

//       // 4. Clear local state
//       setLocalUploadedFiles([]);

//       // 5. Send message with context and attachments
//       sendMessage({
//         role: "user",
//         parts: [
//           // Add file attachments
//           ...attachments.map((attachment) => ({
//             type: "file",
//             url: attachment.url,
//             name: attachment.name,
//             mediaType: attachment.contentType,
//           })),
//           // Add text with context
//           {
//             type: "text",
//             text: finalText,
//           },
//         ],
//       });

//       // 6. Clear input
//       setInput("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//       alert("Failed to send message. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <form onSubmit={handleSend} className={styles.form}>
//         <div className={styles.inputContainer}>
//           {/* File input (hidden) */}
//           <input
//             ref={fileInputRef}
//             type="file"
//             onChange={handleFileUpload}
//             style={{ display: "none" }}
//             multiple
//             accept="image/*,application/pdf,.doc,.docx,.txt"
//           />
          
//           {/* Attach button */}
//           <button
//             type="button"
//             onClick={triggerFileInput}
//             className={styles.attachButton}
//             disabled={uploadingStatus}
//             title="Attach files"
//           >
//             {uploadingStatus ? "📤" : "📎"}
//           </button>
          
//           {/* Text input */}
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Type your message..."
//             className={styles.textInput}
//             disabled={isSubmitting || uploadingStatus}
//           />
          
//           {/* Send button */}
//           <button
//             type="submit"
//             className={styles.sendButton}
//             disabled={!input.trim() || isSubmitting || uploadingStatus}
//             title="Send message"
//           >
//             {isSubmitting ? "⏳" : "➤"}
//           </button>
//         </div>
        
//         {/* File upload status */}
//         {localUploadedFiles.length > 0 && (
//           <div className={styles.uploadStatus}>
//             <p>Files: {localUploadedFiles.map(f => f.name).join(", ")}</p>
//             {uploadingStatus && <p>Uploading...</p>}
//           </div>
//         )}
        
//         {/* Attachments preview */}
//         {attachments.length > 0 && (
//           <div className={styles.attachments}>
//             {attachments.map((attachment, index) => (
//               <div key={index} className={styles.attachment}>
//                 <span>{attachment.name}</span>
//               </div>
//             ))}
//           </div>
//         )}
//       </form>
//     </div>
//   );
// }
