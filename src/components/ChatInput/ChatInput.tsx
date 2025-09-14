

import { ChatInputProps, AddResponse, SearchResponse, MemoryResult } from "@/models/chat.model";
import React, { ChangeEvent, useState } from "react";
// import styles from "./ChatInput.module.css";
import { FiSend } from 'react-icons/fi';

const styles = `
.chat-input__container {
  position: fixed;
  bottom: 0;
  width: calc(100vw - 260px);
  padding: 12px 24px;
  // background: #000;
  display: flex;
  justify-content: center;
  z-index: 20;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}
  
  .chat-input__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px; /* Space between grid and input bar */
    width: 600px;
  }

  /* --- Image Grid Styles --- */
  .chat-input__image-grid {
    display: flex;
    gap: 10px;
    width: 100%;
    overflow-x: auto;
    padding-bottom: 5px; /* Add some space for scrollbar if it appears */
    scrollbar-width: none; /* For Firefox */
  }

  .chat-input__image-grid::-webkit-scrollbar {
    display: none; /* For Chrome, Safari, and Opera */
  }

  .chat-input__image-wrapper {
    position: relative;
    width: 70px;
    height: 70px;
    flex-shrink: 0;
    border-radius: 8px;
    overflow: hidden;
    background-color: #333;
  }

  .chat-input__preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.3s ease-in-out;
  }

  .chat-input__preview-image--blur {
    filter: blur(4px);
  }

  /* --- Spinner Overlay Styles --- */
  .chat-input__spinner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .chat-input__spinner {
    border: 4px solid rgba(255, 255, 255, 0.2);
    border-left-color: #fff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: chat-input-spin 1s linear infinite;
  }

  @keyframes chat-input-spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* --- Input Bar Styles (Your Theme) --- */
  .chat-input__input-bar {
    display: flex;
    align-items: center;
    background: rgb(48, 48, 48);
    border-radius: 22px;
    box-shadow: 0 4px 24px #20202a80;
    border: 1px solid #444;
    width: 100%;
    padding: 2px 10px 2px 18px;
  }

  .chat-input__text-input {
    background: transparent;
    border: none;
    outline: none;
    font-size: 1.05rem;
    color: #fff;
    flex: 1;
    padding: 11px 16px;
  }

  .chat-input__plus-button {
    color: #a3a3a3;
    font-size: 1.5rem;
    font-weight: bold;
    margin-right: 9px;
    cursor: pointer;
  }
  

.chat-input__send-button {
  width: 36px;
  height: 36px;
  padding: 0;
  
  /* Appearance */
  background-color: white;
  border: none;
  border-radius: 50%; 
  

  display: flex;
  align-items: center;
  justify-content: center;
  
 
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  flex-shrink: 0;
}


.chat-input__send-button svg {
  color: #1d1d1f; 
}


.chat-input__send-button:hover {
  background-color: #f5f5f7;
}


.chat-input__send-button:active {
  transform: scale(0.92);
}


.chat-input__send-button:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}

.chat-input__send-button:disabled svg {
  color: #888; 
}
`;



export default function ChatInput({
  input,
  setInput,
  sendMessage,
  fileInputRef,
  handleFileChange,
  attachments,
}: Readonly<ChatInputProps>) {
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [uploadingStatus, setUploadingStatus] = useState<boolean>(false);
  const [localUploadedFiles, setLocalUploadedFiles] = useState<File[]>([]);

  const USER_ID = "customer-001"; 



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


  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() ) return;
    
    // setIsSubmitting(true);

    try {
      // const addSuccess = await addMemory({ 
      //   role: "user", 
      //   content: input.trim() 
      // });

      // if (!addSuccess) {
      //   console.warn("Failed to add memory, but continuing...");
      // }

      // const contextText = await searchMemories(input.trim());

      // const finalText = contextText 
      //   ? `${contextText}\n\n${input.trim()}`
      //   : input.trim();

 
      setLocalUploadedFiles([]);


      sendMessage({
        role: "user",
        parts: [
          ...attachments.map((attachment) => ({
             text: "",
            type: "file",
            url: attachment.url,
            name: attachment.name,
            mediaType: attachment.contentType,
          })),

          {
            type: "text",
            text: input,
            // text: finalText,
          },
        ],
        id: 0
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
    <>
      <style>{styles}</style>
      <div className="chat-input__container">
        <form className="chat-input__form" onSubmit={handleSend}>


          {localUploadedFiles.length > 0 && (
            <div className="chat-input__image-grid">
              {localUploadedFiles.map((file, idx) => {
                const imageURL = URL.createObjectURL(file);
                return (
                  <div key={idx} className="chat-input__image-wrapper">
                    <img
                      className={`chat-input__preview-image ${
                        uploadingStatus ? "chat-input__preview-image--blur" : ""
                      }`}
                      src={imageURL}
                      alt={`upload-preview-${idx}`}
                      onLoad={() => URL.revokeObjectURL(imageURL)}
                      />
                    {uploadingStatus && (
                      <div className="chat-input__spinner-overlay">
                        <div className="chat-input__spinner"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          
          <div className="chat-input__input-bar">
            <button
              className="chat-input__plus-button"
              onClick={triggerFileInput}
              title="Upload file" 
               type="button"
              >
              +
            </button>
            <input
              className="chat-input__text-input"
              value={input}
              placeholder="Ask anything"
              onChange={(e) => setInput(e.currentTarget.value)}
              />
            <button 
              type="submit" 
              className="chat-input__send-button"
              disabled={(!input.trim() && attachments.length === 0) || uploadingStatus}
            >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
            </button>
          </div>

         
        </form>
         <input
                style={{ display: "none" }}
                type="file"
                ref={fileInputRef}
                multiple
                onChange={handleFileUpload}
                accept="image/*,video/*,application/pdf"
            />
      </div>
    </>
  );




}


// abovce reutnr is working good, 
// -------- below is just to test the uplaodn image grid