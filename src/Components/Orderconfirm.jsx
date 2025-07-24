import React from 'react';
import { useLocation } from 'react-router-dom';
import checkoutImg from "../assets/checkout.png";

const Orderconfirm = () => {
  const location = useLocation();
  const { orderId } = location.state || {};

  return (
    <div className='orderconfirm' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '50px', alignItems: 'center' }}>
      <img className='checkoutimg' src={checkoutImg} alt="checkout" style={{ width: '300px', marginBottom: '20px' }} />
      <h1 className='confirm' style={{ color: 'purple', marginBottom: '10px' }}>Order Confirmed</h1>
      {orderId ? (
        <h3 style={{ color: 'green' }}>Your order ID: {orderId}</h3>
      ) : (
        <h3 style={{ color: 'red' }}>Sorry, something went wrong. Please try again.</h3>
      )}
    </div>
  );
};

export default Orderconfirm;
