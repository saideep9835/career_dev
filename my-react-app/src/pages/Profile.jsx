import { useNavigate } from "react-router";
import React, { useEffect,useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import useAuth from "./Auth";
import api from "../api";
import {Box, Button, Grid, TextField, Typography,Paper,Menu,MenuItem,List,ListItemIcon,ListItem,ListItemButton,ListItemText} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SendIcon from '@mui/icons-material/Send';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(0)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


export default function Profile() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [textFieldValue, setTextFieldValue] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

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
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const menuItems = [
    { text: 'After 10th', path: '/profile/paths/afterTenth' },
    { text: 'After HighSchool', path: '/profile/after-highschool' },
    { text: 'After Bachelors', path: '/profile/after-bachelors' },
    { text: 'Schedule-A-Call with expert', path: '/profile/paths/callschedule' }
  ];
  const handleClick = async () => {
    const data = {
      question: textFieldValue,
      // Add other data you want to send
    };
    console.log(data.question);
    const api_get = api();
  
    try {
      const response = await api_get.post('/get_answer',data);
  
      
  
      const result = await response.data.answer;
      setResponseMessage(result);
      console.log('Success:', result);
      
      // Handle success response
    } catch (error) {
      console.error('Error:', error);
      // Handle errors
    }
  };
  
  const signOut = () => {
    localStorage.removeItem("desologinkey");
    navigate("/");
  };

  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Career Map
          </Typography>
          <Button color="inherit" onClick={signOut}>LogOut</Button>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* This empty Toolbar acts as a spacer */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : '',
                  px: 2.5,
                }}
                onClick={() => navigate(item.path)}
              >

                
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        
      </Drawer>
      <Box sx={{ mt: 3, flexGrow: 1, minHeight: 700, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="This is an AI search box"
            variant="outlined"
            sx={{ width: '45ch', height: '56px' }}
            value={textFieldValue}
            onChange={(e) => setTextFieldValue(e.target.value)}
          />
          <Button variant="contained" endIcon={<SendIcon />} onClick={handleClick} size="large">Send</Button>
        </Box>
        <Grid container justifyContent="space-evenly">
          <Grid item xs={6} md={4}>
            {responseMessage ? (
              <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
                {responseMessage}
              </Typography>
            ) : (
              <h1></h1>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}