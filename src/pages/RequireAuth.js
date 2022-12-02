import React,{useContext} from 'react';
import { Navigate,Outlet } from 'react-router-dom';
import AuthContext from '../context/auth-context';

export default function RequireAuth() {
    const authCtx= useContext(AuthContext);
  return (
  authCtx.isLoggedIn?<Outlet/>:<Navigate to="/" replace/>
  )
}
