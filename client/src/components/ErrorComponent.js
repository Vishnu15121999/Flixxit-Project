import { Typography } from '@mui/material'
import React from 'react';
import { FallbackProps } from 'react-error-boundary';

const ErrorComponent = (props:FallbackProps) => {
    const {error}=props
  return (
    <div style={{display:'flex' , flexDirection:'column' , justifyContent:'center' , alignItems:'center'}}>
        <Typography>An error has Happened</Typography>
        <p>{error.message}</p>
    </div>
  )
}

export default ErrorComponent