import { useEffect, useState } from "react";

const useFetch = (fetchFunction, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchData();
  }, deps); 

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;