"use client";

import { useEffect, useState } from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";
import useSWR, { useMutation, mutate } from "swr";
import Alert from "@mui/material/Alert";
import router, { useRouter } from "next/router";


export default function DetailsPage() {
const router = useRouter();

const [alert, setAlert] = useState(null);
const [caps, setCaps] = useState('');
const [customer_id, setCustomerId] = useState(0);
const roomDetails = router.query;
const username = router.query.username;

const fetcher = (url) => fetch(url).then(async (res) => res.json());
const { data: capData, error: capError } = useSWR( `/api/getPossibleCapacities?hotel_id=${roomDetails.hotel_id}`,fetcher);
const { data: idData, error: idError } = useSWR( `/api/getCustomerId?username=${username}`,fetcher);
useEffect(() => {
    idData ? setCustomerId(idData[0].customer_id) : '';
    if (capData) {
        const capacityToString = {
            "single": "single",
            "double": "double",
            "queen": "queen",
            "king": "king"
          };
          setCaps(capData.map(capacity => capacityToString[capacity.capacity]).join(", "));
    }
},[capData,idData]);

console.log(customer_id);

const goBack = async (event) => {
    router.push({
        pathname: './search',
        query: { username: username }
      });
  }

const handleBook = () => {

   idData ? roomDetails.customer_id = customer_id : '';

    fetch('/api/createBooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomDetails),
      })
      setAlert({
        message: "Room is booked! Enjoy your stay :)",
        severity: "success",
      });
};
  return (
    <>
    {alert && (
        <Alert severity={alert.severity} onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}
       <Button variant="contained" color="primary" onClick={goBack}>
        Back to Search
      </Button>
    <Typography fontSize="20px">
    Hotel: {roomDetails.chain_name}
  </Typography>
  <Typography fontSize="20px">
  Location: {roomDetails.city}, {roomDetails.country}
</Typography>
<Typography fontSize="20px">
  Price/Night (CAD): ${roomDetails.price}
</Typography>
<Typography fontSize="20px">
  Bed Size: {roomDetails.capacity}
</Typography>
<Typography fontSize="20px">
  View type: {roomDetails.view_type}
</Typography>
{ capData && <Typography fontSize="20px">
  This hotel has the following room capacities if interested in booking a different room at this hotel: {caps}
</Typography> }
<Typography fontSize="20px">
  Check-in: {roomDetails.check_in_date}
</Typography>
<Typography fontSize="20px">
  Check-out: {roomDetails.check_out_date}
</Typography>
<Button variant="contained" color="primary" onClick={handleBook}>
      Book!
</Button>
<Button variant="contained" color="primary" href="./">
        Logout
 </Button>
</>
)
}
