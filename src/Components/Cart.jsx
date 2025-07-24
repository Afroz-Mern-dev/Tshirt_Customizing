import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Cart({ cartItems, setCartItems }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let tempPrice = 0;
    let tempQuantity = 0;

    Object.keys(cartItems).forEach((cartItemid) => {
      const details = cartItems[cartItemid];
      tempPrice += details.price * details.quantity;
      tempQuantity += details.quantity;
    });

    setTotalPrice(tempPrice);
    setTotalQuantity(tempQuantity);
  }, [cartItems]);

  const handleRemoveItem = (itemId) => {
    const updatedCart = { ...cartItems };
    delete updatedCart[itemId];
    setCartItems(updatedCart); 
  };

  return (
    <div style={{backgroundColor:'#E6DADA',minHeight: '100vh',}}>
    <h3 style={{textAlign:'center', padding:10 }}>Your Cart</h3>
    <div className="cartuu">
    <Row>
    <Col md={8}>
      <Table style={{ marginTop: 20 }} bordered>
        <tbody style={{borderRadius:'8px'}}>
          {Object.keys(cartItems).map((cartItemid) => {
            const details = cartItems[cartItemid];
            return (
              <tr style={{borderRadius:'8px'}} key={cartItemid}>
                <td>
                  <img src={details.images} alt={details.title} height="90" />
                </td>
                <td>
                  {details.title}
                  <Button
                    size="sm"
                    className="removebtn"
                    onClick={() => handleRemoveItem(cartItemid)}
                    style={{ marginLeft: '10px' }}
                  >
                    Remove
                  </Button>
                </td>
                <td>{details.quantity}</td>
                <td>${details.price * details.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Col>
     <Col md={4}>
      <div className="ordersummary" style={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '20px',
        backgroundColor: '#274046', 
        color:'white',
        boxShadow: '0 0 10px rgba(0,0,0,0.05)',
      }}>
        <h4>Order Summary</h4>
        <p><strong>Total Items:</strong> {totalQuantity}</p>
        <p><strong>Total Price:</strong> ${totalPrice}</p>
        <Button
          variant="success"
          style={{ marginTop: '20px', width: '100%' }}
          onClick={() => navigate("/checkout", { state: { cartItems, totalPrice, totalQuantity } })}
        >
         Buy Now
        </Button>
      </div>
    </Col>
  </Row>
  </div>
</div>

  );
}
