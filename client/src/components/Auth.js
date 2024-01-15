import { Button, TextField, Typography, Box } from '@mui/material'
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/index';
//import { toast, ToastContainer } from 'react-toastify';

const Auth = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [logged,setLogged]=useState(false);
  const [error,setError]=useState("");
  const [isSigup, setIsSignup] = useState(false);
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });
  //const notify = () => toast("Invalid Credenials");
  //console.log(error);

  //console.log(inputs);
  //localStorage.setItem("userDetails",JSON.stringify(inputs));
  /**useEffect(()=>{
    const localStorageGetInfo=localStorage.getItem('logged');
    if(localStorageGetInfo == "1"){
      dispatch(authActions.login())
      setLogged(true);
    }
  },[]);**/

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const sendRequest = async (type = 'login') => {
    const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
      name: inputs.name, email: inputs.email, password: inputs.password
    }).catch((err)=>{
      err.response.data.message && setError(err.response.data.message)
    })
    const data = await res.data;
    localStorage.setItem('userId',data.user._id);
    return data;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //notify();
    //console.log(inputs);
    if (isSigup) {
      sendRequest('signup').then((data) => dispatch(setUser(data.user)))
        //.then((data) => localStorage.setItem('name', data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(data => console.log(data))
        //.then((data)=>dispatch(setUser(data.user)))
        .then(() => navigate('/trending'));
        localStorage.setItem("logged","1");
        setLogged(true);
    }
    else {
      sendRequest().then((data) => dispatch(setUser(data.user)))
        //.then((data)=>localStorage.setItem('name',data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(data => console.log(data))
        //.then((data)=>dispatch(setUser(data.user)))
        .then(() => navigate('/trending'));
        localStorage.setItem("logged","1");
        setLogged(true);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box display={'flex'} flexDirection={'column'}
          alignItems={'center'} justifyContent={'center'}
          boxShadow={"10px 10px 20px #ccc"} padding={3}
          margin={'auto'} marginTop={5} borderRadius={5} maxWidth={400}>
          <Typography variant='h3' padding={3} textAlign={'center'}>{isSigup ? "SignUp" : "Login"}</Typography>
          {isSigup && <TextField name='name' onChange={handleChange} value={inputs.name} type='name' placeholder='Name' margin='normal' />}
          <TextField name='email' onChange={handleChange} value={inputs.email} type='email' placeholder='Email' margin='normal' />
          <TextField name='password' onChange={handleChange} value={inputs.password} type='password' placeholder='Password' margin='normal' />
          <Button type='submit' variant='contained' sx={{ borderRadius: 3, marginTop: 3 }} color='warning'>Submit</Button>
          <Button onClick={() => setIsSignup(!isSigup)} sx={{ borderRadius: 3, marginTop: 3 }}>Change To {isSigup ? "Login" : "SingUp"}</Button>
          <div>{error ? <label>{error}</label> : ""}</div>
        </Box>
      </form>
    </div>
  )
}

export default Auth