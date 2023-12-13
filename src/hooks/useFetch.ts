import { useState, useEffect } from 'react';

interface UseFetchProps<T> {
  url: string;
  options?: RequestInit;
}

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export const useFetch = <T>({
  url,
  options,
}: UseFetchProps<T>): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, loading, error };
};
