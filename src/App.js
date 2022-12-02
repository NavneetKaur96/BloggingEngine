import logo from './logo.svg';
import './App.css';
import { Route, Routes,Navigate} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import React from 'react';
import Header from './components/UI/Header/Header';
import Loader from './components/UI/Spinner';
import RequireAuth from './pages/RequireAuth';



function App() {
  const ViewPost = React.lazy(() => import("./pages/ViewPost/ViewPost"));
  const Profile = React.lazy(() => import("./pages/Profile/Profile"));
  const MyStory = React.lazy(() => import("./pages/MyStory/MyStory"));
  const CreatePost = React.lazy(() => import("./pages/CreatePost/CreatePost"));
  const EditPost = React.lazy(() => import("./pages/EditPost/EditPost"));
  return (
    <>
     <Header/>
   
            <Routes>
              <Route index element={<HomePage />} />
              
              <Route path="/viewpost/:id" element={<React.Suspense fallback={<Loader/>}><ViewPost/></React.Suspense>}/>
              <Route element={<RequireAuth/>}>
              <Route path="/profile" element={<React.Suspense fallback={<Loader/>}><Profile/></React.Suspense>} />
              <Route path="/mystory" element={<React.Suspense fallback={<Loader/>}><MyStory/></React.Suspense>} />
              <Route path="/writepost" element={<React.Suspense fallback={<Loader/>}><CreatePost/> </React.Suspense>} />
              <Route path="/editpost/:id" element={<React.Suspense fallback={<Loader/>}><EditPost/></React.Suspense>} />
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
              
            </Routes>
        
       
    </>
  );
}

export default App;
