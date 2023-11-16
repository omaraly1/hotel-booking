import { useEffect, useState } from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";
import useSWR, { useMutation, mutate } from "swr";
import Alert from "@mui/material/Alert";
import { Nav } from "react-bootstrap";
import router, { useRouter } from "next/router";

export default function EditPage() {

const [formData, setFormData] = useState([]);
const router = useRouter();

  const fetcher = (url) => fetch(url).then(async (res) => res.json());
  const { data: usernameData, error: usernameError } = useSWR( `/api/getUserInfo?username=${router.query.username}`,fetcher);  

  useEffect(() => {
     usernameData ? setFormData({
        firstName: usernameData[0].f_name,
        lastName: usernameData[0].l_name,
        username: usernameData[0].username,
        ssn: usernameData[0].ssn,
        street: usernameData[0].street,
        city: usernameData[0].city,
        country: usernameData[0].country,
        password: usernameData[0].password
      }) : '';
  }, [usernameData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
//  event.preventDefault()
    formData.customer_id = usernameData[0].customer_id;
 console.log("wys",formData);
    fetch('/api/updateCustomer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    setAlert({
      message: "User edited successfully!",
      severity: "success",
    });
  };

  const goBack = async (event) => {
    router.push({
        pathname: './search',
        query: { username: formData.username,
        userData: usernameData }
      });
  }

  const deleteAccount = async (event) => {

    router.push({
        pathname: './',
        query: { username: formData.username}
      });

    fetch('/api/deleteCustomer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

  }

  const [alert, setAlert] = useState(null);

  return (
    <>
      {alert && (
        <Alert severity={alert.severity} onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}
      <Typography fontSize="50px" align="center">
       Edit Profile
      </Typography>
    {usernameData && (
    <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
      <Grid item xs={12} sm={6}>
        <TextField
          name="firstName"
          label="First Name"
          fullWidth
          value={formData.firstName}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          name="lastName"
          label="Last Name"
          fullWidth
          value={formData.lastName}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="username"
          label="Username"
          fullWidth
          value={formData.username}
          disabled={true}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="ssn"
          label="SSN"
          fullWidth
          value={formData.ssn}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="street"
          label="Street"
          fullWidth
          value={formData.street}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="city"
          label="City"
          fullWidth
          value={formData.city}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="country"
          label="Country"
          fullWidth
          value={formData.country}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}> 
        <Button variant="contained" color="primary" onClick={handleSubmit}>
         Save Changes
        </Button>
        </Grid>
        <Grid item xs={12}> 
        <Button variant="contained" color="primary" onClick={goBack}>
          Back to Search
        </Button>
        </Grid>
        <Grid item xs={12}> 
        <Button variant="contained" color="error" onClick={deleteAccount}>
          Delete account
        </Button>
        </Grid>
    </Grid>
    )}
    </>
  )
}
