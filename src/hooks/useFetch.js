import { useState, useEffect } from 'react';

const useFetch = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    apiCall()
      .then(res => {
        if (mounted) setData(res.data);
      })
      .catch(err => {
        if (mounted) setError(err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => (mounted = false);
  }, dependencies);

  return { data, loading, error };
};

export default useFetch;
