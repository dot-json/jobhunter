import {
  LOAD_APPLICATIONS_REQUEST,
  LOAD_APPLICATIONS_SUCCESS,
  LOAD_APPLICATIONS_FAILURE,
  LOAD_APPLICANTS_REQUEST,
  LOAD_APPLICANTS_SUCCESS,
  LOAD_APPLICANTS_FAILURE,
  APPLY_REQUEST,
  APPLY_SUCCESS,
  APPLY_FAILURE,
  DELETE_APPLICATION_REQUEST,
  DELETE_APPLICATION_SUCCESS,
  DELETE_APPLICATION_FAILURE,
} from "../actions/applicationsActions";

const initialState = {
  applications: [],
  applicants: [],
  isLoading: false,
  error: null,
};

const applicationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_APPLICATIONS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case LOAD_APPLICATIONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        applications: action.payload,
      };
    case LOAD_APPLICATIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case LOAD_APPLICANTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case LOAD_APPLICANTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        applicants: action.payload,
      };
    case LOAD_APPLICANTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case APPLY_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case APPLY_SUCCESS:
      return {
        ...state,
        applications: [...state.applications, action.payload],
        isLoading: false,
      };
    case APPLY_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case DELETE_APPLICATION_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case DELETE_APPLICATION_SUCCESS:
      const index = state.applications.findIndex(
        (application) => application.jobId === action.payload,
      );
      return {
        ...state,
        applications: [
          ...state.applications.slice(0, index),
          ...state.applications.slice(index + 1),
        ],
        isLoading: false,
      };
    case DELETE_APPLICATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default applicationsReducer;
