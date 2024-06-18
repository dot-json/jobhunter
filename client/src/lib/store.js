import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import filterReducer from "./reducers/filterReducer";
import advertsReducer from "./reducers/advertsReducer";
import experiencesReducer from "./reducers/experiencesReducer";
import applicationsReducer from "./reducers/applicationsReducer";

export default configureStore({
  reducer: {
    user: userReducer,
    filters: filterReducer,
    adverts: advertsReducer,
    experiences: experiencesReducer,
    applications: applicationsReducer,
  },
});
