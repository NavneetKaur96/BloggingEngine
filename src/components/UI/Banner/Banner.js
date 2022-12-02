import React,{useState}from 'react';
import './Banner.css';
import BannerImage from '../../../Icons/jtimg.png'
import Login from '../../Login/Login'
export default function Banner() {
    const [showLogin, setShowLogin] = useState(false);
    const handleCloseLogin=()=>{
    
        setShowLogin(false)
    }
  return (
 <>




 
 <section className="container-fluid bg-warning jumbotron border border-2">

<div className="jt-right d-none d-lg-block">
    <img src={BannerImage} alt="" />
</div>

<div className="row d-flex justify-content-center align-items-center h-100vh">
    <div className="col-md-12 p-0">
        <div className="container jt-left text-start">
            <h1>Stay curious.</h1>
            <p>Discover stories, thinking, and expertise from writers on any topic.</p>
            <button type="button" className="btn btn-dark rounded-pill btn-lg" onClick={()=>{
                setShowLogin(true)
            }}>Get Started</button>
        </div>
    </div>
</div>
</section>
<Login showLogin={showLogin} handleCloseLogin={handleCloseLogin}/>
 </>
  )
}
