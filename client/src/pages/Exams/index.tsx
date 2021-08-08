import axios from "axios";

import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { Exams as ExamsType } from "../../core/types/exam";
import Loading from "../../components/Loading";
import { toastError } from "../../core/utils/toaster";
import { useHistory } from "react-router";
import { API_EXAMS, URL_MY_EXAMS } from "../../core/route/constants";
import useExams from "../../core/querys/useExams";

import ydtImage from "../../assets/images/ucretsiz-eyds.jpg";
import { useMutation, useQueryClient } from "react-query";

const useStyles = makeStyles((theme) => ({
  media: {
    height: "200px",
    objectFit: "contain",
  },
  cardActions: {
    justifyContent: "flex-end",
  },
}));

export default function Exams() {
  const classes = useStyles();
  const queryClient = useQueryClient();
  const history = useHistory();
  let { data, isLoading, error } = useExams();

  const enrollExamMutation = useMutation(
    (examId: number) => axios.post(`${API_EXAMS}/${examId}/enroll`),
    {
      onError: (error: any) => {
        toastError(`${error.response.data.message}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries("UserExams");
        history.push(URL_MY_EXAMS);
      },
    }
  );

  const handleEnroll = (examId: number) => {
    enrollExamMutation.mutate(examId);
  };

  if (error) return <Typography>Bir hata oluştu.</Typography>;
  if (isLoading) return <Loading />;

  return data && data.length ? (
    <Grid container spacing={3}>
      {data.map((exam: ExamsType) => (
        <Grid item xs={12} sm={3} xl={2} key={exam.id}>
          <Card>
            <CardMedia
              className={classes.media}
              src={ydtImage}
              component="img"
              title="Ucretsiz E-YDS"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="h4"
                align="center"
              >
                {exam.name}
              </Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                component="p"
              >
                {exam.description}
              </Typography>
              <CardActions className={classes.cardActions} disableSpacing>
                <Button
                  onClick={() => handleEnroll(exam.id)}
                  size="small"
                  color="primary"
                  variant="outlined"
                >
                  Satın Al {exam.price}
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  ) : (
    <Typography variant="h5">
      <Box textAlign="center">
        Şu anda aktif olarak çözebileceğiniz bir sınav bulunmuyor.
      </Box>
    </Typography>
  );
}
