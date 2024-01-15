import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [inputs,setInputs]=useState({name:"",email:"",password:""});
  const [name,setName]=useState([]);
  const navigate=useNavigate();
  const userData=useSelector((state)=>state.user.userDetails);
  console.log(userData[0]._id);

  const handleChange=(e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }

  useEffect(()=>{
    const storedId=localStorage.getItem('name');
    setName(storedId);
  },[]);

  const sendRequest=async()=>{
    const res=await axios.put(`http://localhost:5000/api/user/update/${userData[0]._id}`,{
      name:inputs.name,email:inputs.email,password:inputs.password}).catch(err=>console.log(err))
      const data=await res.data;
      return data;
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    sendRequest().then(()=>navigate('/trending'));
  }

  return (
    <div className='userProfile-container'>
      <Box sx={{display:'flex' , flexDirection:'column' , justifyContent:'center' , 
      alignItems:'center' , boxShadow:'10px 10px 20px #ccc' , width:'400px' ,
      marginTop:'20px' , padding:'10px'}}>
        <Typography>User Details</Typography>
        <Typography>ID : {userData[0]._id}</Typography>
        <Typography>Name : {userData[0].name}</Typography>
        <Typography>Email : {userData[0].email}</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box display={'flex'} flexDirection={'column'} 
        alignItems={'center'} justifyContent={'center'}
        boxShadow={"10px 10px 20px #ccc"} padding={3} 
        margin={'auto'} marginTop={5} borderRadius={5} width={400}>
          <Typography variant='h3' padding={3} textAlign={'center'}>Edit Profile</Typography>
          <TextField onChange={handleChange} value={inputs.name} name='name' placeholder='Name' margin='normal' type='name'/>
          <TextField onChange={handleChange} value={inputs.email} name='email' placeholder='Email' margin='normal' type='email'/>
          <TextField onChange={handleChange} value={inputs.password} name='password' placeholder='Password' margin='normal' type='password'/>
          <Button type='submit' variant='contained' sx={{borderRadius:3, marginTop:3}} color='warning'>Submit</Button>
        </Box>
      </form>
    </div>
  )
}

export default UserProfile