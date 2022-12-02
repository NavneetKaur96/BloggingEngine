import Banner from "./Banner"
import {render,screen} from '@testing-library/react'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../redux/store"
describe('Banner Component',()=>{
    test('renders Stay Curious as a text',()=>{
        render(<Provider store={store}><BrowserRouter><Banner/></BrowserRouter></Provider>);
       
        const bannerElement=screen.getByText('Stay curious.');
        expect(bannerElement).toBeInTheDocument();
    });
    test('renders banner paragraph',()=>{
        render(<Provider store={store}><BrowserRouter><Banner/></BrowserRouter></Provider>);
        const bannerElement=screen.getByText(/Discover stories, thinking, and expertise from writers on any topic./i);
        expect(bannerElement).toBeInTheDocument();
    });
    test('renders banner button',()=>{
        render(<Provider store={store}><BrowserRouter><Banner/></BrowserRouter></Provider>);
        const bannerElement=screen.getByRole('button',{name:/get started/i});
        expect(bannerElement).toBeInTheDocument();
    })
})
