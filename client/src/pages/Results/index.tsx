import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import { UserExams } from "../../core/types/exam";
import Loading from "../../components/Loading";
import { useHistory } from "react-router";
import { URL_RESULTS } from "../../core/route/constants";
import useUserResults from "../../core/querys/useUserResults";

export default function Results() {
  const history = useHistory();
  let { data, isLoading, error } = useUserResults();

  const goToResultDetail = (id: number) => {
    history.push(`${URL_RESULTS}/${id}`);
  };

  if (error) return <Typography>Bir hata oluştu.</Typography>;
  if (isLoading) return <Loading />;

  return data && data.length ? (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead color="secondary">
          <TableRow>
            <TableCell>Sınav</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item: UserExams) => (
            <TableRow key={item.info.id}>
              <TableCell component="th" scope="row">
                {item.info.name}
              </TableCell>

              <TableCell align="right">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => goToResultDetail(item.info.id)}
                >
                  Görüntüle
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Typography variant="h5">
      <Box textAlign="center">
        Şu anda sonucunu görüntüleyeceğiniz bir sınav bulunmamaktadır.
      </Box>
    </Typography>
  );
}
