import CategoryList from './CategoryList';
import {render,screen} from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from '../../redux/store';
describe('CategoryList Component',()=>{
    const categories=[
        {"id":1,
    name:"programming"},
    {"id":2,
    name:"technology"}
    ]
    test('renders category items',()=>{
render( <Provider store={store}><BrowserRouter><CategoryList categories={categories}/></BrowserRouter></Provider>);

 const categoryItems=screen.getAllByRole('button');
 expect(categoryItems).toHaveLength(3)
       
    });
    test('renders heading ',()=>{
       render( <Provider store={store}><BrowserRouter><CategoryList categories={categories}/></BrowserRouter></Provider>);
       const headingElement=screen.getByText(/Discover more of what matters to you/i);
         expect(headingElement).toBeInTheDocument();
        
           });
   
})