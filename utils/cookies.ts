import { CookieStorage } from "cookie-storage";

let cookieStorage: CookieStorage | null = null;

export const store = (key: string, value: string): void => {
  if (!cookieStorage) cookieStorage = new CookieStorage();
  cookieStorage.setItem(key, value);
};

export const retrieve = (key: string): string | null => {
  if (!cookieStorage) cookieStorage = new CookieStorage();
  return cookieStorage.getItem(key);
};

export const remove = (key: string) => {
  if (!cookieStorage) cookieStorage = new CookieStorage();
  cookieStorage.removeItem(key);
};

export const clear = () => {
  if (!cookieStorage) cookieStorage = new CookieStorage();
  cookieStorage.clear();
};
