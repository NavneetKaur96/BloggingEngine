import React,{useState,useContext} from 'react';
import AuthContext from '../../../context/auth-context';
import Login from '../../Login/Login';
import Signup from '../../Signup/Signup'
import  './Header.css';
import { fullName } from '../../../utilities/utils';
import { Link } from "react-router-dom";
import UserImage from '../../../Icons/userImage.png'
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { UPDATE_USER } from '../../../redux/action.types';
let selectedItem='';
export default function Header() {
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const location = useLocation();

const dispatch=useDispatch();
    const { pathname } = location;
 const authCtx= useContext(AuthContext);
 const isLoggedIn=authCtx.isLoggedIn;
 const User=authCtx.loggedUser
    const handleShowLogin=()=>{
       
        setShowLogin(true);
    }
    const handleCloseLogin=()=>{
        selectedItem='';
        setShowLogin(false)
    }
    const handleShowSignUp=()=>{
       
        setShowSignUp(true);
    }
    const handleCloseSignUp=()=>{
        selectedItem='';
        setShowSignUp(false)
    }
    const handleWrite=()=>{
        
        if(isLoggedIn)
        navigate('/writepost')
        else{
            selectedItem='write';
            handleShowSignUp();
        }
       
    }

   
  return (
  <>
  
 <div class="bg-warning border-bottom border-dark fixed-top">
 <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light sticky-top"> 
           
            <Link className="navbar-brand" to="/">
             
            <img width="160" src="https://miro.medium.com/max/8978/1*s986xIGqhfsN8U--09_AdA.png" alt="logo" />
               
                </Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse py-2" id="navbarNav">
                  <ul class="navbar-nav my-6 ms-auto">
                                
                  <li className="nav-item pe-2">
                                        <a className={` ${(selectedItem==='write' || pathname==="/writepost")?'nav-link btn btn-dark text-light button-style':'nav-link text-dark'}`} href="#" onClick={handleWrite}>Write</a>
                                    </li>
                                    {!isLoggedIn && <> <li className="nav-item pe-2">
                                        <a className={`${selectedItem==='login'?'nav-link btn btn-dark text-light button-style':'nav-link text-dark'}`} href="#" onClick={()=>{selectedItem='login';handleShowLogin()}}>Sign In</a>
                                    </li>
                                    <li className="nav-item pe-2">
                                        <a className={`${selectedItem==='signup'?'nav-link btn btn-dark text-light button-style':'nav-link text-dark'}`} href="#" onClick={()=>{selectedItem='signup';handleShowSignUp()}}>Sign Up</a>
                                    </li></>}
                                    {isLoggedIn && <> 
                                        <li className="nav-item pe-2">
                                        <Link to="/mystory" className={`${pathname==='/mystory'?'nav-link btn btn-dark text-light button-style':'nav-link text-dark'}`} onClick={()=>{selectedItem='mystory'}}>My Stories</Link>
                                    </li>
                                    <li class="nav-item d-flex">
                                     <img
               src={UserImage}
               className="rounded-circle mt-1 ProfileImage"
               alt="User"
             />
                                    <div class="dropdown nav-link text-dark" >
  <button className="dropdown-toggle border-0 bg-warning" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
  
            {User.email}
  </button>
  <ul className="dropdown-menu text-center" aria-labelledby="dropdownMenuButton1">
    {/* <li><a className="dropdown-item" href="#">{fullName(User.firstName,User.lastName)}</a></li> */}
    <li><Link to="/profile" className="dropdown-item" >Profile</Link></li>
    <li><a className="dropdown-item" href="#" onClick={()=>{selectedItem='logout';dispatch({type:UPDATE_USER,payload:null});authCtx.logout()}}>Sign Out</a></li>
   
  </ul>
</div>
                   </li>                 
                                    </>
                                    
                                    
                                    }
                  
                  </ul>
                </div>
               
              </nav>
              </div>
    </div>



   {showLogin &&  <Login showLogin={showLogin} handleCloseLogin={handleCloseLogin}/>}
    <Signup showSignUp={showSignUp} handleCloseSignUp={handleCloseSignUp}/>
    </>
  )
}
