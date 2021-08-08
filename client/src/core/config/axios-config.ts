import axios from "axios";
import { AppDispatch } from "../redux/store";

type Store = {
  dispatch: AppDispatch;
};

const configAxios = (store: Store) => {
  axios.interceptors.response.use(
    (response) => {
      if (
        response.data &&
        response.data.statusCode &&
        (response.data.statusCode < 200 || response.data.statusCode >= 300)
      ) {
        throw Object.create({
          message: `${response.data.statusMessage}`,
          statusCode: response.data.statusCode,
          result: response.data.result,
        });
      }
      return response;
    },
    (error) => {
      if (!error.response) {
        error.message =
          "Yaşadığımız teknik bir sorundan dolayı şu an hizmet veremiyoruz, lütfen birazdan tekrar deneyin.";
      }
      if (
        error &&
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        error.message = "401";
        window.location.href = "/";
        store.dispatch({ type: "DELETE_AUTH" });
        // logout user
      }
      if (error && error.response && error.response.status === 403) {
        error.message = "403";
        // if (dispatch) dispatch(logout(userType));
        // window.location = REACT_FULL_URL_PHARMACY_LOGIN;
      }

      return Promise.reject(error);
    }
  );
};

export default configAxios;
