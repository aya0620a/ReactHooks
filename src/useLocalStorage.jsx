import { useEffect, useState } from 'preact/hooks'

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const jsonValue = window.localStorage.getItem(key)
    if (jsonValue !== null) return JSON.parse(jsonValue)

    return defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value]);

  return [value, setValue];
};
