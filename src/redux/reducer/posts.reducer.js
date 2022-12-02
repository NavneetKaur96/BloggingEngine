import {
  GET_ALL_POSTS,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAILURE,
  GET_ALL_CATEGORIES,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_FAILURE,
  CHANGE_CATEGORY,
  CREATE_POST,
  SINGLE_POST_DETAILS,
  UPDATE_CLAPS_COUNT,
  UPDATE_POST_DETAILS,
  DELETE_POST
 

} from "../action.types";

const initlaCategory=localStorage.getItem('categories')
const initialState = {
  posts:[],
  loading: false,
  errorPosts: null,
  categories:initlaCategory?JSON.parse(initlaCategory):[],

  errorCategories: null,
  selectedCategory:'All Blogs',
  postCreated:null,
  post:null,
  postUpdated:null,
  postDeleted:null

};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case GET_ALL_POSTS_FAILURE:
      return {
        ...state,
        errorPosts: action.payload,
        loading: false,
      };
      case GET_ALL_CATEGORIES:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_CATEGORIES_SUCCESS:
      {
        localStorage.setItem('categories',JSON.stringify(action.payload))
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    }
    case GET_ALL_CATEGORIES_FAILURE:
      return {
        ...state,
        errorCategories: action.payload,
        loading: false,
      };
      case CHANGE_CATEGORY:
        return {
          ...state,
         selectedCategory: action.payload,
         
        };
        case CREATE_POST:
          return {
            ...state,
            postCreated: action.payload,
           
          };
case SINGLE_POST_DETAILS:
  {
    console.log("from post reducer")
    console.log(action.payload)
  return {
    ...state,
post:action.payload
  }}
    case UPDATE_CLAPS_COUNT:
    return {
...state,
post:action.payload

    }
    case UPDATE_POST_DETAILS:
      return {
        ...state,
        post:action.payload,
        postUpdated:action.payload
      }
       case DELETE_POST:
        return {
          ...state,
          postDeleted:action.payload
        }
    default:
      return state;
  }
};
