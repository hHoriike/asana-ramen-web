import { useState, useCallback, useEffect } from "react";

const useFetch = <T = any>(
  initialData: T,
  fetcher: () => Promise<T>,
  autoFetch?: boolean
): [T, () => Promise<void>, boolean, unknown] => {
  const [data, setData] = useState<T>(initialData);
  const [error, setError] = useState<unknown>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const refetch = useCallback(async () => {
    setIsProcessing(true);
    try {
      setData(await fetcher());
    } catch (e) {
      setError(e);
    } finally {
      setIsProcessing(false);
    }
  }, [setIsProcessing, setData, setError, fetcher]);
  useEffect(() => {
    if (autoFetch ?? true) {
      refetch();
    }
  }, [refetch]);

  return [data, refetch, isProcessing, error];
};

export default useFetch;
