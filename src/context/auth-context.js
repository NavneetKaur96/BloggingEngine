//manage context for authentication data
//responsible for managing auth realted state
import React from 'react';
const AuthContext=React.createContext({
loggedUser:'',
isLoggedIn:false,
login:(user)=>{},
logout:()=>{}


})
export default AuthContext