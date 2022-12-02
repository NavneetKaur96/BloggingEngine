import {
  GET_ALL_POSTS,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAILURE,
  GET_ALL_CATEGORIES,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_CATEGORIES_FAILURE,
  GET_ALL_USERS,
  USER_SIGNUP,
  FIND_USER,
  AUTHENTICATE_USER,
  UPDATE_USER,
  CREATE_POST,
  SINGLE_POST_DETAILS,
  UPDATE_CLAPS_COUNT,
  UPDATE_POST_DETAILS,
  DELETE_POST,
  ADD_COMMENT,
  GET_COMMENTS,
  DELETE_COMMENT,
  EDIT_COMMENT
} from "../action.types";
import axios from "axios";



export const getAllPosts = (url,category='All Blogs',userId=null) => async (dispatch) => {
  const order='?_sort=creationDate&_order=desc'
 let newUrl=`${url}${order}`;
 if(category!='All Blogs' && !userId){
  newUrl=`${url}?categoryId=${category}&_sort=creationDate&_order=desc`;
 }
 if(category==='All Blogs' && userId){
  newUrl=`${url}?userId=${userId}&_sort=creationDate&_order=desc`;
 }

  dispatch({
    type: GET_ALL_POSTS,
  });
  axios
    .get(newUrl)
    .then((response) => {
      console.log(response);
      dispatch({ type: GET_ALL_POSTS_SUCCESS, payload: response.data });
    })
    .catch((e) => {
      console.log(e)
      dispatch({ type: GET_ALL_POSTS_FAILURE, payload: e.message });
    });
};
export const getAllUsers = (url) => async (dispatch) => {
  
 
  axios
    .get(url)
    .then((response) => {
    console.log(response)
      dispatch({ type: GET_ALL_USERS, payload: response.data });
    })
    .catch((e) => {
      console.log(e)
      
    });
};
export const updateUser=(url,id,data)=>async (dispatch)=>{
  axios
    .patch(`${url}/${id}`,data)
    .then((response) => {
    console.log(response)
      dispatch({ type: UPDATE_USER, payload: response.data });
    })
    .catch((e) => {
      console.log(e)
      
    });

}
export const addComment=(url,data)=>async (dispatch)=>{
  axios
    .post(url,data)
    .then((response) => {
    console.log(response)
      dispatch({ type: ADD_COMMENT, payload: response.data });
    })
    .catch((e) => {
      console.log(e)
      
    });

}
export const getComments=(url,id)=>async (dispatch)=>{
  const order='&_sort=creationDate&_order=desc'
  axios
    .get(`${url}?postId=${id}${order}`)
    .then((response) => {
    console.log(response)
      dispatch({ type: GET_COMMENTS, payload: response.data });
    })
    .catch((e) => {
      console.log(e)
      
    });

}
export const deleteComment=(url,id)=>async(dispatch)=>{
  
  axios
    .delete(`${url}/${id}`)
    .then((response) => {
    console.log(response)
      dispatch({ type: DELETE_COMMENT, payload: response.data });
    })
    .catch((e) => {
      console.log(e)
      
    });

}
export const editComment=(url,id,body)=>async(dispatch)=>{
  
  axios
    .put(`${url}/${id}`,body)
    .then((response) => {
    console.log(response)
      dispatch({ type: EDIT_COMMENT, payload: response.data });
    })
    .catch((e) => {
      console.log(e)
      
    });

}
export const patchPostDetails=(url,body)=>async (dispatch) => {
  
 
  axios
    .patch(url,body)
    .then((response) => {
    console.log(response)
   
      dispatch({ type: UPDATE_CLAPS_COUNT, payload: response.data });
     
    })
    .catch((e) => {
      console.log(e)
      
    });
};
export const deletePost=(url,id)=>async (dispatch) => {
  
 
  axios
    .delete(`${url}/${id}`)
    .then((response) => {
    console.log(response)
   
      dispatch({ type: DELETE_POST, payload: response.data });
     
    })
    .catch((e) => {
      console.log(e)
      
    });
};
export const updatePostDetails=(url,id,body)=>async (dispatch) => {
  
 
  axios
    .put(`${url}/${id}`,body)
    .then((response) => {
    console.log(response)
   
      dispatch({ type: UPDATE_POST_DETAILS, payload: response.data });
     
    })
    .catch((e) => {
      console.log(e)
      
    });
};
export const findUser=(url,paramterName,paramterVal) => async (dispatch) => {
  
 
  axios
    .get(`${url}?${paramterName}=${paramterVal}`)
    .then((response) => {
    console.log(response)
   
      dispatch({ type: FIND_USER, payload: response.data });
     
    })
    .catch((e) => {
      console.log(e)
      
    });
};
export const getPostDetails=(url,id) => async (dispatch) => {
  
 console.log(`${url}/${id}`)
  axios
    .get(`${url}/${id}`)
    .then((response) => {
    console.log(response)
   
      dispatch({ type: SINGLE_POST_DETAILS, payload: response.data });
     
    })
    .catch((e) => {
      console.log(e)
      
    });
};
export const authenticateUser=(url,body) => async (dispatch) => {
  
 console.log(body)

  axios
    .get(`${url}?email=${body.email}&&password=${body.password}`)
    .then((response) => {
    console.log(response)
   
      dispatch({ type: AUTHENTICATE_USER, payload: response.data });
     
    })
    .catch((e) => {
      console.log(e)
      
    });
};
export const registerUser = (url,body) => async (dispatch) => {
  
 
  axios
    .post(url,body)
    .then((response) => {
    console.log(response)
      dispatch({ type: USER_SIGNUP, payload: response.data });
    })
    .catch((e) => {
      console.log(e)
      
    });
};
export const createPost = (url,body) => async (dispatch) => {
  
 
  axios
    .post(url,body)
    .then((response) => {
    console.log(response)
      dispatch({ type: CREATE_POST, payload: response.data });
    })
    .catch((e) => {
      console.log(e)
      
    });
};
export const getAllCategories = (url) => async (dispatch) => {
  dispatch({
    type: GET_ALL_CATEGORIES,
  });
  axios
    .get(url)
    .then((response) => {
      console.log(response);
      dispatch({ type: GET_ALL_CATEGORIES_SUCCESS, payload: response.data });
    })
    .catch((e) => {
      console.log(e)
      dispatch({ type: GET_ALL_CATEGORIES_FAILURE, payload: e.message });
    });
};
