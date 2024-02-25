import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function SignIn() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    try {
      const dataResponse = await axios.post(
        "http://localhost:2000/api/authentication/organizationSignin",
        formData
      );
      console.log(dataResponse.data.response.length);
      if (dataResponse.data.response.length !== 0) {
        sessionStorage.setItem("name", dataResponse.data.response[0].name);
        sessionStorage.setItem(
          "description",
          dataResponse.data.response[0].description
        );
        sessionStorage.setItem("id", dataResponse.data.response[0]._id);
        navigate("../OrganizationDashboard");
      } else {
        setError("Credential not matched");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "100%",
      }}
      component="main"
      maxWidth="xs"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "25%",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Typography component="h1" variant="h5">
          {error}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            placeholder="Enter organization email"
            autoComplete="email"
            autoFocus
            style={{ borderRadius: "14px" }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            placeholder="Enter organization password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{
              backgroundColor: "#f4c752",
              color: "black",
              fontWeight: "600",
              borderRadius: "20px",
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
