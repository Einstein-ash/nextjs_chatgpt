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












import React from 'react';
import styles from './ChatInput.module.css';

export default function ChatInput({
  input,
  setInput,
  sendMessage,
  fileInputRef,
  handleFileChange,
  attachments
}) {
  // Add this function to trigger file dialog
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={async (e) => {
        e.preventDefault();
        sendMessage({
          role: 'user',
          parts: [
            ...attachments.map((attachment) => ({
              type: 'file',
              url: attachment.url,
              name: attachment.name,
              mediaType: attachment.contentType,
            })),
            {
              type: 'text',
              text: input,
            },
          ],
        });
        setInput('');
      }}
    >
      <input
        className={styles.file}
        type="file"
        ref={fileInputRef}
        multiple
        onChange={handleFileChange}
        tabIndex={-1}
      />
      <div className={styles.inputBar}>
        {/* Make "+" icon call triggerFileInput() */}
        <span
          className={styles.plus}
          onClick={triggerFileInput}
          style={{ cursor: 'pointer' }}
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
          <span role="img" aria-label="Send">🎤</span>
        </button>
      </div>
    </form>
  );
}
