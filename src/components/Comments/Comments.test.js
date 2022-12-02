import Comments from './Comments';
import {render,screen} from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from '../../redux/store';
import {logRoles} from '@testing-library/dom'
describe('Comments Component',()=>{
    test('renders Comments button',()=>{
render( <Provider store={store}><BrowserRouter><Comments id="5" /></BrowserRouter></Provider>);

 const btn=screen.getByRole('button',{name:"Submit"})
 expect(btn).toBeInTheDocument();

       
    });
   
       test('renders Comments input field',()=>{
        render( <Provider store={store}><BrowserRouter><Comments id="5" /></BrowserRouter></Provider>);

        const input=screen.getByPlaceholderText("Leave a comment here...")
        expect(input).toBeInTheDocument();
       
              
           });
           test('renders Comments list',async ()=>{
        render( <Provider store={store}><BrowserRouter><Comments id="5" /></BrowserRouter></Provider>);
   
       const result=await screen.findAllByTestId('card')
          
     expect(result).not.toHaveLength(0);
           
                  
               });
       });
