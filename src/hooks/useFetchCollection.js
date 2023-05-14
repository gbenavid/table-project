import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCollection } from '../data/api';

export const useFetchCollection = (tableIdentifier = '', registeredFilters) => {
  const location = useLocation();

  const initialParams = {
    [`page`]: // Get From URL
    [`limit`]: // Get From URL
  };

  const [params] = useState(initialParams);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);

    getCollection(params || initialParams, tableIdentifier)
      .then((filteredData) => {
        setData(filteredData);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const setQueryParam = (param) => {
    fetchData();
  };

  useEffect(() => {
    if (isLoading) return;

    fetchData();
  }, [location, params]);

  return {
    page: params?.[`page`],
    limit: params?.[`limit`],
    params: {},
    setQueryParam,
    isLoading,
    data,
  };
};

export default useFetchCollection;
