import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const YourOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        setOrders(data.orders || []); 
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "20px",}}>
      <h3>Your Orders</h3>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <Card
            key={index}
            className="d-flex flex-row align-items-center"
            style={{
              padding: "10px",
              marginTop: "10px",
              height:'46vh',
              maxWidth: "550px",
              margin: 1,
              boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
              display:'flex',
              flexWrap:'wrap'
            }}
          >

            <Card.Body style={{ flex: "1", paddingLeft: "20px", display:'flex', flexDirection:'column', flexWrap:'wrap'}}>
              <Card.Title>{order.items?.[0]?.productTitle}</Card.Title>
              <p><strong>Order ID:</strong> {order.orderId}</p>
              <p><strong>Size:</strong> {order.items?.[0]?.selectedSize}</p>
              <p><strong>Color:</strong> {order.items?.[0]?.selectedColor}</p>
              <p><strong>Quantity:</strong> {order.items?.[0]?.quantity}</p>
              <p><strong>Price:</strong> ₹{order.items?.[0]?.price}</p>
              <h5><strong>Total:</strong> ₹{order.totalPrice}</h5>

              {order.items?.[0]?.designImage && (
                <div style={{ marginTop: "15px" }}>
                  <img
                    src={order.items[0].designImage}
                    alt="User Design"
                    style={{
                      width: "80%",
                      maxHeight: "200px",
                      objectFit: "contain",
                      marginTop: "10px",
                      padding: "5px",
                      borderRadius: "8px",
                      marginLeft:'19%',
                      marginTop:'-65%'
                    }}
                  />
                </div>
              )}
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default YourOrders;
