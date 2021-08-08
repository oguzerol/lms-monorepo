// TODO: UPDATE
export type Exams = {
  id: number;
  name: string;
  description?: string;
  price?: string;
};

export type UserExams = {
  id: number;
  exam_id: number;
  user_id: number;
  standalone_start_time: null | Date;
  standalone_end_time: null | Date;
  standalone_status: null | number;
  created_at: null | Date;
  updated_at: null | Date;
  deleted_at: null | Date;
  info: Exams;
};

export type Answer = {
  label: String;
  question_id: number;
  id: number;
  answer_id: number;
  content: String;
  is_correct: Boolean;
};

export type UserAnswer = {
  answer_id?: number;
};

export type QuestionType = {
  id: number;
  info: String;
  content: String;
  answers: Array<Answer>;
  questions: Array<QuestionType>;
  user_answer: UserAnswer;
};

export type ExamType = {
  id: number;
  exam: { questions: Array<QuestionType> };
  standalone_end_time: null | Date;
};

export type CurrentQuestionAnswer = {
  id: number;
  answer_id: number;
  content: String;
  is_correct?: Boolean;
};
