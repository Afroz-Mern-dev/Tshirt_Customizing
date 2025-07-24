import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LoginImg from "../assets/Newlogin.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const res = await axios.post(`${BACKEND_URL}/api/auth/signup`, formData);
      if (res.status === 201) {
        navigate("/login"); 
      }
    } catch (err) {
         setError(err.response?.data?.message || "Signup failed");
         console.error("Signup error:", err.response?.data || err);
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
            fontStyle: "italic",
            color: "blue",
            textAlign: "center"
          }}
        >
          <p style={{ color: "white" }}>Let's get started</p>
        </div>
        <img className="images" src={LoginImg} alt="login" />
        <Box
          sx={{
            boxShadow: 2,
            width: 790,
            padding: 3,
            height: "85vh",
            borderRadius: "8px"
          }}
          className="moves2"
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
            marginLeft: "-6.5%"
          }}
        >
          {error && (
            <Typography variant="h6" color="error.main" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Box
            component="form"
            className="forms"
            onSubmit={handleSubmit}
            sx={{
              width: 270,
              padding: 3,
              borderRadius: 2,
              marginLeft: "8%",
              marginTop: "17%"
            }}
          >
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              required
            />
            <Button
              className="LoginBtn"
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 1 }}
            >
              Sign Up
            </Button>

            <Typography
              onClick={() => navigate("/login")}
              variant="body2"
              sx={{
                mt: 1,
                color: "#8086FF",
                textAlign: "center",
                width: "100%",
                fontSize: "0.7rem",
                cursor: "pointer"
              }}
            >
              Already have an account? Login
            </Typography>
          </Box>
          {error && (
             <Typography
               variant="body2"
               color="error"
               sx={{ textAlign: "center" }}
               >
                 {error}
            </Typography>
          )}
        </Box>
      </div>
    </div>
  );
};

export default Signup;
