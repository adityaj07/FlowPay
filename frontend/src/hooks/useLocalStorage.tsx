import { useState } from "react";

interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
}

interface useLocalStorageProps {
  keyname: string;
  defaultValue: User | null;
}

export const useLocalStorage = ({
  keyname,
  defaultValue,
}: useLocalStorageProps) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyname);

      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyname, JSON.stringify(defaultValue));
      }
    } catch (error) {
      return defaultValue;
    }
  });

  const setValue = (newValue: User) => {
    try {
        window.localStorage.setItem(keyname, JSON.stringify(newValue));
    } catch (error) {
        console.log(error)
    }
    setStoredValue(newValue);
  }

  return [storedValue, setValue];
};
