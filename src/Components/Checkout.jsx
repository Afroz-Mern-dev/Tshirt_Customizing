import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import Paytm from "../assets/paytmicon.webp";
import Googlepay from "../assets/google-pay.png";
import phonepay from "../assets/phonepayicon.png";
import CashonDelivery from "../assets/payment-method.png";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [address, setAddress] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    cartItems,
    totalPrice,
    images,
    title,
    price,
    quantity,
    total,
    selectedSize,
    selectedColor,
    designImage,
    text,
    description,
    name,
    jerseyNumber,
  } = location.state || {};

  useEffect(() => {
    const storedAddress = localStorage.getItem("userAddress");
    if (storedAddress) {
      setAddress(JSON.parse(storedAddress));
    }
  }, []);


const handlePayNow = async () => {
  const token = localStorage.getItem("token");
  if (!token) return alert("Please login to continue");

  const orderItems = cartItems
    ? Object.values(cartItems).map(item => ({
        productTitle: item.title,
        productImage: item.designImage || item.images,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
        designImage: item.designImage,
        text: item.text,
        description: item.description,
      }))
    : [
        {
          productTitle: title,
          productImage: designImage || images?.[0],
          quantity,
          price,
          total: price * quantity,
          selectedColor,
          selectedSize,
          designImage,
          text,
          description,
          name,
          jerseyNumber,
        },
      ];

  const orderTotal = cartItems ? totalPrice : price * quantity;

  const createOrder = async (paymentMethod) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/orders/create`,
        {
          items: orderItems,
          totalPrice: orderTotal,
          paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Order created:", res.data);
      const orderId = res.data.orderId;
      navigate("/success", { state: { success: true, orderId } });
    } catch (err) {
      console.error("Order creation failed:", err);
      alert("Order creation failed. Try again later.");
    }
  };

  const proceed = window.confirm(
    `Simulated Payment\n\nClick OK to confirm your payment of ₹${orderTotal}.`
  );

  if (proceed) {
    const paymentMethod = selectedPayment === "cash" ? "cash" : "fake-upi";
    await createOrder(paymentMethod);
  } else {
    alert("Payment cancelled. Order not placed.");
  }
};

  return (
    <Row>
      <Col>
        {address && (
          <Card className="mb-4 p-3">
            <h5>Delivery Address</h5>
            <p>
              {address.homeNumber}, {address.street},<br />
              {address.landmark},<br />
              {address.city}, {address.state}
            </p>
          </Card>
        )}

        <Button onClick={() => navigate("/account")} style={{ marginTop: "2%", marginLeft: "5%" }}>
          Add Address
        </Button>

        <div style={{ padding: "30px" }}>
          {cartItems ? (
            Object.values(cartItems).map((item, index) => (
              <Card key={index} className="itemcard" style={{ padding: "20px", marginBottom: "20px" }}>
              <Card.Img
                variant="top"
                   src={item.designImage || item.productImage?.[0] || item.images?.[0] || images?.[0] || ""}
                  style={{ height: "200px", padding: "10px", width: '250px' }}
               />              
                 <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <p><strong>Size:</strong> {item.selectedSize}</p>
                  <p><strong>Color:</strong> {item.selectedColor}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <h5>Total: ₹{item.price * item.quantity}</h5>

                  {item.description && (
                    <div style={{ marginTop: "15px" }}>
                      <h6>Suggestions:</h6>
                      <p style={{ whiteSpace: "pre-wrap" }}>{item.description}</p>
                    </div>
                  )}
                </Card.Body>
              </Card>
            ))
          ) : (
            <Card className="itemcard" style={{ padding: "20px", marginTop: "-1%" }}>
              <Card.Img variant="top"   src={designImage || images?.[0] || ""}
              style={{ height: "200px", padding: "10px", width: '250px' }} />
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <p><strong>Size:</strong> {selectedSize}</p>
                <p><strong>Color:</strong> {selectedColor}</p>
                <p><strong>Quantity:</strong> {quantity}</p>
                <h5>Total: ₹{total || price * quantity}</h5>

                {description && (
                  <div style={{ marginTop: "15px" }}>
                    <h6>Suggestions:</h6>
                    <p style={{ whiteSpace: "pre-wrap" }}>{description}</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          )}
        </div>
      </Col>

      <Col style={{ padding: "40px" }}>
        <h4>Pay using UPI</h4>
        <div className="paymentmethods">
          <ul className="paymentimages" style={{ listStyle: 'none', display: 'flex', gap: '20px', padding: 0 }}>
            <li onClick={() => setSelectedPayment("phonepe")}>
              <img src={phonepay} alt="PhonePe" style={{ border: selectedPayment === "phonepe" ? "2px solid green" : "none" }} />
            </li>
            <li onClick={() => setSelectedPayment("googlepay")}>
              <img src={Googlepay} alt="Google Pay" style={{ border: selectedPayment === "googlepay" ? "2px solid green" : "none" }} />
            </li>
            <li onClick={() => setSelectedPayment("paytm")}>
              <img src={Paytm} alt="Paytm" style={{ border: selectedPayment === "paytm" ? "2px solid green" : "none" }} />
            </li>
          </ul>
        </div>
        <div
          style={{
            padding: "40px",
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
            border: selectedPayment === "cash" ? "1px solid green" : "1px solid wheat",
            marginTop: "20px"
          }}
          className="ondelivery"
          onClick={() => setSelectedPayment("cash")}
        >
          <h4 className="homedeltext" style={{ marginRight: "10px" }}>Cash on Delivery</h4>
          <img src={CashonDelivery} alt="Cash on Delivery" />
        </div>

        <Button
          onClick={handlePayNow}
          className="Paynowbtn"
          variant="success"
          style={{ marginTop: "20px", width: "100%" }}
        >
          Pay Now ₹{cartItems ? totalPrice : price * quantity}
        </Button>
      </Col>
    </Row>
  );
};
export default Checkout;
