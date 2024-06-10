import axios from "axios";
import Cookies from "js-cookie";
import { notify } from "../utils";

export const LOAD_ADVERTS_REQUEST = "LOAD_ADVERTS_REQUEST";
export const LOAD_ADVERTS_SUCCESS = "LOAD_ADVERTS_SUCCESS";
export const LOAD_ADVERTS_FAILURE = "LOAD_ADVERTS_FAILURE";

export const ADD_ADVERT = "ADD_ADVERT";
export const REMOVE_ADVERT = "REMOVE_ADVERT";

export const UPDATE_ADVERT_REQUEST = "UPDATE_ADVERT_REQUEST";
export const UPDATE_ADVERT_SUCCESS = "UPDATE_ADVERT_SUCCESS";
export const UPDATE_ADVERT_FAILURE = "UPDATE_ADVERT_FAILURE";

export const loadAdvertsRequest = () => ({
  type: LOAD_ADVERTS_REQUEST,
});

export const loadAdvertsSuccess = (adverts) => ({
  type: LOAD_ADVERTS_SUCCESS,
  payload: adverts,
});

export const loadAdvertsFailure = (error) => ({
  type: LOAD_ADVERTS_FAILURE,
  payload: error,
});

export const addAdvert = (advert) => ({
  type: ADD_ADVERT,
  payload: advert,
});

export const removeAdvert = (id) => ({
  type: REMOVE_ADVERT,
  payload: id,
});

export const updateAdvertRequest = () => ({
  type: UPDATE_ADVERT_REQUEST,
});

export const updateAdvertSuccess = (advert) => ({
  type: UPDATE_ADVERT_SUCCESS,
  payload: advert,
});

export const updateAdvertFailure = (error) => ({
  type: UPDATE_ADVERT_FAILURE,
  payload: error,
});

export const loadAdverts = () => {
  return async (dispatch) => {
    dispatch(loadAdvertsRequest());
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/jobs`);
      dispatch(loadAdvertsSuccess(response.data.data));
    } catch (error) {
      dispatch(loadAdvertsFailure(error.message));
      notify(error.message, "error");
    }
  };
};

export const createAdvert = (advert) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/jobs`,
        {
          company: advert.company,
          position: advert.position,
          description: advert.description,
          salaryFrom: parseInt(advert.salaryFrom),
          salaryTo: parseInt(advert.salaryTo),
          type: advert.type,
          city: advert.city,
          homeOffice: advert.homeOffice ? true : false,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        },
      );
      dispatch(addAdvert(response.data));
      notify("Sikeres feladás", "success");
    } catch (error) {
      notify(error.message, "error");
    }
  };
};

export const deleteAdvert = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      dispatch(removeAdvert(id));
      notify("Hirdetés törölve", "success");
    } catch (error) {
      notify(error.message, "error");
    }
  };
};

export const updateAdvert = (advert) => {
  return async (dispatch) => {
    dispatch(updateAdvertRequest());
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/jobs/${advert.id}`,
        {
          company: advert.company,
          position: advert.position,
          description: advert.description,
          salaryFrom: parseInt(advert.salaryFrom),
          salaryTo: parseInt(advert.salaryTo),
          type: advert.type,
          city: advert.city,
          homeOffice: advert.homeOffice ? true : false,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        },
      );
      dispatch(updateAdvertSuccess(response.data));
      notify("Hirdetés frissítve", "success");
    } catch (error) {
      dispatch(updateAdvertFailure(error.message));
      notify(error.message, "error");
    }
  };
};
