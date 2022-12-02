import React,{useState,useEffect,useContext}from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik} from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faImage} from '@fortawesome/free-solid-svg-icons'
import './CreatePost.css';
import { useDispatch, useSelector } from "react-redux";
import { getBase64 } from '../../utilities/utils';
import { createPost } from '../../redux/actions/posts.action';
import AuthContext from '../../context/auth-context';
import { useNavigate } from "react-router-dom";
import {countWords} from "../../utilities/utils"
export default function CreatePost() {
    

  const [fileName,setFileName]=useState();
  const [base64,setFileBase]=useState(null);
  const { categories,postCreated} = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const authCtx= useContext(AuthContext);
  const user=authCtx.loggedUser;
 
  const navigate = useNavigate();
useEffect(()=>{
  if(postCreated!==null && postCreated!={}){
    formik.resetForm();
    navigate('/mystory');
    dispatch({type:'CREATE_POST',
  payload:null})
  }
 
},[postCreated])


  const formik = useFormik({
    initialValues: {
  
      title: "",
      categoryId: "",
      featureImage:"",
      content:"",
      shortContent:"",
},
    onSubmit: function (values) {
     
    console.log(values);
    const body={
      ...values,
      userId:user.id,
      creationDate:new Date(),
      readingTime:countWords(values.content),
      clapsCount:[],
      fileName:fileName,
      featureImage:base64,
      
    }
 
    dispatch(createPost(process.env.REACT_APP_POSTS_API_URL ,body))
    
     
    },
    validationSchema: Yup.object({
      title:Yup.string().required(),
      categoryId:Yup.string().required().test(
        "is-default",
        "",
        (value) => {
          
            
            return value!=='select category';
        
        }
      ),
      featureImage:Yup.string().required(),
      content:Yup.string().required(),
      shortContent:Yup.string().required()
     
     
     


  
    })
    
 });



 

  const formats = [
    'font','size',
    'bold','italic','underline','strike',
    'color','background',
    'script',
    'header','blockquote','code-block',
    'indent','list',
    'direction','align',
    'link','image','video','formula',
  ]



  const handleChange = event => {
    const file = event.target.files[0];
   
  setFileName(event.target.files[0].name);
  getBase64(file)
      .then(result => {
        file["base64"] = result;
       
        setFileBase(result)
      
      })
      .catch(err => {
        console.log(err);
      });
      
  };
  let modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }
  return (
    <div className="container pt-5 mt-4">
    
      <p>{!formik.touched}</p>
      {((formik.touched!=={} || formik.dirty) && !formik.isValid  ) && <span className="text-danger">All fields are mandatory</span>}
      <form  onSubmit={formik.handleSubmit}>
      <div class="d-flex justify-content-end"><button type="submit" class="btn btn-dark text-white float-end" >Publish</button></div>
  <div class="mb-3">
    <label for="title" class="form-label fw-bold">Title</label>
    <input type="text" class="form-control" id="title" aria-describedby="post title" name="title" onInput={formik.handleBlur}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title} />
    
  </div>
  <div class="mb-3">
      <label for="category" class="form-label fw-bold">Category</label>
      <select id="category" class="form-select" name="categoryId"  onInput={formik.handleBlur}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
               >
        <option value="select category">Select category</option>
        {categories && categories.map(category=> <option key={category.id} value={category.id}>{category.name}</option>)}

      </select>
    </div>
  <div class="mb-3">
    <label  class="form-label d-block fw-bold">Feature Image</label>
    <label  class="form-label cursor-pointer" for="featureImage"><FontAwesomeIcon icon={faImage}  className="fs-4" /></label>

<span class="ms-4">{fileName}</span>
 

    <input class="form-control" type="file" id="featureImage" hidden  onInput={formik.handleBlur}
name="featureImage" 
                onChange={(e)=>{formik.handleChange(e);handleChange(e)}}
                onBlur={formik.handleBlur}
                />
  </div>
  <div class="mb-3">
    <label for="shortContent" class="form-label fw-bold">Short Description</label>
    <textarea type="text" class="form-control" id="shortContent" aria-describedby="post title" name="shortContent" onInput={formik.handleBlur}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.shortContent} ></textarea>
    
  </div>
  <div class="mb-3">
    <label for="featureImage2" class="form-label fw-bold">Content</label>
   
    <ReactQuill for="featureImage2" theme="snow"  modules={modules}  formats={formats} className="editorHeight pb-5 mb-4" name="content" value={formik.values.content}  onChange={formik.handleChange('content')}
 

                
               />
  </div>

</form>
  
  </div>
  )
}
