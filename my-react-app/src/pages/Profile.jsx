import { useNavigate } from "react-router";
import React, { useEffect,useState } from 'react';
import useAuth from "./Auth";
import api from "../api";
export default function Profile() {

  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  useAuth(); // Get the token from the hook
  useEffect(() => {
    const api_get = api();
    const fetchData = async () => {
      try {
        
          const response = await api_get.get('/protected');
          setUserData(response.data);
          console.log(response.data);
      } catch (error) {
          console.error(error);
      }
  };
  fetchData();
  },[])
  
  const signOut = () => {
    localStorage.removeItem("desologinkey");
    navigate("/");
  };

  return (
    <>
      <div style={{ marginTop: 20, minHeight: 700 }}>
        <h1>Profile page</h1>
        <p>Hello there, welcome to your profile page</p>
        {userData ? (<h1>{userData.message}</h1>) : (<h1>Loading...</h1>)}
        <button onClick={signOut}>sign out</button>
      </div>
    </>
  );
}