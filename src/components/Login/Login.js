import React, { useState,useContext, useEffect } from 'react';
import AuthContext from '../../context/auth-context';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useFormik} from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from '../../redux/actions/posts.action';
import { CLEAR_ERROR } from '../../redux/action.types';
import Loader from '../UI/Spinner';

// import {useHistory} from 'react-router-dom';
export default function Login({showLogin,handleCloseLogin}) {
  const dispatch = useDispatch();
  // const history=useHistory();
  //const [error,setError]=useState(null);
  const authCtx= useContext(AuthContext)
  const {user,error} = useSelector((state) => state.users);
  const [loading,setLoading]=useState(false);
  useEffect(()=>{
    console.log('hiiii from login')
    if(user){
      console.log('hiiii from inside login')
      authCtx.login(user); formik.resetForm();closeModal();
        
      // history.replace("/")
  
  
  }
    
  },[user])
  const formik = useFormik({
    initialValues: {
  
      email: "",
      password: "",
      
    },
    onSubmit: async  (values)=> {

     setLoading(true)
  
     console.log(loading)
     let res= await dispatch(authenticateUser(process.env.REACT_APP_USERS_API_URL,values))
     setTimeout(()=>{ setLoading(false)},500)
     console.log(loading)
   
    
    console.log(loading)
    },
    validationSchema: Yup.object({
     
      email: Yup.string()
        .email("Email is not in required format")
        .required("Email required"),
      password: Yup.string()
        .required("Enter a secure password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Password must be 8 character long & include atleast one captial letter,one special letter,one numeric character"
        ),
      
    })
    
 });

  const closeModal = () => {handleCloseLogin();formik.resetForm();dispatch({
    type:CLEAR_ERROR
  })};

  return (<>
    <Modal show={showLogin} onHide={closeModal}  backdrop="static"
    keyboard={false} centered>
    <Modal.Header closeButton>
      <Modal.Title>Sign In</Modal.Title>
    </Modal.Header>
    <Form onSubmit={formik.handleSubmit}>
    <Modal.Body>
    {error && <span className="text-danger fs-6">{error}</span>}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
               
                name="email"
                className={`${ (formik.touched.email && formik.errors.email)?"border-danger":""}`}
                onInput={formik.handleBlur}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
            <span className="text-danger fs-6">{formik.errors.email}</span>
          )}
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput2"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password"  className={`${ (formik.touched.password && formik.errors.password)?"border-danger":""}`}
                onInput={formik.handleBlur}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}/>
                {formik.touched.password && formik.errors.password && (
            <span className="text-danger fs-6">{formik.errors.password}</span>
          )}
            </Form.Group>
         
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" className="btn btn-light text-dark" onClick={closeModal} data-testid="close">
        Close
      </Button>
      <Button variant="dark" className="btn btn-dark text-white" type="submit">
        Sign In
      </Button>
    </Modal.Footer>
    </Form>
  </Modal>
  {loading && <Loader/>}
  </>
  )
}
