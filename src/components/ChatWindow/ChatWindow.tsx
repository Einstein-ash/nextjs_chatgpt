"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./ChatWindow.module.css";
import LoadingDots from "../LoadingDots/LoadingDots";

import { FaPencilAlt, FaRegCopy } from "react-icons/fa"; // Add FaRegCopy
import { FiSend } from "react-icons/fi";
import { ChatWindowProps } from "@/models/chat.model";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const MarkdownComponents: Components = {
  code({ node, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return match ? (
      <SyntaxHighlighter
        style={vscDarkPlus as any}
        language={match[1]}
        PreTag="div"
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

export default function ChatWindow({
  messages,
  input,
  setInput,
  sendMessage,
  fileInputRef,
  handleFileChange,
  attachments,
  setMessages,
}: Readonly<ChatWindowProps>) {
  const [editMessageId, setEditMessageId] = useState<string>("");
  const [newEditMessageText, setNewEditMessageText] = useState<string>("");

  const handleMessageInputEdit = (id: string, original_message: string) => {
    setEditMessageId(id);
    setNewEditMessageText(original_message);
  };

  const handleMessageEdit = (id: string) => {
    setMessages((messages) => {
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
    });
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  return (
    <main className={styles.window}>
      <div className="flex h-full flex-col overflow-hidden">
        <div
          className={`flex-1 overflow-y-auto px-6 pt-1 pb-10 ${styles.scrollableArea}`}
        >
          <h1 className={styles.title}>What &apos; s on your mind today?</h1>

          <div className={styles.messages}>
            {messages.map(
              (message: { id: string; role: string; parts: any[] }) => (
                <>
                  <div
                    key={message.id}
                    className={`${styles.message} ${
                      message.role === "user"
                        ? styles.userMessage
                        : styles.aiMessage
                    }`}
                  >
                    {message.id === editMessageId ? (
                      <div>
                        <textarea
                          value={newEditMessageText}
                          onChange={(e) =>
                            setNewEditMessageText(e.target.value)
                          }
                        />
                      </div>
                    ) : (
                      message.parts.map((part, i) =>
                        part.type === "text" ? (
                          <div
                            key={i}
                            className="prose max-w-none text-inherit prose-p:my-0"
                          >
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={MarkdownComponents}
                            >
                              {part.text}
                            </ReactMarkdown>
                          </div>
                        ) : // -------------------------------------------
                        null
                      )
                    )}
                  </div>
                  <div className={styles.userMessageEditBtn}>
                    {message.role === "user" &&
                      (editMessageId == message.id ? (
                        <button
                          onClick={() =>
                            handleMessageEdit(message.id.toString())
                          }
                        >
                          {" "}
                          <FiSend />
                        </button>
                      ) : (
                        <div>
                          <button
                            onClick={() =>
                              handleMessageInputEdit(
                                message.id.toString(),
                                message.parts[message.parts.length - 1].text ??
                                  ""
                              )
                            }
                          >
                            {" "}
                            <FaPencilAlt />
                          </button>
                        </div>
                      ))}
                  </div>
                </>
              )
            )}

            {messages.length > 0 &&
            messages[messages.length - 1].role === "user" ? (
              <div className={styles.message}>
                <span className={styles.role}> </span>
                <LoadingDots />
              </div>
            ) : (
              ""
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </main>
  );
}
