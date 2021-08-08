import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";

import { Paper, makeStyles, Grid } from "@material-ui/core";
// import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
// import Bookmark from "@material-ui/icons/Bookmark";

import { useSocket } from "../../core/contexts/socket";
import { toastError, toastLocalDebug } from "../../core/utils/toaster";
import QuestionNumber from "../../components/QuestionNumber";
import QuestionNav from "../../components/QuestionNav";
import Question from "../../components/Question";
import QuickView from "../../components/QuickView";
import useUserExam from "../../core/querys/useUserExam";
import { API_USER_ANSWER, URL_RESULTS } from "../../core/route/constants";
import { ExamType } from "../../core/types/exam";
import { useMutation, useQueryClient } from "react-query";
import Loading from "../../components/Loading";

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
      height: "calc(100% - 58px)",
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
      minWidth: "40px",
      [theme.breakpoints.up("md")]: {
        minWidth: "64px",
      },
    },
    right: {
      display: "flex",
      alignItems: "center",
      position: "relative",
      minWidth: "40px",
      [theme.breakpoints.up("md")]: {
        minWidth: "64px",
      },
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
        paddingRight: 20,
        order: 1,
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

const Exam = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const { examId }: { examId?: String } = useParams();
  const socket = useSocket();
  const classes = useStyles();

  const {
    data,
    isLoading,
    error,
  }: { data?: ExamType; isLoading: any; error: any } = useUserExam(examId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const exam = data?.exam;
  const currentQuestionInfo = exam?.questions[currentQuestionIndex].info;
  const currentQuestionContent = exam?.questions[currentQuestionIndex].content;
  const currentQuestionAnswers = exam?.questions[currentQuestionIndex].answers;
  const currentQuestionId = exam?.questions[currentQuestionIndex].id;
  const currentQuestionUserAnswer =
    exam?.questions[currentQuestionIndex].user_answer?.answer_id;

  const answerMutation = useMutation(
    ({
      questionId,
      answerId,
      examId,
    }: {
      examId?: number;
      questionId: number;
      answerId: number | null;
    }) =>
      axios.post(API_USER_ANSWER, {
        exam_id: examId,
        question_id: questionId,
        answer_id: answerId,
      }),
    {
      onMutate: async ({
        examId,
        questionId,
        answerId,
      }: {
        examId?: number;
        questionId: number;
        answerId: number | null;
      }) => {
        const currentQueries = `userExam_${examId}`;
        await queryClient.cancelQueries(currentQueries);

        const previousQueries = queryClient.getQueryData(currentQueries);

        queryClient.setQueryData(currentQueries, (old: any) => {
          return {
            ...old,
            exam: {
              ...old.exam,
              questions: old.exam.questions.map((question: any) =>
                question.id === questionId
                  ? { ...question, user_answer: { answer_id: answerId } }
                  : question
              ),
            },
          };
        });

        return { previousQueries };
      },
      onError: (error: any, variables, context: any) => {
        toastError(`Bir hata ${error.response.data.message}`);
        queryClient.setQueryData(`userExam_${examId}`, context.previousQueries);
      },
    }
  );

  useEffect(() => {
    if (socket == null) return;

    toastLocalDebug("Socket bağlantısı kuruldu.");

    socket.on("end-exam", () => {
      toastLocalDebug("Socket'ten sınavı bitirme isteği geldi.");
      queryClient.removeQueries(`userExam_${examId}`);
      history.push(URL_RESULTS);
    });

    return () => {
      socket.off("end-exam");
      toastLocalDebug("Socket bağlantısı kapatıldı.");
    };
  }, [socket, examId, queryClient, history]);

  // const isQuestionMarked = 1;

  const handleQuestionChange = (id: number) => {
    setCurrentQuestionIndex(id);
  };

  const checkIsAlreadySelectedAnswer = ({
    currentAnswerId,
    answerId,
  }: {
    currentAnswerId?: number;
    answerId: number;
  }) => {
    return currentAnswerId === answerId;
  };

  const handleChangeAnswer = ({
    examId,
    questionId,
    answerId,
  }: {
    examId: number;
    questionId: number;
    answerId: number;
  }) => {
    const isAnswerUncheck = checkIsAlreadySelectedAnswer({
      currentAnswerId: currentQuestionUserAnswer,
      answerId,
    });
    answerMutation.mutate({
      examId,
      questionId,
      answerId: isAnswerUncheck ? null : answerId,
    });
  };

  const questionsWithAnswer = exam?.questions.map((question) => {
    return {
      question_id: question.id,
      userAnswerId: question.user_answer?.answer_id,
    };
  });

  if (isLoading) {
    <Loading />;
  }

  if (error) {
    return <div>{error.response.data.message}</div>;
  }

  return (
    <Grid container className={classes.root}>
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
                  changeAnswer={handleChangeAnswer}
                  userAnswer={currentQuestionUserAnswer}
                />
              </div>
              <div className={classes.right}>
                {/* <div className={classes.bookmark}>
                  {!isQuestionMarked ? (
                    <Bookmark fontSize="large" />
                  ) : (
                    <BookmarkBorderIcon fontSize="large" />
                  )}
                </div> */}
                <QuestionNav
                  next
                  currentQuestionIndex={currentQuestionIndex}
                  changeCurrentQuestion={handleQuestionChange}
                />
              </div>
            </Paper>
          </Grid>
          <Grid item sm={12} md={3} xl={2} className={classes.quickView}>
            <QuickView
              list={questionsWithAnswer}
              changeCurrentQuestion={handleQuestionChange}
              questionsLength={80}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Exam;
