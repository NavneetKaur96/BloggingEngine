import Login from './Login'
import {render,screen,fireEvent} from '@testing-library/react';
import { BrowserRouter, json } from "react-router-dom";
import { Provider } from "react-redux";
import store from '../../redux/store';
import {logRoles} from '@testing-library/dom';
describe('Login Component',()=>{
 
    test('renders Sign In Button',()=>{
render( <Provider store={store}><BrowserRouter><Login showLogin="true" handleCloseLogin={jest.fn()}/></BrowserRouter></Provider>);

 const button=screen.getByRole('button',{name:/Sign In/i});
 expect(button).toBeInTheDocument();
       
    });
    test('renders email',()=>{
    render( <Provider store={store}><BrowserRouter><Login showLogin="true" handleCloseLogin={jest.fn()}/></BrowserRouter></Provider>);
        const email = screen.getByLabelText(/email/i)
      
        expect(email).toBeInTheDocument();
      
              
           });
           test('renders password',()=>{
           render( <Provider store={store}><BrowserRouter><Login showLogin="true" handleCloseLogin={jest.fn()}/></BrowserRouter></Provider>);
            const password = screen.getByLabelText(/password/i)
          
            expect(password).toBeInTheDocument();
                  
               });
               test('popup closes on click of close icon',()=>{
                render( <Provider store={store}><BrowserRouter><Login showLogin="true" handleCloseLogin={jest.fn()}/></BrowserRouter></Provider>);
                 const password = screen.getByLabelText(/password/i)
                 const button=screen.getByTestId('close')
                 fireEvent.click(button);
                 expect(password).not.toBeVisible();
                       
                    })

   
})