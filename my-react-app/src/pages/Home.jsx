import React from 'react';
import { Typography,Box } from '@mui/material';
import Nav from '../components/Nav';

function Home() {
  return (
    <>
      
        <Nav/>
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Career Path
        </Typography>
        <Typography variant="h4" component="h1">
          Be patient to choose your path
        </Typography>
      </Box>
      
    </>
  );
}

export default Home;
