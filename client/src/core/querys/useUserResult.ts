import axios from "axios";
import { useQuery } from "react-query";
import { API_USER_RESULTS } from "../route/constants";

const useUserResult = (examId?: String) =>
  useQuery(
    `userExamResult_${examId}`,
    () => axios.get(`${API_USER_RESULTS}/${examId}`).then((res) => res.data),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

export default useUserResult;
