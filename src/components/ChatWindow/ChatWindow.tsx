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

export default function ChatWindow({ messages }) {
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
      </div>
    </main>
  );
}
