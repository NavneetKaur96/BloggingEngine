import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
import { useFormik} from "formik";
import * as Yup from "yup";
import { findUser, registerUser } from '../../redux/actions/posts.action';
import { CLEAR_ERROR, FIND_USER } from '../../redux/action.types';

export default function Signup({showSignUp,handleCloseSignUp}) {
  const {searchUser,error} = useSelector((state) => state.users);
  const dispatch = useDispatch();
useEffect(()=>{
  console.log(searchUser)
  console.log(searchUser!=null && searchUser.length===0)
  if(searchUser!=null && searchUser.length===0){
    console.log("from useffect signup")
    dispatch(registerUser(process.env.REACT_APP_USERS_API_URL,formik.values));
    formik.resetForm();
   
    closeModal();
    dispatch({type:FIND_USER,payload:null})
  }
 
},[searchUser,dispatch])
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName:"",
      // userName:"",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async function (values) {
  dispatch(findUser(process.env.REACT_APP_USERS_API_URL,'email',values.email));
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("First Name is required"),
        lastName: Yup.string()
        .required("Last Name is required"),
        // userName: Yup.string()
        // .required("User Name is required"),
      email: Yup.string()
        .email("Email is not in required format")
        .required("Email required"),
      password: Yup.string()
        .required("Enter a secure password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Password must be 8 character long & include atleast one captial letter,one special letter,one numeric character"
        ),
      confirmPassword: Yup.string()
        .required("Confirm Password is a required field")
        .oneOf([Yup.ref("password"), null], "Passwords do not match"),
    })
    
 });

  const closeModal = () => {handleCloseSignUp(); formik.resetForm();dispatch({
    type:CLEAR_ERROR
  })};
  return (
    <Modal show={showSignUp} onHide={closeModal}  backdrop="static"
    keyboard={false} centered>
    <Modal.Header closeButton>
      <Modal.Title>Sign Up</Modal.Title>
    </Modal.Header>
    <Form onSubmit={formik.handleSubmit}>
    <Modal.Body>
   {error && <span className="text-danger fs-6">{error}</span>}
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
               className={`${ (formik.touched.firstName && formik.errors.firstName)?"border-danger":""}`}
                onInput={formik.handleBlur}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
            
              />
              {formik.touched.firstName && formik.errors.firstName && (
            <span className="text-danger fs-6">{formik.errors.firstName}</span>
          )}
             
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                className={`${ (formik.touched.lastName && formik.errors.lastName)?"border-danger":""}`}
               name="lastName"
               onInput={formik.handleBlur}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
             
              />
               {formik.touched.lastName && formik.errors.lastName && (
            <span className="text-danger fs-6">{formik.errors.lastName}</span>
          )}
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                onInput={formik.handleBlur}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName}
                className={`${ (formik.touched.userName && formik.errors.userName)?"border-danger":""}`}
              />
               {formik.touched.userName && formik.errors.userName && (
            <span className="text-danger fs-6">{formik.errors.userName}</span>
          )}
            </Form.Group> */}
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
               name="email"
               onInput={formik.handleBlur}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`${ (formik.touched.email && formik.errors.email)?"border-danger":""}`}
              />
               {formik.touched.email && formik.errors.email && (
            <span className="text-danger fs-6">{formik.errors.email}</span>
          )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
            <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" 
              onInput={formik.handleBlur}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password} 
              className={`${ (formik.touched.password && formik.errors.password)?"border-danger":""}`}
             />
               {formik.touched.password && formik.errors.password && (
            <span className="text-danger fs-6">{formik.errors.password}</span>
          )}
            </Form.Group>
         
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput6"
            >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" name="confirmPassword" onInput={formik.handleBlur}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className={`${ (formik.touched.confirmPassword && formik.errors.confirmPassword)?"border-danger":""}`}
              />
                 {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <span className="text-danger fs-6">{formik.errors.confirmPassword}</span>
          )}
            </Form.Group>
           
     
  
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" className="btn btn-light text-dark" onClick={closeModal} data-testid="closeSignup">
        Close
      </Button>
      <Button variant="primary" className="btn btn-dark text-white" type="submit" >
        Sign Up
      </Button>
      
    </Modal.Footer>
    </Form>
          
  </Modal>
  )
}
