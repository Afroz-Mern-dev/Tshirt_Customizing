import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LoginImg from "../assets/Newlogin.png";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

 
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }
    );

    console.log("Login response:", response);
    console.log("Token received from server:", response.data.token);

    const token = response.data.token;


    localStorage.setItem("token", token);
    console.log("Token saved to localStorage:", localStorage.getItem("token"));

    navigate("/");

  } catch (error) {
    console.error("Login error:", error.response?.data || error);
    setError(error.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="Login">
      <div className="Top">
        <div
          className="text"
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            padding: "1px",
            fontStyle: "italic",
            color: "blue",
            textAlign: "center",
          }}
        >
          <h2>Welcome back</h2>
        </div>
        <img className="image" src={LoginImg} alt="Login" />
        <Box
          sx={{
            boxShadow: 2,
            width: 790,
            padding: 3,
            height: "85vh",
            borderRadius: "8px",
          }}
          className="move2"
        ></Box>
      </div>
      <div className="move">
        <Box
          sx={{
            height: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            mt: -63,
            marginLeft: "-6.5%",
          }}
        >
          <Box
            component="form"
            className="form"
            onSubmit={handleSubmit}
            sx={{
              width: 270,
              padding: 3,
              borderRadius: 2,
              boxShadow: "none",
              marginLeft: "8%",
              marginTop: "17%",
            }}
          >
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              InputLabelProps={{ style: { color: "black" } }}
              InputProps={{ style: { color: "black" } }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              InputLabelProps={{ style: { color: "black" } }}
              InputProps={{ style: { color: "black" } }}
            />
            <Button
              className="LoginBtn"
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 1 }}
            >
              Login
            </Button>
            <Typography
              onClick={() => navigate("/signup")}
              variant="body2"
              sx={{
                mt: 1,
                color: "#8086FF",
                textAlign: "center",
                width: "100%",
                fontSize: "0.7rem",
                cursor: "pointer",
              }}
            >
              Don't have an account? Signup
            </Typography>
          </Box>

          {error && (
            <Typography
              variant="body2"
              color="error"
              sx={{
                textAlign: "center",
                marginTop: 2, 
              }}
            >
              {error}
            </Typography>
          )}
        </Box>
      </div>
    </div>
  );
};

export default Login;
