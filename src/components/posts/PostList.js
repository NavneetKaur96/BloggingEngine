import React,{useEffect}from "react";
import { findData } from "../../utilities/utils";

import PostItem from "./PostItem";

export default function PostList({posts,users,categories}) {

  

  return (
    <>
      {posts.map(post=><div key={post.id} className="mt-0 pt-0">
     <PostItem key={post.id} post={post} user={findData(post.userId,users)} categories={categories}/>
     <hr/>
     </div>
      )}
     </>
  
  );
}
