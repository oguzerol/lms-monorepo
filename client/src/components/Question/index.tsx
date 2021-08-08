import { Box } from "@material-ui/core";

import Info from "./Info";
import Content from "./Content";
import Answer from "../Answer";
import { CurrentQuestionAnswer } from "../../core/types/exam";

const Question = ({
  currentQuestionInfo,
  currentQuestionAnswers,
  currentExamId,
  currentQuestionId,
  changeAnswer,
  userAnswer,
  currentQuestionContent,
}: {
  currentQuestionInfo?: String;
  currentQuestionAnswers?: Array<CurrentQuestionAnswer>;
  currentExamId?: String;
  currentQuestionId?: number;
  changeAnswer?: Function;
  userAnswer?: number;
  currentQuestionContent?: String;
}) => {
  return (
    <Box>
      <Info currentQuestionInfo={currentQuestionInfo} />
      <Content currentQuestionContent={currentQuestionContent} />
      <Answer
        currentQuestionAnswers={currentQuestionAnswers}
        currentExamId={currentExamId}
        changeAnswer={changeAnswer}
        userAnswer={userAnswer}
        currentQuestionId={currentQuestionId}
      />
    </Box>
  );
};

export default Question;
