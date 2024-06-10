import {
  LOAD_ADVERTS_REQUEST,
  LOAD_ADVERTS_SUCCESS,
  LOAD_ADVERTS_FAILURE,
  ADD_ADVERT,
  REMOVE_ADVERT,
  UPDATE_ADVERT_REQUEST,
  UPDATE_ADVERT_SUCCESS,
  UPDATE_ADVERT_FAILURE,
} from "../actions/advertsActions";

const initialState = {
  adverts: [],
  isLoading: false,
  error: null,
};

const advertsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ADVERTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case LOAD_ADVERTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        adverts: action.payload,
      };
    case LOAD_ADVERTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case ADD_ADVERT:
      return {
        ...state,
        adverts: [...state.adverts, action.payload],
      };
    case REMOVE_ADVERT:
      return {
        ...state,
        adverts: state.adverts.filter((advert) => advert.id !== action.payload),
      };
    case UPDATE_ADVERT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case UPDATE_ADVERT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        adverts: state.adverts.map((advert) =>
          advert.id === action.payload.id ? action.payload : advert,
        ),
      };
    case UPDATE_ADVERT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default advertsReducer;
