import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import About from './About';
import Login from './Login';
import SignUp from './SignUp';
import Why from './Why';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Nav from '../components/Nav';

function Home() {
  return (
    <>
      
        <Nav/>
        <h1>Welcome to Career Path</h1>
        <h1>Be patient to choose your path</h1>
       
      
    </>
  );
}

export default Home;
