import styles from './LoadingDots.module.css';

export default function LoadingDots() {
  return (
    <div className={styles.bouncingLoader}>
      <div />
      <div />
      <div />
    </div>
  );
}
