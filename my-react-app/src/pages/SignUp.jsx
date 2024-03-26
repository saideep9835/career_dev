import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from'react';
import { useNavigate } from "react-router";
import login from './Login'
import api from '../api';
import { jwtDecode } from 'jwt-decode';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [responseMessage, setResponseMessage] = useState('');
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const [errors, setErrors] = useState({});
  const validate = () => {
    let isValid = true;
    let errors = {};
    console.log(formData.firstName)
    if (!formData.firstName.match(/^[a-zA-Z ]+$/)) {
        errors.firstName = 'First name must contain only alphabets and spaces';
        isValid = false;
    }

    if (!formData.lastName.match(/^[a-zA-Z ]+$/)) {
        errors.lastName = 'Last name must contain only alphabets and spaces';
        isValid = false;
    }

    if (!formData.email.match(/\S+@\S+\.\S+/)) {
        errors.email = 'Invalid email format';
        isValid = false;
    }

    if (formData.password.length < 8 || !formData.password.match(/[a-zA-Z]/) || !formData.password.match(/[0-9]/) || !formData.password.match(/[!@#$%^&*(),.?":{}|<>]/)) {
        errors.password = 'Password must be at least 8 characters long and contain at least one alphabet, one number, and one special character';
        isValid = false;
    }

    setErrors(errors);
    return isValid;
};
  const handleSubmit = async(event) => {
    event.preventDefault();
    if (validate()){
    try {
      const api_post = api();
      const response = await api_post.post('/SignUp', formData);
      setResponseMessage(response.data.message);
      localStorage.setItem('desologinkey', response.data.token);
      navigate('/profile');
      console.log(response.data.message);
    } catch (error) {
      console.error('Error:', error);
      alert('SignUp failed');
    }
    
  }else{
    
    alert('SignUp failed');
  }setFormData(initialFormData);

  };
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });  
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         {responseMessage? <Typography variant="body2" color="error">{responseMessage}</Typography> : null}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  value={formData.firstName} 
                  onChange={handleChange}
                  label="First Name"
                  autoFocus
                />
                {errors.firstName && <div>{errors.firstName}</div>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName} 
                  onChange={handleChange} 
                  autoComplete="family-name"
                />
              </Grid>
              {errors.lastName && <div>{errors.lastName}</div>}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={formData.email} 
                  onChange={handleChange}
                  autoComplete="email"
                />
                 {errors.email && <div>{errors.email}</div>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  
                  value={formData.password} 
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                {errors.password && <div>{errors.password}</div>}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}