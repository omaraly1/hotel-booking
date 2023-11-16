"use client";

import { Autocomplete, Grid, Typography, TextField, Slider, Button } from "@mui/material";
import { useState, useEffect } from "react";
import dayjs from 'dayjs';
import { useRouter } from "next/router";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import useSWR from "swr";

const fetcher = (url) =>
  fetch(url).then(async (res) => res.json());

export default function Search() {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [numRooms, setNumRooms] = useState(0);
  const [countryList, setCountryList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [stars, setStars] = useState(0);
  const [size, setSize] = useState("");
  const [chain, setChain] = useState("");
  const [chainList, setChainList] = useState([]);
  const [startDate, setstartDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [price, setPrice] = useState(500);
  const [minNumRooms, setminNumRooms] = useState(1);
  const router = useRouter();


    const { data: countryData, error: countryError } = useSWR(`/api/getCountries`,fetcher);
    const {data: cityData, error: cityError} = useSWR (`/api/getCities?country=${country}`, fetcher);
    const {data: chainData, error: chainError} = useSWR (`/api/getHotelChains?stars=${stars}`, fetcher);
    const {data: roomNumberData, error: roomNumberError} = useSWR (`/api/getRoomsPerCity?city=${city}`, fetcher);

  useEffect(() => {
    countryData ? setCountryList(countryData.map((res) => res["country"])) : "";
     cityData ? setCityList(cityData.map(res => res['city'])) : '';
     chainData ? setChainList(chainData.map(res => res['chain_name'])) : '';
     roomNumberData && roomNumberData.length > 0 ? setNumRooms(roomNumberData[0].num_rooms) : 0;
  }, [countryData, cityData,chainData,roomNumberData]);

  const username = router.query.username;
  const handleCountry = (value) => {
    setCountry(value); 
    setCity(null);
  };

  console.log("city",city)
  
  const search = (event) => {
    router.push({
      pathname: './results',
      query: { country: country,
              city: city,
              stars: stars,
              size: size,
              chain: chain,
              price: price,
              startDate: startDate,
              endDate: endDate,
              minNumRooms, minNumRooms,
              username: username
              }
    });
  }

  const edit = (event) => {
    router.push({
      pathname: './editProfile',
      query: { username: username }
    });
  }

return (
  <>
  <div style={{ justifyContent: 'center' }}>
    <Typography fontSize="50px">
      Welcome {username}! Fill out the criteria below.
    </Typography>
    
    <Grid container spacing={2} alignItems="center" justifyContent="center">
    <Grid item xs={12}>
    <Button variant="outlined" onClick={edit}>
          Edit Profile
        </Button>
        </Grid>
      <Grid item xs={12}>
        <Autocomplete
          options={countryList}
          sx={{ width: 300 }}
          onChange={(event,value) => handleCountry(value)}
          renderInput={(params) => <TextField {...params} label="Country" />}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          options={cityList}
          sx={{ width: 300 }}
          onChange={(event, value) => setCity(value)}
          renderInput={(params) => <TextField {...params} label="City" />}
        />
      </Grid>
      <Grid item xs={12}>
     { city && <Typography fontSize="20px">
        There are {numRooms} rooms in this city!
       </Typography> }
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          options={[1, 2, 3, 4, 5]}
          sx={{ width: 300 }}
          onChange={(event, value) => setStars(value)}
          renderInput={(params) => <TextField {...params} label="Stars" />}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          options={["Single", "Double", "Queen", "King"]}
          sx={{ width: 300 }}
          onChange={(event, value) => setSize(value)}
          renderInput={(params) => <TextField {...params} label="Size" />}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          options={chainList}
          sx={{ width: 300 }}
          onChange={(event, value) => setChain(value)}
          renderInput={(params) => <TextField {...params} label="Hotel Chain" />}
        />
      </Grid>
      <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            sx={{ width: 300 }}
            defaultValue={dayjs()}
            onChange={(value) => setstartDate(value.format("YYYY-MM-DD"))}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="End Date"
            sx={{ width: 300 }}
            defaultValue={dayjs()}
            onChange={(value) => setEndDate(value.format("YYYY-MM-DD"))}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12}>
        <Typography id="input-slider" gutterBottom>
          Max Price ($)
        </Typography>
        <Slider
          defaultValue={500}
          onChange={(event, value) => setPrice(value)}
          step={100}
          min={0}
          max={1000}
          valueLabelDisplay="on"
          sx={{ width: 300 }}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography id="input-slider" gutterBottom>
          Minimum number of rooms at hotel
        </Typography>
        <Slider
          defaultValue={1}
          onChange={(event, value) => setminNumRooms(value)}
          step={1}
          min={1}
          max={5}
          valueLabelDisplay="on"
          sx={{ width: 300 }}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" onClick={search}>
          SEARCH
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
         <Button variant="contained" color="primary" href="./">
        Logout
       </Button>
      </Grid>
     
    </Grid>
    </div>
  </>
);
}
