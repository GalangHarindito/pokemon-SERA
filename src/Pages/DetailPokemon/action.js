import { FAILED, LOADING, SUCCESS } from "./constants";
import axios from "axios";
import { toast } from "react-toastify";
import { BASIC_URL, BASIC_URL_LOCAL } from "../../utils/fetch";

export function getPokemonId(id) {
 
  return (dispatch) => {
    dispatch(loadingAction(true, ""));
   
    const options = {
      method: "GET",
      url: `${BASIC_URL}/pokemon/${id}`,
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
          dispatch(successAction(data, ''));
        }
      })
      .catch((err) => {
        //toasterError(messageStatus)
        //dispatch(failedAction(messageStatus));
        dispatch(loadingAction(false, ""));
      });
  };
}

export function catchPokemon(id) {
 
  return (dispatch) => {
    dispatch(loadingAction(true, 'Catch'));
    dispatch(successAction('', 'Catch'));
    const options = {
      method: "POST",
      url: `${BASIC_URL_LOCAL}/catch`,
      headers: {},
    };

    axios(options)
      .then((res) => {
        const { status, data } = res;
        dispatch(loadingAction(false, 'Catch'));

        if (status === 200) {
          dispatch(successAction(data, 'Catch'));
        }
      })
      .catch((err) => {
        //toasterError(messageStatus)
        //dispatch(failedAction(messageStatus));
        dispatch(loadingAction(false, 'Catch'));
      });
  };
}

export function storePokemon(payload) {
 
  return (dispatch) => {
    dispatch(loadingAction(true, "Store"));
    dispatch(successAction('', 'StatusStore'));
    const options = {
      method: "POST",
      url: `${BASIC_URL_LOCAL}/store`,
      data: payload,
      headers: {},
    };

    const toasterSuccess = (text) => {
      toast.success(`${text}`, {
        position: "top-center",
        autoClose: true,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };

    axios(options)
      .then((res) => {
        const { status } = res;
   
        dispatch(loadingAction(false, "Store"));

        if (status === 200) {
          dispatch(successAction(status, 'StatusStore'));
          toasterSuccess('Saved Your Pokemon!');
        }
      })
      .catch((err) => {
        //toasterError(messageStatus)
        //dispatch(failedAction(messageStatus));
        dispatch(loadingAction(false, "Store"));
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
