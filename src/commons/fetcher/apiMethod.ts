import { PatContext } from "App";
import axios from "axios";
import { useContext } from "react";

const createConfig = (pat: string) => ({
  headers: { apikey: pat },
});

export const useApiGet = <Resonse>(endpoint: string) => {
  const pat = useContext(PatContext);
  return () =>
    axios.get<Resonse>(
      `https://sbskentei.herokuapp.com${endpoint}`,
      createConfig(pat)
    );
};
export const useApiPost = <Resonse>(endpoint: string) => {
  const pat = useContext(PatContext);
  return (body?: any) =>
    axios.post<Resonse>(
      `https://sbskentei.herokuapp.com${endpoint}`,
      body,
      createConfig(pat)
    );
};
