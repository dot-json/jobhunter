import {
  LOAD_EXPERIENCES_REQUEST,
  LOAD_EXPERIENCES_SUCCESS,
  LOAD_EXPERIENCES_FAILURE,
  ADD_EXPERIENCE_REQUEST,
  ADD_EXPERIENCE_SUCCESS,
  ADD_EXPERIENCE_FAILURE,
  MODIFY_EXPERIENCE_REQUEST,
  MODIFY_EXPERIENCE_SUCCESS,
  MODIFY_EXPERIENCE_FAILURE,
  REMOVE_EXPERIENCE_REQUEST,
  REMOVE_EXPERIENCE_SUCCESS,
  REMOVE_EXPERIENCE_FAILURE,
} from "../actions/experiencesActions";

const initialState = {
  experiences: [],
  isLoading: false,
  error: null,
};

const experienceReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_EXPERIENCES_REQUEST:
    case ADD_EXPERIENCE_REQUEST:
    case MODIFY_EXPERIENCE_REQUEST:
    case REMOVE_EXPERIENCE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case LOAD_EXPERIENCES_SUCCESS:
      return {
        ...state,
        experiences: action.payload,
        isLoading: false,
      };
    case ADD_EXPERIENCE_SUCCESS:
      return {
        ...state,
        experiences: [...state.experiences, action.payload],
        isLoading: false,
      };
    case MODIFY_EXPERIENCE_SUCCESS:
      return {
        ...state,
        experiences: state.experiences.map((experience) =>
          experience.id === action.payload.id ? action.payload : experience,
        ),
        isLoading: false,
      };
    case REMOVE_EXPERIENCE_SUCCESS:
      return {
        ...state,
        experiences: state.experiences.filter(
          (experience) => experience.id !== action.payload,
        ),
        isLoading: false,
      };
    case LOAD_EXPERIENCES_FAILURE:
    case ADD_EXPERIENCE_FAILURE:
    case MODIFY_EXPERIENCE_FAILURE:
    case REMOVE_EXPERIENCE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default experienceReducer;
