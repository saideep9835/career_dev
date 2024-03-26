import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
function Nav() {
  return (
    <AppBar position="fixed" sx={{ background: 'purple', boxShadow: 'none' }}>
    <Toolbar sx={{ justifyContent: 'center' }}>
      <Typography variant="h6" sx = {{ justifyContent:'left'}}>
        
      </Typography>
      <Button color="inherit" component={Link} to="/">Home</Button>
      <Button color="inherit" component={Link} to="/About">About</Button>
      <Button color="inherit" component={Link} to="/Why">Why</Button>
      <Button color="inherit" component={Link} to="/login">Login</Button>
      <Button color="inherit" component={Link} to="/signup">SignUp</Button>
    </Toolbar>
  </AppBar>
  )
}

export default Nav