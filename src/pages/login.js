import { useState } from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";
import useSWR, { useMutation, mutate } from "swr";
import Alert from "@mui/material/Alert";
import router, { useRouter } from "next/router";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const fetcher = (url) => fetch(url).then(async (res) => res.json());
  const { data: userData, error: usernameError } = useSWR( `/api/getUserInfo?username=${formData.username}`,fetcher);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userData.length == 0) {
        setAlert({
          message: "Username does not exist. Please sign up.",
          severity: "error",
        });
        return;
      }

    console.log(userData);
    if (userData[0].pwd !== formData.password) {
      setAlert({
        message: "Incorrect password.",
        severity: "error",
      });
      return;
    }

    loginSuccess();
  
  };
  const loginSuccess = (event) => {
    console.log("here",userData);
    router.push({
      pathname: './search',
      query: { username: formData.username,
    userData: userData }
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
        Please Login.
      </Typography>
    <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
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
          name="password"
          label="Password"
          type="password"
          fullWidth
          value={formData.password}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Login
        </Button>
      </Grid>
    </Grid>
    </>
  )
}
