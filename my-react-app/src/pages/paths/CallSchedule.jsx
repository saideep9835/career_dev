
import { TextField, Button, Typography } from '@mui/material'
import React, { Fragment, useState } from 'react'
import api from '../../api';

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
  function handleChange(event){
    const {name,value} = event.target;
    setFormData(prevformData => ({...prevformData, [name]:value}));
  };
 
    const api_post = api();
    const handleSubmit = async(event) =>{
      event.preventDefault();
      try{
      const response = await api_post.post('/call_schedule',formData);
      setDateFrom(response.data.date)
      console.log(response.data);
      
      
      setFormData(initialState);
      }catch{
        console.log("error posting");
      }

    }
   
  

  
  return (
    <>
       
        <Fragment>
             {dateFrom}
            <form onSubmit={handleSubmit}>
            
                <TextField 
                type="text" 
                label = "Enter your fullname"
                 variant='outlined' name="name"
                 value = {formData.name}
                 onChange = {handleChange}
                  fullWidth 
                  required  
                  sx={{mb: 4}}/>
                <TextField type = "email" value = {formData.email} onChange = {handleChange} label = "Enter your Email" variant='outlined' name="email" fullWidth required sx={{mb: 4}}/>
        
                <TextField type = "text" label = "Enter your Mobile No." value={formData.mobilenumber} onChange = {handleChange}variant='outlined' name="mobilenumber" fullWidth required sx={{mb: 4}}/>
                <TextField type = "text" label = "Description" rows={4}
                                placeholder="Reason for scheduling a call"
                                multiline fullWidth 
                                name = "description"
                                value={formData.description} 
                                onChange = {handleChange}
                                
                                 sx={{mb:4}}/>
                <TextField
                    type="datetime-local"
                    variant='outlined'
                    color='secondary'
                    name = "date"
                    fullWidth
                    required
                    value = {formData.date}
                    onChange = {handleChange}
                    sx={{mb: 4}}
                />
                <Button type="submit">Submit</Button>

            </form>
        </Fragment>
    </>
  )
}

