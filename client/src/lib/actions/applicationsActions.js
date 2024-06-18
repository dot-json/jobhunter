import axios from "axios";
import Cookies from "js-cookie";
import { notify } from "../utils";

export const LOAD_APPLICATIONS_REQUEST = "LOAD_APPLICATIONS_REQUEST";
export const LOAD_APPLICATIONS_SUCCESS = "LOAD_APPLICATIONS_SUCCESS";
export const LOAD_APPLICATIONS_FAILURE = "LOAD_APPLICATIONS_FAILURE";

export const LOAD_APPLICANTS_REQUEST = "LOAD_APPLICANTS_REQUEST";
export const LOAD_APPLICANTS_SUCCESS = "LOAD_APPLICANTS_SUCCESS";
export const LOAD_APPLICANTS_FAILURE = "LOAD_APPLICANTS_FAILURE";

export const APPLY_REQUEST = "APPLY_REQUEST";
export const APPLY_SUCCESS = "APPLY_SUCCESS";
export const APPLY_FAILURE = "APPLY_FAILURE";

export const DELETE_APPLICATION_REQUEST = "DELETE_APPLICATION_REQUEST";
export const DELETE_APPLICATION_SUCCESS = "DELETE_APPLICATION_SUCCESS";
export const DELETE_APPLICATION_FAILURE = "DELETE_APPLICATION_FAILURE";

export const loadApplicationsRequest = () => ({
  type: LOAD_APPLICATIONS_REQUEST,
});

export const loadApplicationsSuccess = (applications) => ({
  type: LOAD_APPLICATIONS_SUCCESS,
  payload: applications,
});

export const loadApplicationsFailure = (error) => ({
  type: LOAD_APPLICATIONS_FAILURE,
  payload: error,
});

export const loadApplicantsRequest = () => ({
  type: LOAD_APPLICANTS_REQUEST,
});

export const loadApplicantsSuccess = (applicants) => ({
  type: LOAD_APPLICANTS_SUCCESS,
  payload: applicants,
});

export const loadApplicantsFailure = (error) => ({
  type: LOAD_APPLICANTS_FAILURE,
  payload: error,
});

export const applyRequest = () => ({
  type: APPLY_REQUEST,
});

export const applySuccess = (job) => ({
  type: APPLY_SUCCESS,
  payload: job,
});

export const applyFailure = (error) => ({
  type: APPLY_FAILURE,
  payload: error,
});

export const deleteApplicationRequest = () => ({
  type: DELETE_APPLICATION_REQUEST,
});

export const deleteApplicationSuccess = (jobId) => ({
  type: DELETE_APPLICATION_SUCCESS,
  payload: jobId,
});

export const deleteApplicationFailure = (error) => ({
  type: DELETE_APPLICATION_FAILURE,
  payload: error,
});

export const loadApplications = () => {
  return async (dispatch) => {
    dispatch(loadApplicationsRequest());
    try {
      const user_id = JSON.parse(Cookies.get("user")).id;
      if (!user_id) {
        return;
      }
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/applicants?userId=${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        },
      );
      dispatch(loadApplicationsSuccess(response.data));
    } catch (error) {
      dispatch(loadApplicationsFailure(error.message));
    }
  };
};

export const loadApplicants = (jobId) => {
  return async (dispatch) => {
    dispatch(loadApplicantsRequest());
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/applicants?jobId=${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        },
      );
      dispatch(loadApplicantsSuccess(response.data));
    } catch (error) {
      dispatch(loadApplicantsFailure(error.message));
    }
  };
};

export const apply = (jobId) => {
  return async (dispatch) => {
    dispatch(applyRequest());
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/applicants`,
        {
          jobId: jobId,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        },
      );
      dispatch(applySuccess(res.data[0]));
      notify("Application sent successfully", "success");
    } catch (error) {
      dispatch(applyFailure(error.message));
      notify(error.message, "error");
    }
  };
};

export const deleteApplication = (jobId) => {
  return async (dispatch) => {
    dispatch(deleteApplicationRequest());
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/applicants?jobId=${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        },
      );
      dispatch(deleteApplicationSuccess(jobId));
      notify("Application deleted", "success");
    } catch (error) {
      dispatch(deleteApplicationFailure(error.message));
      notify(error.message, "error");
    }
  };
};
