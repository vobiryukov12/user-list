import { useEffect, useState } from "react";
import { IList } from "../models/models";

export default function useJsonFetch(url: string, opts = {}) {
  const [data, setData] = useState<IList[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function getList() {
    try {
      setError('');
      setLoading(true); 
      const response = await fetch(url, { ...opts });

      if (!response.ok) {
        setLoading(false);
        setError(`Ошибка! статус: ${response.status}`);
        return;
      }

      const responseData = await response.json();

      setData(responseData);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      const error = new Error(" Ого, ошибка! o_O");
      setError(error.message);
    }
  }

  useEffect(() => {
    getList();
  }, []);

  return [ data, loading, error ] as const;
}
