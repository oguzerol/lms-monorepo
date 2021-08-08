import axios from "axios";
import { useQuery } from "react-query";
import { API_USER_EXAMS } from "../route/constants";

const useUserExam = (examId?: String) =>
  useQuery(
    `userExam_${examId}`,
    () => axios.get(`${API_USER_EXAMS}/${examId}`).then((res) => res.data),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

export default useUserExam;
