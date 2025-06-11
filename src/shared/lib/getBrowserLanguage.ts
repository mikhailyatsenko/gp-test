export const getBrowserLanguage = (): string => {
  const browserLang = navigator.language;
  return browserLang.split('-')[0];
};
