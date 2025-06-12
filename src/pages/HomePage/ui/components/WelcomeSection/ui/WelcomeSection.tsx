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
    <section className={styles.welcomeSection} aria-labelledby="welcome-title">
      <h1 id="welcome-title" className={styles.title}>
        {title}
      </h1>
      {subtitle && (
        <p className={styles.subtitle} id="welcome-subtitle">
          {subtitle}
        </p>
      )}
      <img
        src="/images/welcome-cat.svg"
        alt="Welcome cat illustration"
        className={styles.catImage}
        width={200}
        height={200}
        loading="lazy"
        decoding="async"
      />
    </section>
  );
};
