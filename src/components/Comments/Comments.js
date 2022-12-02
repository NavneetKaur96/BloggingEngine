import React, { useState,useContext,useEffect } from 'react'
import UserImage from '../../Icons/userImage.png';
import { fullName } from '../../utilities/utils';
import {format} from 'date-fns';
import { useDispatch,useSelector} from "react-redux";
import { addComment, deleteComment, editComment, getComments } from '../../redux/actions/posts.action';
import AuthContext from '../../context/auth-context';
import { faEdit,faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Login from '../Login/Login';
import swal from 'sweetalert'
import { DELETE_COMMENT } from '../../redux/action.types';
import '../../pages/MyStory/MyStory.css'
export default function Comments({id}) {
    const dispatch = useDispatch();
    const [showLogin, setShowLogin] = useState(false);
    const [edit,setEdit]=useState(false)
    const [value,setValue]=useState("");
    const [error,setError]=useState(false);
    const {comments,commentDeleted,commentUpdated} = useSelector((state) => state.comments);
    const [comment,setComment]=useState(null)
    const authCtx= useContext(AuthContext);
    const user=authCtx.loggedUser;
    const isLoggedIn=authCtx.isLoggedIn;

    const handleCloseLogin=()=>{
      setShowLogin(false)
  }
    const handleSubmit=(e)=>{
      e.preventDefault();
      if(isLoggedIn){
       
        if(value){
          if(edit){

          let updatedBody={...comment,
            "creationDate": new Date(),
            "body":value,
          }
          dispatch(editComment(process.env.REACT_APP_COMMENTS_API_URL,comment.id,updatedBody))


          }
          else{
        let body={
            
              
                "body": value,
                "postId": id,
                "user": user,
                "creationDate": new Date()
              
        }

setValue("");
dispatch(addComment(process.env.REACT_APP_COMMENTS_API_URL,body))}
        }
        else{
setError(true)
        }
      }
      else{
        setShowLogin(true)
      }
    }
    const handleDelete=(id)=>{
      swal({
        text: "Are you sure to delete post?",
        closeOnClickOutside: false,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          dispatch(deleteComment(process.env.REACT_APP_COMMENTS_API_URL,id))
          // swal("Post has been deleted", {
          //   icon: "success",
          // });
        }
      });
     
    }
  const handleEdit=(comment)=>{
    setValue(comment.body);
    setComment(comment)
    setEdit(!edit)
    }
    useEffect(()=>{
      if(commentDeleted!=null){
        swal("Comment has been deleted", {
            icon: "success",
            closeOnClickOutside: false,
          }).then(res=>{
    
    
            dispatch({
              type:DELETE_COMMENT,
              payload:null
            })
            dispatch(
              dispatch(getComments(process.env.REACT_APP_COMMENTS_API_URL,id))
             
            )
          });
      }
    
    },[commentDeleted])
    useEffect(()=>{
      if(commentUpdated!=null){
        setEdit(false);
setValue('');
          setComment(null)
          
            dispatch(getComments(process.env.REACT_APP_COMMENTS_API_URL,id))
           
          
      }
     
    },[commentUpdated])
  return (
   <div class="mt-3">
    <form>
  <div class="mb-3 d-flex gap-5">
   
    <input type="text" class="form-control"  placeholder="Leave a comment here..."  aria-describedby="commentHelp" value={value} onChange={(e)=>{setValue(e.target.value);setError(false)}}/>
    <button type="submit" class="btn btn-dark text-white" onClick={handleSubmit}>{edit?'Update':'Submit'}</button>
  
   
  </div>
  {error ? (
            <p style={{ color: "red" }}>Please enter comment to publish.</p>
          ) : (
            ""
          )}
  </form>



 {comments && comments.map(comment=><div class="card border border-1 mb-3" key={comment.id} data-testid="card">
  <div class="card-header d-flex border border-0">
  <img src={UserImage} className="rounded-circle align-self-center" style={{"width":"30px","height":"30px"}} alt="user display" />
          <div className='d-flex flex-column ps-3'>
             <h6 className='text-dark'>{fullName(comment?.user?.firstName,comment?.user?.lastName)}</h6>
             <span className='text-dark'>{format(new Date(comment.creationDate),"MMM d, Y hh:mm aaa")}</span>
            
             </div>
           {isLoggedIn && comment.user.id===user?.id && <> <FontAwesomeIcon icon={faTrashCan}  className="fs-6 ms-auto text-dark cursor-pointer" onClick={()=>{handleDelete(comment.id)}}/>
             <FontAwesomeIcon icon={faEdit}  className="fs-6 ps-3 text-dark cursor-pointer" onClick={()=>{handleEdit(comment)}} /></>}
  </div>
  <div class="card-body">
   
    <p class="card-text">{comment.body}</p>
   
  </div>
</div>)
}
<Login showLogin={showLogin} handleCloseLogin={handleCloseLogin}/>
   </div>
  )
}
