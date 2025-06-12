import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { api } from '~/shared/api';
import { Button, ButtonVariant } from '~/shared/components/Button';
import { getBrowserLanguage } from '~/shared/utils';
import { RESEND_TIMEOUT } from '../constants';
import type { ResendCodeProps } from '../types';
import styles from './ResendCode.module.css';

export const ResendCode: FC<ResendCodeProps> = ({ email }) => {
  const [timeLeft, setTimeLeft] = useState(RESEND_TIMEOUT);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  useEffect(() => {
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
  }, []);

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
        <>Resend code in {timeLeft} sec</>
      ) : (
        <Button
          variant={ButtonVariant.Blank}
          type="button"
          className={styles.resendButton}
          onClick={handleResend}
          disabled={isResendDisabled}
        >
          Resend code
        </Button>
      )}
    </div>
  );
};
