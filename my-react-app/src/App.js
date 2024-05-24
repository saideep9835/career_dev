
// import './App.css';
// import React, {useState, useEffect,lazy,Suspense} from'react';
// import api from './api';
// // import Home from './pages/Home';
// // import About from './pages/About';
// // import Why from './pages/Why';
// import Login from './pages/Login';
// // import SignUp from './pages/SignUp';
// import { Route, Routes } from 'react-router-dom';
// import Profile from './pages/Profile';
// import After_Tenth from './pages/paths/After_Tenth';
// import StaticReactFlow from './pages/paths/After_Tenth';
// import CallSchedule from './pages/paths/CallSchedule';
// // import { RequireToken } from './pages/Auth';
// import AI_search_Box from './pages/paths/AI_search_Box';

// const Home = lazy(() => import ('./pages/Home'));
// const About = lazy(() => import ('./pages/About'));
// const Why = lazy(() => import ('./pages/Why'));
// // const Login = lazy(() => import ('./pages/Login'));
// const SignUp = lazy(() => import ('./pages/SignUp'));
// function App() {
//   // const [data,setData] = useState([]);
//   // useEffect(()=>{

//   //   api.get("/").then((response)=>{
 
//   //     setData(response.data)
//   //     console.log(response.data)
      
//   //   })
//   // },[]);

  
//   return (
//     <div  className="text-3xl font-bold underline">
//       <header className="App-header">
//       <Suspense fallback={<h1>Loading...</h1>}>
//         <Routes>
//         {/* <Route
//             path="/profile"
//             element={
//               <RequireToken>
//                 <Profile />
//               </RequireToken>
//                        }/> */}
//           <Route exact path="/" element={<Home/>} />
//           <Route path="/about" element={<About/>} />
//           <Route path="/why" element={<Why/>} />
//           <Route path="/login" element={<Login/>} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/profile/paths/afterTenth" element={<After_Tenth/>} />
//           <Route path="/profile/paths/AI-searchk" element={<AI_search_Box/>} />
//           <Route path="/profile/paths/callschedule" element={<CallSchedule/>} />
//           <Route path="/" element={<Login />} /> // Redirect to login page by default
//           <Route path="/signup" element={<SignUp/>} />
//         </Routes>
//       </Suspense>
//       </header>
//     </div>
//   );
// }

// export default App;
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Why from './pages/Why';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import After_Tenth from './pages/paths/After_Tenth';
import AI_search_Box from './pages/paths/AI_search_Box';
import CallSchedule from './pages/paths/CallSchedule';

const RequireAuth = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('desologinkey');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => (
  <div className="text-3xl font-bold underline">
    <header className="App-header">
      <Suspense fallback={<h1>Loading...</h1>}>
        
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/why" element={<Why />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route
              path="/profile/paths/afterTenth"
              element={
                <RequireAuth>
                  <After_Tenth />
                </RequireAuth>
              }
            />
            <Route
              path="/profile/paths/AI-search"
              element={
                <RequireAuth>
                  <AI_search_Box />
                </RequireAuth>
              }
            />
            <Route
              path="/profile/paths/callschedule"
              element={
                <RequireAuth>
                  <CallSchedule />
                </RequireAuth>
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        
      </Suspense>
    </header>
  </div>
);

export default App;
