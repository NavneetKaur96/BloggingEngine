import React,{useState,useEffect,useContext}from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik} from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faImage} from '@fortawesome/free-solid-svg-icons'
import '../CreatePost/CreatePost.css';
import { useDispatch, useSelector } from "react-redux";
import { getBase64 } from '../../utilities/utils';
import { updatePostDetails } from '../../redux/actions/posts.action';
import AuthContext from '../../context/auth-context';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getPostDetails } from '../../redux/actions/posts.action';
import { UPDATE_POST_DETAILS } from '../../redux/action.types';
import { countWords } from '../../utilities/utils';
export default function EditPost() {
    
    let { id } = useParams();
    const dispatch = useDispatch();
  
  const [base64,setFileBase]=useState(null);
  const { post,categories,postUpdated} = useSelector((state) => state.posts);
  const authCtx= useContext(AuthContext);
  const [fileName,setFileName]=useState(null);
  const user=authCtx.loggedUser;
  const navigate = useNavigate();

useEffect(()=>{
  if(postUpdated!==null && postUpdated!={}){
    formik.resetForm();
    navigate('/mystory');
    dispatch({type:UPDATE_POST_DETAILS,
  payload:null})
  }
 
},[postUpdated]);

useEffect(()=>{
    dispatch(getPostDetails(process.env.REACT_APP_POSTS_API_URL,id));
  

},[id])


 const formik = useFormik({
    initialValues: {
  
      title: post?.title,
      categoryId: post?.categoryId,
      featureImage:post?.featureImage,
      content:post?.content,
      shortContent:post?.shortContent,
},
enableReinitialize: true,
    onSubmit: function (values) {
      
     if(formik.dirty && formik.isValid  ){
    console.log(values);
    const body={
      ...values,
      userId:user.id,
      creationDate:new Date(),
      readingTime:countWords(values.content),
      clapsCount:post.clapsCount,
      fileName:fileName || post?.fileName,
      featureImage:base64|| post?.featureImage,
      
    }
 
    dispatch(updatePostDetails(process.env.REACT_APP_POSTS_API_URL,id,body))
    
}
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
  console.log(formik.touched)
  return (<>
    {post && <div className="container pt-5 mt-4">
    
      
      {((formik.touched!=={} || formik.dirty) && !formik.isValid  ) && <p className="text-danger">All fields are mandatory</p>}
      <form  onSubmit={formik.handleSubmit}>
      <div class="d-flex justify-content-end"><button type="submit" class="btn btn-dark text-white float-end" >Save Changes</button></div>
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
                value={formik.values.categoryId}
               >
        <option value="select category">Select category</option>
        {categories && categories.map(category=> <option key={category.id}  value={category.id}>{category.name}</option>)}

      </select>
    </div>
  <div class="mb-3">
    <label  class="form-label d-block fw-bold">Feature Image</label>
    <label  class="form-label cursor-pointer" for="featureImage"><FontAwesomeIcon icon={faImage}  className="fs-4" /></label>

<span class="ms-4">{fileName?fileName:post?.fileName}</span>


 

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
    <label for="featureImage1" class="form-label fw-bold">Content</label>
   
    <ReactQuill id="featureImage1" theme="snow"  modules={modules}  formats={formats} className="editorHeight pb-5 mb-4" name="content" value={formik.values.content}  onChange={formik.handleChange('content')}
 

                
               />
  </div>

</form>
  
  </div>}
  </>
  )
}
