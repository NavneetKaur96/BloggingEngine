import React,{useContext, useEffect, useState} from 'react';
import UserImage from '../../Icons/userImage.png';
import './Profile.css'
import AuthContext from '../../context/auth-context';
import { fullName } from '../../utilities/utils';
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from '../../redux/actions/posts.action';
import { faEdit} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik} from "formik";
import * as Yup from "yup";
import { UPDATE_USER } from '../../redux/action.types';
export default function Profile() {
    const authCtx= useContext(AuthContext);
    const user=authCtx.loggedUser;
    const [edit,setEdit]=useState(false);
    const [updated,setUpdated]=useState(false);
    const {userUpdated,user1}=useSelector(state=>state.users)
    const dispatch = useDispatch();
    const formik = useFormik({
      initialValues: {
        
        password: user?.password,
        about: user?.about,
      },
      enableReinitialize: true,
      onSubmit: async function (values) {
        console.log(formik)
        setEdit(false)
        if(formik.dirty && (formik.initialValues.password!==values.password || formik.initialValues.about!==values.about)){
         let body={}
          if(!values.password)
          {body={about:values.about}}
          else{
           body={...values}
          }
        dispatch(updateUser(process.env.REACT_APP_USERS_API_URL,user.id,body))
      if(formik.initialValues.password!==values.password)
      {  //setUpdated(true)
        //authCtx.logout();
      }
      
      }
      },
      validationSchema: Yup.object({
        // password: Yup.string()
        //   .required("Enter a secure password")
        //   .matches(
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        //     "Not in required format"
        //   )
      })
      
   });
useEffect(()=>{
  if(userUpdated){
  authCtx.login(userUpdated);
    // authCtx.logout();
    // setUpdated(false);
    // dispatch({
    //   type:UPDATE_USER,
    //   payload:null
    // })
  }

},[userUpdated])
  
    const handleEdit=()=>{
      setEdit(!edit)
    }
  return (

<div className="card border-0 pt-5 mt-5" >
  <div className="row g-0">
 
    <div className="col-md-4">
      <img src={UserImage} className="img-fluid rounded-start" alt="user display" />
    </div>
    <div className="col-md-8">
      <div className="card-body text-center">
        <h5 className="card-title d-inline">Profile</h5>
        <FontAwesomeIcon icon={faEdit}  className={`fs-6 ps-3 cursor-pointer text-dark d-inline ${edit?'text-dark':'text-light'}`}  onClick={handleEdit} />
        <form onSubmit={formik.handleSubmit}>
        <table className="table mt-5 mx-2">

  <tbody>
    {/* <tr>
      <th scope="row">User Name</th>
      <td>{user.userName}</td>
      
    </tr> */}
    <tr>
      <th scope="row">Full Name</th>
      <td>{fullName(user.firstName,user.lastName)}</td>
    
    </tr>
    <tr>
      <th scope="row">Email</th>
      <td colSpan="2">{user.email}</td>
    
    </tr>
  
    <tr>
      <th scope="row"><label for="password">Change Password</label></th>
      {edit && <td colSpan="2"><input type="password" class="form-control" id="password"
      name="password" 
      onInput={formik.handleBlur}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.password}
      />
         {formik.touched.password && formik.errors.password && (
            <span className="text-danger fs-6">{formik.errors.password}</span>
          )}
      
      </td>}
     
      {!edit && <td colSpan="2"><input type="password" id="password" class="form-control border border-0" readOnly value={user?.password} /></td>}
    
    </tr>
    <tr>
      <th scope="row">Tell the world about yourself</th>
      <td colSpan="2">
     
       {edit && <div className="form-floating">
  <textarea className="form-control" placeholder="Tell about yourself"  name="about" maxLength="60" id="floatingTextarea2" style={{"height": "100px"}} 
  onInput={formik.handleBlur}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  value={formik.values.about}></textarea>
  </div>}
  {!edit && <p>{user?.about}</p>}
  </td>
  </tr>
  
 

  </tbody>
</table>
{edit && <button className="btn btn-dark text-white mt-0 pt-0 float-end" type="submit"  >Update</button>}
</form>
      </div>
    </div>
  </div>
</div>
  )
}
