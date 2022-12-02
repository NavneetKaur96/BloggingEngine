import React,{useContext, useEffect} from 'react'
import Banner from "../../components/UI/Banner/Banner"

import Posts from '../../components/posts/Posts';
import AuthContext from '../../context/auth-context';

export default function HomePage() {
  const authCtx= useContext(AuthContext);

  return (<>
   
      {!authCtx.isLoggedIn && <Banner/>}
     <Posts/>
   
    </>
  )
}
