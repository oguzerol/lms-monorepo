import axios from "axios";
import { useQuery } from "react-query";
import { API_EXAMS } from "../route/constants";

const useExams = () =>
  useQuery(`exams`, () => axios.get(`${API_EXAMS}`).then((res) => res.data), {
    retry: false,
    refetchOnWindowFocus: false,
  });

export default useExams;
