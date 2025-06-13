import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Button, ButtonVariant } from '~/shared/components/Button';
import { useEnterByEmail } from '~/shared/hooks';
import { showToast } from '~/shared/lib';
import {
  RESEND_CODE_TEXT,
  RESEND_SUCCESS_TEXT,
  RESEND_TIMEOUT,
  RESEND_TIMER_TEXT,
  SECONDS_TEXT,
} from '../constants';
import type { ResendCodeProps } from '../types';
import styles from './ResendCode.module.css';

export const ResendCode: FC<ResendCodeProps> = ({ email }) => {
  const {
    register,
    error: registerError,
    isLoading: isRegisterLoading,
  } = useEnterByEmail();

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
    const isSuccess = await register(email);
    if (isSuccess) {
      setTimeLeft(RESEND_TIMEOUT);
      setIsResendDisabled(true);
      showToast.success(RESEND_SUCCESS_TEXT);
    }
  };

  useEffect(() => {
    if (registerError) {
      showToast.error(registerError);
    }
  }, [registerError]);

  return (
    <output className={styles.timer} aria-live="polite">
      {isResendDisabled ? (
        <span className={styles.timerText}>
          {RESEND_TIMER_TEXT} {timeLeft} {SECONDS_TEXT}
        </span>
      ) : (
        <Button
          variant={ButtonVariant.Blank}
          type="button"
          onClick={handleResend}
          disabled={isResendDisabled || isRegisterLoading}
          aria-label="Resend verification code"
          aria-busy={isRegisterLoading}
        >
          {RESEND_CODE_TEXT}
        </Button>
      )}
    </output>
  );
};
