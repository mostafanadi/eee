import { useState, useEffect, useCallback } from 'react';

interface UseFetchProps {
  url: string;
  options: RequestInit;
}

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  postData: (data: string) => void
}

export const useMutation = <T>({
  url,
  options,
}: UseFetchProps): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const postData = useCallback(async (body: string) => {
    try {
      const response = await (await fetch(url, { ...options, method: "POST", body })).json();
      setData(response)
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }



  }, [url, options]);

  return { data, loading, error, postData };
};
