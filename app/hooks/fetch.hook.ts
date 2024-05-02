import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getUserName } from "../helper/api";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

type FetchData = {
  isLoading: boolean;
  apiData?: any;
  status: number | null;
  serverError: any;
};

type SetFetchData = Dispatch<SetStateAction<FetchData>>;

type Query = string | null;

export const useFetch = (query: Query): [FetchData, SetFetchData] => {
  const [getData, setData] = useState<FetchData>({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;
      try {
        setData((prev) => ({ ...prev, isLoading: true }));
        const { data, status } = await axios.get(`/api/${query}`);

        if (status === 200) {
          setData((prev) => ({
            ...prev,
            isLoading: false,
          }));
          setData((prev) => ({
            ...prev,
            apiData: data,
            status: status,
          }));
        }
        setData((prev) => ({
          ...prev,
          isLoading: false,
        }));
      } catch (error) {
        setData((prev) => ({
          ...prev,
          isLoading: false,
          serverError: error,
        }));
      }
    };
    fetchData();
  }, [query]);

  return [getData, setData];
};
