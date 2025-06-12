import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
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
      toast.error(registerError);
    }
  }, [registerError]);

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
          onClick={handleResend}
          disabled={isResendDisabled || isRegisterLoading}
        >
          {RESEND_CODE_TEXT}
        </Button>
      )}
    </div>
  );
};
