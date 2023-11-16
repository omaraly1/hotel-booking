"use client";


import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Alert } from '@mui/material';
import { useState, useEffect } from "react";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url) =>
  fetch(url).then(async (res) => res.json());

export default function Results() {

  const details = (room) => {
    console.log(room);
    room.username = username;
    router.push({
      pathname: './details',
      query: room
    });
  }

  const goBack = async (event) => {
    router.push({
        pathname: './search',
        query: { username: username }
      });
  }

  const router = useRouter();
  const {country, city, stars, size, chain, price, startDate, endDate, minNumRooms, username} = router.query;

  const { data: resData, error: resError } = useSWR(`/api/getResults?country=${country}&city=${city}&stars=${stars}&size=${size}&chain=${chain}&price=${price}&startDate=${startDate}&endDate=${endDate}&minNumRooms=${minNumRooms}`
                                          ,fetcher);

  console.log(resData);
  return (
    <>
    {resData && resData.length === 0 && (
      <>
      <Alert severity="error">
        There are no rooms with the criteria you are looking for. Please go search again.
      </Alert>
      </>
    )}
     <Button variant="contained" color="primary" onClick={goBack}>
        Back to Search
      </Button>

         <Button variant="contained" color="primary" href="./">
        Logout
       </Button>
    {resData && resData.length > 0 && (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>Room ID</TableCell>
            <TableCell>Bed Accomodation</TableCell>
            <TableCell align="right">View Type</TableCell>
            <TableCell align="right">Chain Name</TableCell>
            <TableCell align="right">Price/Night (CAD)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {resData ? resData.map((room) => (
            <TableRow
              key={room.room_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{room.room_id}</TableCell>
              <TableCell component="th" scope="row">{room.capacity.toUpperCase()} </TableCell>
              <TableCell align="right">{room.view_type.toUpperCase()}</TableCell>
              <TableCell align="right">{room.chain_name}</TableCell>
              <TableCell align="right">{room.price}</TableCell>
              <TableCell align="right"><Button variant="outlined" onClick={() => {
                    room.check_in_date = startDate;
                    room.check_out_date = endDate; 
                    details(room)}}>Details</Button></TableCell>
            </TableRow>
          )) : null}
        </TableBody>
      </Table>
    </TableContainer>
    
    )}
    </>
  )
   
}
