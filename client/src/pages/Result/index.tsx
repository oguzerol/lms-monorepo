import { useState } from "react";
import { useParams } from "react-router";

import { Paper, makeStyles, Grid } from "@material-ui/core";

import QuestionNumber from "../../components/QuestionNumber";
import QuestionNav from "../../components/QuestionNav";
import Question from "../../components/Question";
import QuickView from "../../components/QuickView";
import useUserResult from "../../core/querys/useUserResult";
import { ExamType } from "../../core/types/exam";
import Loading from "../../components/Loading";
import ResultCounts from "../../components/ResultCounts";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
      height: "100%",
      justifyContent: "center",
      display: "flex",
      overflow: "hidden",
    },
    paper: {
      width: "100%",
      display: "flex",
      padding: "10px 0",
      overflowY: "auto",
      height: "calc(100% - 206px)",
      [theme.breakpoints.up("md")]: {
        padding: "50px 0",
        height: "100%",
      },
      // TODO: windows custom scrollbar
    },
    left: {
      display: "flex",
      alignItems: "center",
      position: "relative",
      flexBasis: "64px",
    },
    right: {
      display: "flex",
      alignItems: "center",
      flexBasis: "64px",
      position: "relative",
    },
    middle: {
      flexGrow: 1,
    },
    bookmark: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "block",
      },
      position: "absolute",
      top: 0,
      right: "15px",
    },
    container: {
      display: "flex",
      order: 2,
      [theme.breakpoints.up("md")]: {
        order: 1,
      },
      [theme.breakpoints.up("md")]: {
        paddingRight: 20,
      },
      height: "100%",
    },
    quickView: {
      order: 1,
      [theme.breakpoints.up("md")]: {
        order: 2,
      },
    },
  };
});

const Result = () => {
  const { examId }: { examId?: String } = useParams();
  const classes = useStyles();

  const {
    data,
    isLoading,
    error,
  }: { data?: ExamType; isLoading: any; error: any } = useUserResult(examId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const exam = data?.exam;
  const currentQuestionInfo = exam?.questions[currentQuestionIndex].info;
  const currentQuestionContent = exam?.questions[currentQuestionIndex].content;
  const currentQuestionAnswers = exam?.questions[currentQuestionIndex].answers;
  const currentQuestionId = exam?.questions[currentQuestionIndex].id;
  const currentQuestionUserAnswer =
    exam?.questions[currentQuestionIndex].user_answer?.answer_id;

  const handleQuestionChange = (id: number) => {
    setCurrentQuestionIndex(id);
  };

  const questionsWithAnswer = exam?.questions.map((question) => {
    const correctAnswer = question.answers.find(
      (answer) => answer.is_correct === true
    );
    return {
      question_id: question.id,
      userAnswerId: question.user_answer?.answer_id,
      correctAnswerId: correctAnswer?.id,
    };
  });

  const resultsCount = {
    correct: 0,
    empty: 0,
    wrong: 0,
  };

  questionsWithAnswer?.forEach((item) => {
    if (typeof item.userAnswerId === "undefined") {
      resultsCount.empty++;
    } else if (item.userAnswerId === item.correctAnswerId) {
      resultsCount.correct++;
    } else {
      resultsCount.wrong++;
    }
  });

  if (isLoading) {
    <Loading />;
  }

  if (error) {
    return <div>{error.response.data.message}</div>;
  }

  return (
    <Grid container spacing={3} className={classes.root}>
      {exam && (
        <>
          <Grid item sm={12} md={9} xl={10} className={classes.container}>
            <Paper elevation={3} className={classes.paper}>
              <div className={classes.left}>
                <QuestionNumber currentQuestionIndex={currentQuestionIndex} />
                <QuestionNav
                  currentQuestionIndex={currentQuestionIndex}
                  changeCurrentQuestion={handleQuestionChange}
                />
              </div>
              <div className={classes.middle}>
                <Question
                  currentQuestionInfo={currentQuestionInfo}
                  currentQuestionAnswers={currentQuestionAnswers}
                  currentExamId={examId}
                  currentQuestionId={currentQuestionId}
                  currentQuestionContent={currentQuestionContent}
                  userAnswer={currentQuestionUserAnswer}
                />
              </div>
              <div className={classes.right}>
                <QuestionNav
                  next
                  currentQuestionIndex={currentQuestionIndex}
                  changeCurrentQuestion={handleQuestionChange}
                />
              </div>
            </Paper>
          </Grid>
          <Grid item className={classes.quickView} sm={12} md={3} xl={2}>
            <QuickView
              list={questionsWithAnswer}
              changeCurrentQuestion={handleQuestionChange}
              questionsLength={80}
            />
            <ResultCounts
              empty={resultsCount.empty}
              wrong={resultsCount.wrong}
              correct={resultsCount.correct}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Result;
