import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { api } from '~/shared/api';
import { Button, ButtonVariant } from '~/shared/components/Button';
import { getBrowserLanguage } from '~/shared/utils';
import {
  RESEND_CODE_TEXT,
  RESEND_TIMEOUT,
  RESEND_TIMER_TEXT,
  SECONDS_TEXT,
} from '../constants';
import type { ResendCodeProps } from '../types';
import styles from './ResendCode.module.css';

export const ResendCode: FC<ResendCodeProps> = ({ email }) => {
  const [timeLeft, setTimeLeft] = useState(RESEND_TIMEOUT);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  useEffect(() => {
    if (isResendDisabled) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isResendDisabled]);

  const handleResend = async () => {
    try {
      const response = await api.registerEmail({
        email,
        lang: getBrowserLanguage(),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error.message);
      }

      setTimeLeft(RESEND_TIMEOUT);
      setIsResendDisabled(true);
    } catch (error) {
      console.error('Resend error:', error);
    }
  };

  return (
    <div className={styles.timer}>
      {isResendDisabled ? (
        <>
          {RESEND_TIMER_TEXT} {timeLeft} {SECONDS_TEXT}
        </>
      ) : (
        <Button
          variant={ButtonVariant.Blank}
          type="button"
          className={styles.resendButton}
          onClick={handleResend}
          disabled={isResendDisabled}
        >
          {RESEND_CODE_TEXT}
        </Button>
      )}
    </div>
  );
};
