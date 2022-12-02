import React from 'react'
import { fullName,readMore,findData} from '../../utilities/utils';
import {format} from 'date-fns';
import UserImage from '../../Icons/userImage.png';
import { Link } from "react-router-dom";
export default function PostItem({post,user,categories}) {

  return (
  
<article class="row mb-4" key={post.id}> 
                        <div class="col-sm-8">
                          <div className="d-flex">
                        <img src={UserImage} className="rounded-circle align-self-center me-2" alt="user display" width="35" height="30" />
                        <div className='d-flex flex-column justify-content-center'>
             <span className='text-dark'>{fullName(user?.firstName,user?.lastName)}</span>
            {user?.about && <div className="fst-italic fs-6 d-block">{user?.about}</div>}
             </div>
    </div>
    <div className="text-start">
           
           <Link to={`/viewpost/${post.id}`} className="text-decoration-none text-dark"><h5>
             {" "}
             {post.title}
           </h5>
           </Link>
         
         <p className="text-dark">{readMore(post.shortContent,150)}</p>
         
         {/* <p dangerouslySetInnerHTML={{__html:post.content}}>
           
         </p> */}
       </div>
       <div className="text-start d-flex">
         {format(new Date(post.creationDate),"MMM d, Y hh:mm aaa")} · {post?.readingTime} · <span className="badge bg-light text-dark">
           {findData(+post.categoryId,categories)?.name}
         </span>
         
       </div>
                        </div>
                        <div class="col-sm-4 featureImage">
                        <img
             src={post.featureImage}
             alt="blog post feature data"
             width="200" height="150"
           />
                        </div>
                    </article>





  //       <article className="container cursor-pointer" key={post.id} onClick={()=>{navigate(`/viewpost/${post.id}`)}}>
     
  //    <div className="row">
  //      <div className="col-8 col-md-8">
  //        <div className="article-pic d-flex">
           
  //          <img src={UserImage} className="rounded-circle align-self-center" alt="user display" width="35" height="50" />
  //         <div className='d-flex flex-column justify-content-center'>
  //            <span className='text-dark'>{fullName(user?.firstName,user?.lastName)}</span>
  //           {user?.about && <div className="fst-italic fs-6 d-block">{user?.about}</div>}
  //            </div>
  //        </div>
  //        <div className="article-desc text-start">
           
  //            <h5>
  //              {" "}
  //              {post.title}
  //            </h5>
           
  //          <p className="text-dark">{readMore(post.shortContent,150)}</p>
           
  //          {/* <p dangerouslySetInnerHTML={{__html:post.content}}>
             
  //          </p> */}
  //        </div>
  //        <div className="article-footer text-start">
  //          <span>{format(new Date(post.creationDate),"MMM d, Y hh:mm aaa")} · {post?.readingTime} · <a href="#" className="xbadge rounded-pill text-dark">
  //            {findData(+post.categoryId,categories)?.name}
  //          </a></span>
           
  //        </div>
  //      </div>
  //      <div className="col-4 col-md-4 article-img">
       
  //          <img
  //            src={post.featureImage}
  //            alt="blog post feature data"
  //          />
        
     
  //      </div>
  //    </div>
  //  </article>
   
    
  )
}
