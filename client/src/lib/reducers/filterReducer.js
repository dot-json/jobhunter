// src/reducers/filterReducer.js

import {
  SET_SALARY_RANGE,
  SET_JOB_TYPE,
  SET_CITY,
  SET_HOME_OFFICE,
  RESET_FILTERS,
} from "../actions/filterActions";

const initialState = {
  salaryRange: { min: 0, max: 5000000 },
  jobType: "all",
  city: "",
  homeOffice: false,
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SALARY_RANGE:
      return {
        ...state,
        salaryRange: {
          min: parseInt(action.payload.min) || 0,
          max: parseInt(action.payload.max) || 5000000,
        },
      };
    case SET_JOB_TYPE:
      return {
        ...state,
        jobType: action.payload,
      };
    case SET_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case SET_HOME_OFFICE:
      return {
        ...state,
        homeOffice: action.payload,
      };
    case RESET_FILTERS:
      return initialState;
    default:
      return state;
  }
};

export default filterReducer;
