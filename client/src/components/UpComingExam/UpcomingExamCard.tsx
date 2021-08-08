import useUserExams from "../../core/querys/useUserExams";
import Loading from "../Loading";
import { Box, Button, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { URL_MY_EXAMS, URL_EXAMS } from "../../core/route/constants";

const UpcomingExamCard = () => {
  let { data, isLoading, error } = useUserExams();
  if (isLoading) return <Loading />;

  return (
    <div>
      {error && <Typography>Bir hata oluştu.</Typography>}
      {!error && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginTop={2}
        >
          <Typography variant="body1" component="div">
            <Box marginRight={2}>
              {data.length === 0
                ? "Şuanda çözebileceginiz bir sınav yok."
                : `Hemen çözebileceginiz ${data.length} adet sınav bulunmaktadır.`}
            </Box>
          </Typography>
          <Button
            component={RouterLink}
            to={data.length === 0 ? URL_EXAMS : URL_MY_EXAMS}
            variant="outlined"
            color="secondary"
          >
            {data.length === 0 && "Sınavları "}
            Görüntüle
          </Button>
        </Box>
      )}
    </div>
  );
};

export default UpcomingExamCard;
