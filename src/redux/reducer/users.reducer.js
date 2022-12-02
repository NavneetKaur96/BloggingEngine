import { GET_ALL_USERS,USER_SIGNUP,FIND_USER, AUTHENTICATE_USER,UPDATE_USER,CLEAR_ERROR} from "../action.types";


const initialUsers=localStorage.getItem('Users')
const initialState = {
    users:initialUsers?JSON.parse(initialUsers):[],
    user:null,
    error:null,
    userRegistered:null,
    searchUser:null,
    userUpdated:null
  
  };

  export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_USERS:
        {
          let arr=action.payload;
          arr= arr.map(({password,confirmPassword, ...rest}) => rest)
localStorage.setItem('Users',JSON.stringify(arr))
        return {
          ...state,
          users:action.payload,
        };}
        case USER_SIGNUP:
          return {
            ...state,
            userRegistered:action.payload,
          };
          case FIND_USER:
        //     if(action.payload && action.payload.length>0){
        //       console.log("length >0")
           

        //   return {
        //     ...state,
        //     user:action.payload[0],
        //   };
        // }
        
          return {
            ...state,
            searchUser:action.payload,
            error:action.payload!==null && action.payload.length>0?'User is already registered':null
          }
          case AUTHENTICATE_USER:
            if(action.payload.length>0)
            
          {
            
            
         
            return {
              ...state,
              user:action.payload[0],
              error:null
              
            }
          }
         
            return {
              ...state,
              user:null,
              error:'Invalid username or password'
            
            }

          ;
          case UPDATE_USER:
            return {
              ...state,
              userUpdated:action.payload,
              user:action.payload
            }
      case CLEAR_ERROR:
        return {...state,error:null}
      default:
        return state;
    }
  };
  