import React, { useEffect,useContext } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts,getAllCategories, deletePost } from '../../redux/actions/posts.action';
import PostItem from '../../components/posts/PostItem';
import '../../components/posts/Posts.css';
import AuthContext from '../../context/auth-context';
import { faEdit,faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import swal from 'sweetalert'
import '../MyStory/MyStory.css'
import { DELETE_POST } from '../../redux/action.types';
export default function MyStory() {
  const dispatch = useDispatch();
  const { categories,posts,postDeleted } = useSelector((state) => state.posts);
  const authCtx= useContext(AuthContext);

  const User=authCtx.loggedUser
useEffect(()=>{

  dispatch(
    getAllPosts(
     process.env.REACT_APP_POSTS_API_URL,'All Blogs',User.id
    )
   
  )
  dispatch(
    getAllCategories(process.env.REACT_APP_CATEGORIES_API_URL)
   );
},[])
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
      dispatch(deletePost(process.env.REACT_APP_POSTS_API_URL,id))
      // swal("Post has been deleted", {
      //   icon: "success",
      // });
    }
  });
 
}
useEffect(()=>{
  if(postDeleted!=null){
    swal("Post has been deleted", {
        icon: "success",
        closeOnClickOutside: false,
      }).then(res=>{


        dispatch({
          type:DELETE_POST,
          payload:null
        })
        dispatch(
          getAllPosts(
           process.env.REACT_APP_POSTS_API_URL,'All Blogs',User.id
          )
         
        )
      });
  }

},[postDeleted])
  return (
    <section className="container-fluid articles">
     
    <div className="container">
        
    <div className="mt-5 pt-5">
      
{posts.length===0 && <p className="text-center" style={{"margin-top":"20%"}}>No Blog Found</p>}
    {posts.length>0 && posts.map(post=>{
   return <div className="d-flex gap-5 border-bottom pt-3" key={post.id}><PostItem key={post.id} post={post} user={User} categories={categories}/><div className="d-flex justify-content-center gap-5 pt-5 px-5"><a href="#" className="expand_collapse text-dark" aria-hidden="true" onClick={()=>{handleDelete(post.id)}}  ><FontAwesomeIcon icon={faTrashCan} aria-label="delete icon"  className="fs-6 pt-4  cursor-pointer" /></a>
   <Link to={`/editpost/${post.id}`}><FontAwesomeIcon icon={faEdit}  aria-label="edit icon" className="fs-6 pt-4 text-dark" /></Link></div>
   </div>})}
   
  </div>
  
            </div>
            </section>
  )
}
