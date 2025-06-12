import type { FC } from 'react';
import styles from './WelcomeSection.module.css';

interface WelcomeSectionProps {
  title: string;
  subtitle?: string;
}

export const WelcomeSection: FC<WelcomeSectionProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div className={styles.welcomeSection}>
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <img
        src="/images/welcome-cat.svg"
        alt="Welcome cat illustration"
        className={styles.catImage}
        width={200}
        height={200}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};
