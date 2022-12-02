import React,{useState} from 'react';
import AuthContext from './auth-context';
import { useNavigate } from "react-router-dom";
export default function AuthState(props){
    const navigate = useNavigate();
    const initialUser=localStorage.getItem('LoggedInUser')
    const [user,setUser]=useState(initialUser?JSON.parse(initialUser):null);
    const userIsLoggedIn=!user?false:true;
    const loginHandler=(userOb)=>{
        console.log("from AUTHC")
        console.log(userOb)
        setUser(userOb);
       
        localStorage.setItem('LoggedInUser',JSON.stringify({...userOb,"password":'',"confirmPassword":""}))
    }
    const logoutHandler=()=>{
       
        setUser(null);
        localStorage.clear();
        navigate('/')
    }
    const contextValue={
        loggedUser:user,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler
    }
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}
