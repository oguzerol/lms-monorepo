import axios from "axios";
import { useQuery } from "react-query";
import { API_USER_RESULTS } from "../route/constants";

const useUserResults = () =>
  useQuery(
    `userResults`,
    () => axios.get(`${API_USER_RESULTS}`).then((res) => res.data),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

export default useUserResults;
