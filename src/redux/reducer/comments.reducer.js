import { ADD_COMMENT, DELETE_COMMENT, GET_COMMENTS,EDIT_COMMENT} from "../action.types";
const initialState = {
   comment:null,
   comments:[],
   commentUpdated:null,
   commentDeleted:null
  
  };
  
  export const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_COMMENT:
        return {
          ...state,
          comment:action.payload,
        };
        case GET_COMMENTS:
            return {
              ...state,
              comments:action.payload,
            };
            case DELETE_COMMENT:
              return {
                ...state,
                commentDeleted:action.payload
              }
              case EDIT_COMMENT:
              return {
                ...state,
                commentUpdated:action.payload
              }
      default:
        return state;
    }
  };
  