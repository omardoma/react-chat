import { nanoid } from 'nanoid';

export const getUserLanguage = (): string => {
  const language: string =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    (navigator as any).userLanguage;
  return language.split('-')[0];
};

export const generateId = (length: number = 6) => nanoid(length);
