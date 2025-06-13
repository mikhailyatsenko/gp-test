import { useCallback, useEffect, useState } from 'react';
import { AnonCodeWidget } from '~/entities/AnonCodeWidget';
import { showToast } from '~/shared/lib';
import { ANONYMOUS_STORAGE_KEY } from '../constants';
import { useRegisterAnonymous } from '../hooks/useRegisterAnonymous';

export const GetAnonCode = () => {
  const [code, setCode] = useState('');

  const {
    register: registerAnonymous,
    error: anonymousError,
    isLoading: isAnonymousLoading,
  } = useRegisterAnonymous();

  const getCode = useCallback(async () => {
    const regCode = await registerAnonymous();
    if (regCode) {
      setCode(regCode);
      localStorage.setItem(ANONYMOUS_STORAGE_KEY, regCode);
    }
  }, [registerAnonymous]);

  useEffect(() => {
    if (!code) {
      getCode();
    }
  }, [code, getCode]);

  useEffect(() => {
    if (anonymousError) {
      showToast.error(anonymousError);
    }
  }, [anonymousError]);

  return (
    <AnonCodeWidget
      isLoading={isAnonymousLoading}
      error={anonymousError}
      code={code}
    />
  );
};
