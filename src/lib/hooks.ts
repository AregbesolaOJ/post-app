import { useCallback, useEffect, useState } from 'react';
import type { FetcherProps } from './types';
import { BASE_URL } from './data';

// custom fetcher to handle loading states, error handling and request cancellation
export function useFetcher<T>({ urlPath, skip }: FetcherProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  const initiateFetch = useCallback(() => {
    let ignore = false;

    setIsLoading(true);
    fetch(`${BASE_URL}${urlPath}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        return res.json();
      })
      .then((jsonData) => {
        if (!ignore) {
          // Error handling
          setData(jsonData);
          setError(undefined);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err);
          setData(undefined);
        }
      })
      .finally(() => {
        if (!ignore) {
          // Cancellation；
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [urlPath]);

  useEffect(() => {
    if (!skip) {
      initiateFetch();
    }
  }, [initiateFetch, skip]);

  return {
    isLoading,
    data,
    error
  };
}
