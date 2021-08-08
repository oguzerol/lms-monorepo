import { CurrentQuestionAnswer } from "../../core/types/exam";
import { answerLabel } from "../../core/utils/constants/exam";
import Item from "./Item";

const AnswerList = ({
  currentQuestionAnswers,
  currentExamId,
  currentQuestionId,
  changeAnswer,
  userAnswer,
}: {
  currentQuestionAnswers?: Array<CurrentQuestionAnswer>;
  currentExamId?: String;
  currentQuestionId?: number;
  changeAnswer?: Function;
  userAnswer?: number;
}) => {
  return !currentQuestionAnswers ? null : (
    <div>
      {currentQuestionAnswers.map((answer, item) => {
        return (
          <Item
            key={answer.id}
            handleChange={() =>
              changeAnswer &&
              changeAnswer({
                examId: currentExamId,
                questionId: currentQuestionId,
                answerId: answer.id,
              })
            }
            userAnswer={userAnswer}
            isCorrect={answer.is_correct}
            isSelected={userAnswer === answer.id}
            label={answer.content}
            text={answerLabel[item]}
          />
        );
      })}
    </div>
  );
};

export default AnswerList;
