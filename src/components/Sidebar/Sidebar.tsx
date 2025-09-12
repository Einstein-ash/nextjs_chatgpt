'use client';
import styles from './Sidebar.module.css';
export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.title}>ChatGPT</div>
      {/* Add sidebar icons or nav items below */}
      <hr className={styles.hr} />
    </aside>
  );
}
