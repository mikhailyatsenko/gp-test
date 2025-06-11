export const validateInput = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(value)) {
    return 'email';
  }

  if (/^\d{16}$/.test(value)) {
    return 'code';
  }
  return null;
};
