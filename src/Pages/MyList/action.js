import { FAILED, LOADING, SUCCESS } from "./constants";
import axios from "axios";
import { toast } from "react-toastify";
import { BASIC_URL_LOCAL } from "../../utils/fetch";

export function getPokemonList() {
 
  return (dispatch) => {
    dispatch(loadingAction(true, ""));
   
    const options = {
      method: "GET",
      url: `${BASIC_URL_LOCAL}/mylist`,
      headers: {},
    };

    const toasterError = (text) => {
      toast.success(`${text}`, {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };

    axios(options)
      .then((res) => {
        const { status, data } = res;
        dispatch(loadingAction(false, ""));

        if (status === 200) {
          dispatch(successAction(data.data, ''));
        }
      })
      .catch((err) => {
        //toasterError(messageStatus)
        //dispatch(failedAction(messageStatus));
        dispatch(loadingAction(false, ""));
      });
  };
}

export function resetMessage(data, key) {
  return successAction(data, key);
}

function failedAction(message, key) {
  return { type: FAILED, message, key };
}

function loadingAction(isLoading, key) {
  return { type: LOADING, isLoading, key };
}

function successAction(data, key) {
  return { type: SUCCESS, data, key };
}
