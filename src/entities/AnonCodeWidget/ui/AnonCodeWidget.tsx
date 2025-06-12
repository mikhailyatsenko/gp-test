import type React from 'react';
import { type FC, useState } from 'react';
import { Button, ButtonVariant } from '~/shared/components/Button';
import {
  COPIED_BUTTON_TEXT,
  COPY_BUTTON_TEXT,
  LOADING_TEXT,
} from '../constants';
import type { AnonCodeWidgetProps } from '../types';
import styles from './AnonCodeWidget.module.css';

export const AnonCodeWidget: FC<AnonCodeWidgetProps> = ({
  code,
  isLoading,
  error,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <>
      {isLoading && <div>{LOADING_TEXT}</div>}
      {error && <div>{error}</div>}
      <div className={styles.codeContainer}>
        <div className={styles.code}>{code}</div>
        <Button
          type="button"
          onClick={handleCopy}
          variant={ButtonVariant.Outlined}
        >
          {isCopied ? COPIED_BUTTON_TEXT : COPY_BUTTON_TEXT}
        </Button>
      </div>
    </>
  );
};
