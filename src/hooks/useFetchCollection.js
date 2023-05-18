import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCollection } from '../data/api';

export const useFetchCollection = (tableId = '') => {
  const DEFAULT_PAGE = 1;
  const DEFAULT_LIMIT = 10;
  const [currentQueryParameters, setSearchParams] = useSearchParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setIsLoading(true);

    getCollection(currentQueryParameters, tableId)
      .then((res) => {
        setData(res);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const setQueryParam = (param) => {
    setSearchParams(param);
    fetchData();
  };

  useEffect(() => {
    if (!currentQueryParameters.has(`${tableId}_page`)) {
      currentQueryParameters.set(`${tableId}_page`, DEFAULT_PAGE);
    }
    if (!currentQueryParameters.has(`${tableId}_limit`)) {
      currentQueryParameters.set(`${tableId}_limit`, DEFAULT_LIMIT);
    }
    if (!currentQueryParameters.has(`${tableId}_functions`)) {
      currentQueryParameters.set(`${tableId}_functions`, []);
    }
    if (!currentQueryParameters.has(`${tableId}_segments`)) {
      currentQueryParameters.set(`${tableId}_segments`, []);
    }
    setSearchParams(currentQueryParameters);
  }, [currentQueryParameters, setSearchParams, tableId]);

  useEffect(() => {
    if (isLoading) return;
    fetchData();
  }, [currentQueryParameters]);

  return {
    page: +currentQueryParameters.get(`${tableId}_page`),
    limit: +currentQueryParameters.get(`${tableId}_limit`),
    params: currentQueryParameters,
    setQueryParam,
    isLoading,
    data,
    error,
  };
};

export default useFetchCollection;
