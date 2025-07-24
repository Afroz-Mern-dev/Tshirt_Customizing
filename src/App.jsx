import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import cartlogo from './assets/carts.png'
import logo from './assets/logo.png'
import Checkout from './Components/Checkout';
import Orderconfirm from './Components/Orderconfirm';
import { Tshirt } from './Components/Tshirt';
import { Hoodie } from './Components/Hoodie';


import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import ProductDetails from './Components/ProductDetails';
import ProductsInfo from './Components/Productsifo';
import Cart from './Components/Cart';
import Account from './Components/Account';
import Design from "./Components/Design";
import YourOrders from './Components/YourOrders';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddToCart = (item) => {
    setCartItems({ ...cartItems, ...item });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className='Appbar'>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <img style={{ height: '28px' }} src={logo} alt="logo" />
            </IconButton>
            <Typography style={{fontWeight:'bold',marginLeft:'-1%'}} variant="h6" component="div" sx={{ flexGrow: 1 }}>
              PrintShirts
            </Typography>
            <img onClick={(e)=>navigate("/cart")} className='cartlogo' style={{ height: '20px' }} src={cartlogo} alt="cart logo" />
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuClick}
              sx={{ml:4}}
            >
            <MenuIcon sx={{mr:3}} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={(e) => { handleClose(); navigate("/yourorders"); }} >Your Orders</MenuItem>
              <MenuItem onClick={(e) => { handleClose(); navigate("/account"); }}>Your Account</MenuItem>
              <MenuItem onClick={(e) => { handleClose(); navigate("/login"); }}>Logout</MenuItem>
              </Menu >
          </Toolbar>
        </AppBar>
      </Box>

        <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />

  {localStorage.getItem("token") ? (
    <>
      <Route path="/" element={
           localStorage.getItem("token") ? <Home /> : <Navigate to="/login" replace />
      } />
      <Route path="/products" element={<ProductsInfo />} />
      <Route path="/product/:id" element={<ProductDetails handleAddToCart={handleAddToCart} cartItems={cartItems} />} />
      <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/account" element={<Account />} />
      <Route path="/success" element={<Orderconfirm />} />
      <Route path="/design" element={<Design />} />
      <Route path="/yourorders" element={<YourOrders />} />
      <Route path="/tshirt" element={<Tshirt />} />
      <Route path="/hoodie" element={<Hoodie />} />
    </>
  ) : (
    <Route path="*" element={<Navigate to="/login" replace />} />
  )}
</Routes>

    </div>
  );
}

export default App;
