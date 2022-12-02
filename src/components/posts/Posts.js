import React, { useEffect,useContext} from 'react';
import AuthContext from '../../context/auth-context';
import CategoryList from './CategoryList';
import './Posts.css'
import { useDispatch, useSelector } from "react-redux";
import PostList from './PostList';
import { getAllPosts, getAllUsers,getAllCategories } from '../../redux/actions/posts.action';

export default function Posts() {
  const { posts,selectedCategory} = useSelector((state) => state.posts);
  const { categories } = useSelector((state) => state.posts);
  const { users} = useSelector((state) => {
  
    
    return state.users});
    const authCtx= useContext(AuthContext);
  
  const dispatch = useDispatch();

  
  

  useEffect(()=>{
    dispatch(
      getAllPosts(
       process.env.REACT_APP_POSTS_API_URL,selectedCategory
      )
     
    );
  },[dispatch,selectedCategory])
  useEffect(()=>{
     
     
    dispatch(getAllUsers(process.env.REACT_APP_USERS_API_URL));
    dispatch(
      getAllCategories(process.env.REACT_APP_CATEGORIES_API_URL)
     );
   
  },[]);
 
 
  return (
    <div  className={` container  ${authCtx.isLoggedIn?'marginTop':''}`}>
    <div class="row mt-5"> 
    <section class="col-sm-8 order-2 order-lg-1">
        {posts.length>0?<PostList posts={posts} users={users} categories={categories}/>:<div className="text-center" style={{"margin-top":"25%"}}>No blog found for this category</div>}
        </section>
        <div class="col-sm-4 position-relative order-1 order-lg-2">
            <CategoryList categories={categories}/>
            </div>
            </div>
            </div>
          
  )
}
