import axios from "axios";
import { useQuery } from "react-query";
import { API_USER_EXAMS } from "../route/constants";

const useUserExams = () =>
  useQuery(
    `userExams`,
    () => axios.get(`${API_USER_EXAMS}`).then((res) => res.data),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

export default useUserExams;
