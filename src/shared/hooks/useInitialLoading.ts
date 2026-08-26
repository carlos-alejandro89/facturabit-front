import { useEffect, useState } from "react";

export function useInitialLoading(duration = 450) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoading(false), duration);
    return () => window.clearTimeout(timeout);
  }, [duration]);

  return isLoading;
}
