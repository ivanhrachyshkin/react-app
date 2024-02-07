import { useEffect, useState } from 'react';
import { CatFactType } from '../types/CatFactType';

interface FetchState {
  data: CatFactType[];
  loading: boolean;
  error: string;
}

function useFetch(url: string): FetchState {
  const [data, setData] = useState<CatFactType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Fetch exception');

        const json = await response.json();
        const jsonData = json.data;
        const catFacts = JSON.parse(JSON.stringify(jsonData));
        setData(catFacts);
        setLoading(false);

      } catch (error: any) {
        setError(error.message as string);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      setData([] as CatFactType[]);
      setLoading(true);
      setError('');
    };
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
