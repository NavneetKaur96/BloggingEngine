import React, { useEffect, useState,useContext } from 'react';
import {format} from 'date-fns';
import { fullName,readMore,findData} from '../../utilities/utils';
import { useParams } from "react-router-dom";
import { getComments, getPostDetails } from '../../redux/actions/posts.action';
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment,faHandsClapping} from '@fortawesome/free-solid-svg-icons';
import { patchPostDetails } from '../../redux/actions/posts.action';
import UserImage from '../../Icons/userImage.png';
import Comments from '../../components/Comments/Comments';
import AuthContext from '../../context/auth-context';
import Login from '../../components/Login/Login';
export default function ViewPost() {
    let { id } = useParams();
    const dispatch = useDispatch();
    const {post,categories} = useSelector((state) => state.posts);
    const {comments,comment} = useSelector((state) => state.comments);
    const {users} = useSelector((state) => state.users);
    const [showLogin, setShowLogin] = useState(false);
  
const [show,setShow]=useState(false);
const user=findData(post?.userId,users);
const authCtx= useContext(AuthContext);
const isLoggedIn=authCtx.isLoggedIn;
const userLogged=authCtx.loggedUser;
const handleCloseLogin=()=>{
    setShowLogin(false)
}
useEffect(()=>{
  
    dispatch(getPostDetails(process.env.REACT_APP_POSTS_API_URL,id))
    dispatch(getComments(process.env.REACT_APP_COMMENTS_API_URL,id))
},[id])
useEffect(()=>{
if(comment!=null)
    dispatch(getComments(process.env.REACT_APP_COMMENTS_API_URL,id))
},[comment])
const handleClaps=()=>{
    if(isLoggedIn){
    let claps=post.clapsCount.slice();
   console.log(claps.includes(userLogged?.id))
    if(claps.includes(userLogged.id)){

       
        
        claps.pop(userLogged.id)
    }
    else{
        claps.push(userLogged.id)
    }
   
    
    dispatch(patchPostDetails(`${process.env.REACT_APP_POSTS_API_URL}/${id}`,{"clapsCount":claps}))
}
else{
    setShowLogin(true)
}
}
const handleComments=async ()=>{
    


setShow(!show);
}
  return (
   <div className="mt-5 pt-5 px-3">
        { post &&  <div className="card border border-0 " >
        <div className="card-header d-flex border border-0 text-bg-dark">
   <img className="rounded-circle me-4" src={UserImage} alt="user profile display" style={{"width":"50px","height":"50px"}}/> <div><h6 className='pb-0 mb-0'>{fullName(user?.firstName,user?.lastName)}</h6>
   {user?.about && <div className="fst-italic pt-0 mt-0">{user?.about}</div>}
   <span>{format(new Date(post?.creationDate),"MMM d, Y")} · {post?.readingTime} · {findData(+post?.categoryId,categories)?.name}</span>
   </div>

  </div>
  <div className="card-body d-flex flex-column  overflow-auto" style={{"height":"370px"}}>

    <h3 className="card-title">{post?.title}</h3>
    <p className="card-text" dangerouslySetInnerHTML={{__html:post?.content}}></p>
    
  </div>
  <div className='card-footer text-bg-dark d-flex justify-content-center'>
    
  <a href="#" className="expand_collapse text-light" aria-hidden="true" onClick={handleClaps} ><FontAwesomeIcon icon={faHandsClapping}  className={`fs-4  cursor-pointer ${post?.clapsCount.includes(userLogged?.id)?'text-warning':'text-light'}`} /></a><span className="ms-2" >{post.clapsCount.length}</span>
  <a href="#" className="expand_collapse text-light" aria-hidden="true" onClick={handleComments}><FontAwesomeIcon icon={faComment}  className="fs-4 ms-5 cursor-pointer"  /></a><span className="ms-2">{comments?.length}</span>
  </div>
 {show &&  <Comments user={user} id={post?.id}/>}
</div>}
<Login showLogin={showLogin} handleCloseLogin={handleCloseLogin}/>
    </div>
  )
}
