'use client';

import { Button, Box, Typography, Alert } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import router, { useRouter } from 'next/router';
import { useState } from 'react';


<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"></link>

export default function HomePage() {

  const router = useRouter();
  const [deletedUser, setDeletedUser] = router.query ? useState(router.query.username) : useState('');
  return (
    <>
    {deletedUser && (
        <Alert severity="success" onClose={() => setDeletedUser('')}>
          User {deletedUser} has been successfully deleted.
        </Alert>
      )}
    <Box textAlign='center'>
      <Typography fontSize='50px' className='text-center'>Welcome to Omar² Hotel Booking System!</Typography>
      <Button variant="contained" href="./signup">Sign up</Button>{' '}
      <Button variant="contained" href="./login" >Login</Button>{' '}
    </Box>
    </>
  )
}



