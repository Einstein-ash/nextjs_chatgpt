import styles from './LoadingDots.module.css';

export default function LoadingDots() {
  // The component now just returns a single div with the new style.
  return <div className={styles.pulsingLoader} />;
}