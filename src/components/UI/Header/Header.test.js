import Header from './Header';
import {render,screen} from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../redux/store"
describe('Header Component',()=>{
    test('renders write as a text',()=>{
   render( <Provider store={store}><BrowserRouter><Header/></BrowserRouter></Provider>);
  
        const writeElement=screen.getByRole("link",{name:/Write/i});
        expect(writeElement).toBeInTheDocument();
    });
    test('renders sign in as text',()=>{
        render(<Provider store={store}><BrowserRouter><Header/></BrowserRouter></Provider>);
        const signInElement=screen.getByRole("link",{name:/Sign In/i});
        expect(signInElement).toBeInTheDocument();
    })
    test('renders sign up as text',()=>{
        render(<Provider store={store}><BrowserRouter><Header/></BrowserRouter></Provider>);
        const signUpElement=screen.getByRole("link",{name:/Sign Up/i});
        expect(signUpElement).toBeInTheDocument();
    })
    test('renders website logo',()=>{
        render(<Provider store={store}><BrowserRouter><Header/></BrowserRouter></Provider>);
        const logoElement=screen.getByRole("img",{name:"logo"});
        expect(logoElement).toBeInTheDocument();
    })
})