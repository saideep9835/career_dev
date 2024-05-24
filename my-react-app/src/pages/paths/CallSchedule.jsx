
import { Box,TextField, Button, Typography } from '@mui/material'
import React, { Fragment, useState } from 'react'
import api from '../../api';
import MenuWithoutAI from '../../components/MenuWithoutAI';
export default function CallSchedule() {
  const initialState = 
    {
    
      name: '',
      email: '',
      mobilenumber: '',
      description: '',
      date: ''
    
}
  const [dateFrom, setDateFrom] = useState(null)
  const [ formData , setFormData] = useState(initialState);
  // const { date_month,time_pm} = splitDateTime("12");
  // function splitDateTime(timestamp) {
  //   const [date_month, time_pm] = timestamp.split('T');
  
  //   // Assuming time is in HH:MM:SS or HH:MM format, you can directly use it
  //   // or, if you need just HH:MM from HH:MM:SS
  //   const shortTime = time_pm.slice(0, 5);
  
  //   return { date_month, time_pm: shortTime };
  // }
  // 
  const handleChange = (event) => {
    const {name,value} = event.target;
    setFormData(prevformData => ({...prevformData, [name]:value}));
  };
   
    const api_post = api();
    const handleSubmit = async(event) =>{
      event.preventDefault();
      try{
      const response = await api_post.post('/call_schedule',formData);
      setDateFrom(response.data.date)
      
      // 
      const date_m = dateFrom.split('T')
      console.log("date:",date_m[0], "time:",date_m[1])
      console.log(response.data);
      
      
      setFormData(initialState);
      }catch{
        console.log("error posting");
      }

    }
   
  

  
  return (
    <>
       
        
        
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <MenuWithoutAI/>
       
            <Box sx={{ mt: 12, flexGrow: 1,width:'50%', minHeight: 400, display: 'flex', flexDirection: 'column'
             // Center horizontally
       }}>
            <Typography variant='h5'sx={{justifyContent:'left'}}>
              Please fill out the form to Schedule a call with an expert.
            </Typography>
             {dateFrom?(<Typography variant='h5' sx={{color: 'blueviolet', // Using theme colors
        fontSize: '1.5rem', // Custom font size
        fontWeight: 'bold', // Bold font weight
        lineHeight: 1.5, // Line height
        letterSpacing: 1.5}}> Your Call is Scheduled successfully. We will send a google meet link to your Email soon.</Typography>):(<h6></h6>)}
         
            <form onSubmit={handleSubmit}>
            
                <TextField 
                type="text" 
                label = "Enter your fullname"
                
                 variant='outlined' name="name"
                 value = {formData.name}
                 onChange = {handleChange}
                  
                  required  
                  sx={{mb: 4, width: '60%'}}/>
                <TextField type = "email" value = {formData.email} onChange = {handleChange} label = "Enter your Email" variant='outlined' name="email"  required sx={{mb: 4, width: '60%'}}/>
        
                <TextField type = "text" label = "Enter your Mobile Number with the country code" value={formData.mobilenumber} onChange = {handleChange}variant='outlined' name="mobilenumber"  required sx={{mb: 4, width: '60%'}}/>
                <TextField type = "text" label = "Description" rows={4}
                                placeholder="Reason for scheduling a call"
                                multiline  
                                name = "description"
                                value={formData.description} 
                                onChange = {handleChange}
                                
                                 sx={{mb:4, width: '60%'}}/>
                <TextField
                    type="datetime-local"
                    variant='outlined'
                    color='secondary'
                    name = "date"
                
                    required
                    value = {formData.date}
                    onChange = {handleChange}
                    sx={{mb: 4, width: '60%'}}
                />
                <Button 
                type="submit"
                
                 variant="contained"
                 sx = {{mb:2,width: '60%'}}
                >Submit</Button>

            </form>
            </Box>
        </Box>
    </>
  )
}

