
import './App.css';
import React, {useState, useEffect,lazy,Suspense} from'react';
import api from './api';
// import Home from './pages/Home';
// import About from './pages/About';
// import Why from './pages/Why';
import Login from './pages/Login';
// import SignUp from './pages/SignUp';
import { Route, Routes } from 'react-router-dom';
import Profile from './pages/Profile';
// import { RequireToken } from './pages/Auth';

const Home = lazy(() => import ('./pages/Home'));
const About = lazy(() => import ('./pages/About'));
const Why = lazy(() => import ('./pages/Why'));
// const Login = lazy(() => import ('./pages/Login'));
const SignUp = lazy(() => import ('./pages/SignUp'));
function App() {
  // const [data,setData] = useState([]);
  // useEffect(()=>{

  //   api.get("/").then((response)=>{
 
  //     setData(response.data)
  //     console.log(response.data)
      
  //   })
  // },[]);

  
  return (
    <div  className="text-3xl font-bold underline">
      <header className="App-header">
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
        {/* <Route
            path="/profile"
            element={
              <RequireToken>
                <Profile />
              </RequireToken>
                       }/> */}
          <Route exact path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/why" element={<Why/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Login />} /> // Redirect to login page by default
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </Suspense>
      </header>
    </div>
  );
}

export default App;
