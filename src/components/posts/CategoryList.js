import React from 'react';

import { useDispatch, useSelector } from "react-redux";
import { CHANGE_CATEGORY } from '../../redux/action.types';

export default function CategoryList({categories}) {
  const {selectedCategory} = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const handleCategory=(id)=>{
dispatch({
  type:CHANGE_CATEGORY,
  payload:id
})
  }
 
  return (
<>
                    <p>DISCOVER MORE OF WHAT MATTERS TO YOU</p>
                    <ul class="list-inline">
                    <li class="list-inline-item"><button type="button" class={`btn btn-outline-secondary mb-2 ${selectedCategory==='All Blogs'?'active':''}`} onClick={()=>{handleCategory('All Blogs')}}>All Blogs</button></li>
{categories.map(category=><li class="list-inline-item" key={category.id} > <button type="button" className={`btn btn-outline-secondary mb-2  ${selectedCategory===category.id?'active':''}`} onClick={()=>{handleCategory(category.id)}}>{category.name}</button></li>)}
                        
                      
                      </ul>
                      <hr/>
                     
           


</>
  )
}
