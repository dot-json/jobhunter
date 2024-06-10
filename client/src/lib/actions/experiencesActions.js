import axios from "axios";
import Cookies from "js-cookie";
import { notify } from "../../lib/utils";

export const LOAD_EXPERIENCES_REQUEST = "LOAD_EXPERIENCES_REQUEST";
export const LOAD_EXPERIENCES_SUCCESS = "LOAD_EXPERIENCES_SUCCESS";
export const LOAD_EXPERIENCES_FAILURE = "LOAD_EXPERIENCES_FAILURE";

export const ADD_EXPERIENCE_REQUEST = "ADD_EXPERIENCE_REQUEST";
export const ADD_EXPERIENCE_SUCCESS = "ADD_EXPERIENCE_SUCCESS";
export const ADD_EXPERIENCE_FAILURE = "ADD_EXPERIENCE_FAILURE";

export const MODIFY_EXPERIENCE_REQUEST = "MODIFY_EXPERIENCE_REQUEST";
export const MODIFY_EXPERIENCE_SUCCESS = "MODIFY_EXPERIENCE_SUCCESS";
export const MODIFY_EXPERIENCE_FAILURE = "MODIFY_EXPERIENCE_FAILURE";

export const REMOVE_EXPERIENCE_REQUEST = "REMOVE_EXPERIENCE_REQUEST";
export const REMOVE_EXPERIENCE_SUCCESS = "REMOVE_EXPERIENCE_SUCCESS";
export const REMOVE_EXPERIENCE_FAILURE = "REMOVE_EXPERIENCE_FAILURE";

export const loadExperiencesRequest = () => ({
  type: LOAD_EXPERIENCES_REQUEST,
});

export const loadExperiencesSuccess = (experiences) => ({
  type: LOAD_EXPERIENCES_SUCCESS,
  payload: experiences,
});

export const loadExperiencesFailure = (error) => ({
  type: LOAD_EXPERIENCES_FAILURE,
  payload: error,
});

export const addExperienceRequest = () => ({
  type: ADD_EXPERIENCE_REQUEST,
});

export const addExperienceSuccess = (experience) => ({
  type: ADD_EXPERIENCE_SUCCESS,
  payload: experience,
});

export const addExperienceFailure = (error) => ({
  type: ADD_EXPERIENCE_FAILURE,
  payload: error,
});

export const modifyExperienceRequest = () => ({
  type: MODIFY_EXPERIENCE_REQUEST,
});

export const modifyExperienceSuccess = (experience) => ({
  type: MODIFY_EXPERIENCE_SUCCESS,
  payload: experience,
});

export const modifyExperienceFailure = (error) => ({
  type: MODIFY_EXPERIENCE_FAILURE,
  payload: error,
});

export const removeExperienceRequest = () => ({
  type: REMOVE_EXPERIENCE_REQUEST,
});

export const removeExperienceSuccess = (id) => ({
  type: REMOVE_EXPERIENCE_SUCCESS,
  payload: id,
});

export const removeExperienceFailure = (error) => ({
  type: REMOVE_EXPERIENCE_FAILURE,
  payload: error,
});

export const loadExperiences = () => {
  return async (dispatch) => {
    dispatch(loadExperiencesRequest());
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/experiences`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        },
      );
      console.log(response.data.data);
      dispatch(loadExperiencesSuccess(response.data.data));
    } catch (error) {
      dispatch(loadExperiencesFailure(error.message));
      notify(error.message, "error");
    }
  };
};

export const createExperience = (experience) => {
  return async (dispatch) => {
    dispatch(addExperienceRequest());
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/experiences`,
        experience,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        },
      );
      dispatch(addExperienceSuccess(response.data));
      notify("Tapasztalat hozzáadva", "success");
    } catch (error) {
      dispatch(addExperienceFailure(error.message));
      notify(error.message, "error");
    }
  };
};

export const updateExperience = (experience) => {
  return async (dispatch) => {
    dispatch(modifyExperienceRequest());
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/experiences/${experience.id}`,
        {
          company: experience.company,
          title: experience.title,
          interval: experience.interval,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        },
      );
      dispatch(modifyExperienceSuccess(response.data));
      notify("Tapasztalat frissítve", "success");
    } catch (error) {
      dispatch(modifyExperienceFailure(error.message));
      notify(error.message, "error");
    }
  };
};

export const deleteExperience = (id) => {
  return async (dispatch) => {
    dispatch(removeExperienceRequest());
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/experiences/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      dispatch(removeExperienceSuccess(id));
      notify("Tapasztalat törölve", "success");
    } catch (error) {
      dispatch(removeExperienceFailure(error.message));
      notify(error.message, "error");
    }
  };
};
