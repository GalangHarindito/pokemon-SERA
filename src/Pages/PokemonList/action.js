import { FAILED, LOADING, SUCCESS } from "./constants";
import axios from "axios";
import { BASIC_URL } from "../../utils/fetch";
import queryString from "querystring";

export function getAllPokemon(query) {
  
  const newQuery = queryString.stringify(query);
  const req = newQuery ? `?${decodeURIComponent(newQuery)}` : "";
  return (dispatch) => {
    dispatch(loadingAction(true, ""));
    const options = {
      method: "GET",
      url: `${BASIC_URL}/pokemon${req}`,
      headers: {},
    };

    axios(options)
      .then((res) => {
        const { status, data } = res;
        const { results, next, previous,count } = data;
        dispatch(loadingAction(false, ""));

        if (status === 200) {
          dispatch(successAction(results, 'Results'));
          dispatch(successAction(next, 'Next'));
          dispatch(successAction(previous, 'Previous'));
          dispatch(successAction(count, 'Count'));
        }
      })
      .catch((err) => {
        //toasterError(messageStatus)
        //dispatch(failedAction(messageStatus));
        dispatch(loadingAction(false, ""));
      });
  };
}

export function resetMessage() {
  return failedAction("");
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
