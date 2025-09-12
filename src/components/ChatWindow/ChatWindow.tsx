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
import LoadingDots from '../LoadingDots/LoadingDots.tsx';

export default function ChatWindow({ messages, isLoading  }) {
  console.log("mesg", messages);

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

            

        {/* {isLoading && (
          <div className={styles.message}>
            <span className={styles.role}>AI: </span>
            <LoadingDots />
          </div>
        )} */}

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
    </main>
  );
}

//---------- aboce is  working good ------------
//  -----belwo is jsut to cehk the loading of three dots --------------------

