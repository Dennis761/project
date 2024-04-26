import { useState, useEffect } from 'react';

export default function useDebounce(func, delay) {
  const [canCall, setCanCall] = useState(true);

  useEffect(() => {
    if (!canCall) {
      const timeoutId = setTimeout(() => {
        setCanCall(true);
      }, delay);

      return () => clearTimeout(timeoutId);
    }
  }, [canCall, delay]);

  function debouncedFunction(...args) {
    if (canCall) {
      func(...args);
      setCanCall(false);
    }
  }

  return debouncedFunction;
}