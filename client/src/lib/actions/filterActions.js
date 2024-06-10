export const SET_SALARY_RANGE = "SET_PRICE_RANGE";
export const SET_JOB_TYPE = "SET_JOB_TYPE";
export const SET_CITY = "SET_CITY";
export const SET_HOME_OFFICE = "SET_HOME_OFFICE";
export const RESET_FILTERS = "RESET_FILTERS";

export const setSalaryRange = (min, max) => ({
  type: SET_SALARY_RANGE,
  payload: { min, max },
});

export const setJobType = (jobType) => ({
  type: SET_JOB_TYPE,
  payload: jobType,
});

export const setCity = (city) => ({
  type: SET_CITY,
  payload: city,
});

export const setHomeOffice = (homeOffice) => ({
  type: SET_HOME_OFFICE,
  payload: homeOffice,
});

export const resetFilters = () => ({
  type: RESET_FILTERS,
});
