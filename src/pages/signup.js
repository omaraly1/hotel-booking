import { useState } from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";
import useSWR, { useMutation, mutate } from "swr";
import Alert from "@mui/material/Alert";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    ssn: "",
    street: "",
    city: "",
    country: "",
    password: "",
    repeatPassword: "",
  });



  const fetcher = (url) => fetch(url).then(async (res) => res.json());
  const { data: usernameData, error: usernameError } = useSWR( `/api/getUserInfo?username=${formData.username}`,fetcher);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.repeatPassword) {
      setAlert({
        message: "Passwords do not match.",
        severity: "error",
      });
      return;
    }

    if (usernameData.length > 0) {
      setAlert({
        message: "Username already exists.",
        severity: "error",
      });
      return;
    }

    fetch('/api/insertCustomer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    setAlert({
      message: "User created successfully!",
      severity: "success",
    });
    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      ssn: "",
      street: "",
      city: "",
      country: "",
      password: "",
      repeatPassword: "",
    });
  };

  const [alert, setAlert] = useState(null);

  return (
    <>
      {alert && (
        <Alert severity={alert.severity} onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}
      <Typography fontSize="50px" align="center">
        Please Sign Up.
      </Typography>
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
          onChange={handleChange}
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
        <TextField
          name="password"
          label="Password"
          type="password"
          fullWidth
          value={formData.password}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="repeatPassword"
          label="Repeat Password"
          type="password"
          fullWidth
          value={formData.repeatPassword}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button type="submit" variant="contained" color="primary" onclick={() => handleSubmit()}>
          Sign up!
        </Button>
        </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" href='./login'>
          Login
        </Button>
      </Grid>
    </Grid>
    </>
  )
}
