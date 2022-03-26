import useSWR from 'swr';
import { fetcher } from '..';

const useFetch = (endpoint) => {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, fetcher);

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
    isEmpty: data?.data?.length === 0,
  };
};

export default useFetch;
