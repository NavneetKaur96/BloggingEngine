import SignUp from './Signup'
import {render,screen,fireEvent} from '@testing-library/react';
import { BrowserRouter, json } from "react-router-dom";
import { Provider } from "react-redux";
import store from '../../redux/store';
import {logRoles} from '@testing-library/dom';
describe('SignUp Component',()=>{
 
    test('renders Sign Up Button',()=>{
render( <Provider store={store}><BrowserRouter><SignUp showSignUp="true" handleCloseSignUp={jest.fn()}/></BrowserRouter></Provider>);

 const button=screen.getByRole('button',{name:/Sign Up/i});
 expect(button).toBeInTheDocument();
       
    });
    test('renders Form Fields',()=>{
    render( <Provider store={store}><BrowserRouter><SignUp showSignUp="true" handleCloseSignUp={jest.fn()}/></BrowserRouter></Provider>);
        const firstName = screen.getByLabelText(/First Name/i)
        const lastName = screen.getByLabelText(/Last Name/i)
        const email = screen.getByLabelText(/email/i)
        const password = screen.getByLabelText("Password")
      
        expect(firstName).toBeInTheDocument();
        expect(lastName).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();
      
              
           });
        
               test('popup closes on click of close icon',()=>{
                render( <Provider store={store}><BrowserRouter><SignUp showSignUp="false" handleCloseSignUp={jest.fn()}/></BrowserRouter></Provider>);
                const firstName = screen.getByLabelText(/First Name/i)
                 const button=screen.getByTestId('closeSignup')
                 fireEvent.click(button);
                 expect(firstName).not.toBeInTheDocument();
                       
                    })

   
})