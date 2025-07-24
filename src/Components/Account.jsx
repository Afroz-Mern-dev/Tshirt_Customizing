import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Account = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    homeNumber: '',
    street: '',
    landmark: '',
    city: '',
    state: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { homeNumber, street, landmark, city, state } = formData;
    const address = { homeNumber, street, landmark, city, state };

    localStorage.setItem('userDetails', JSON.stringify(formData));
    localStorage.setItem('userAddress', JSON.stringify(address));

    try {
      await axios.post(`${BACKEND_URL}/api/user/account`, formData);
      alert('Details saved to backend!');
    } catch (error) {
      console.error('Error saving to backend:', error);
      alert('Failed to save details to backend');
    }
  };

  const savedAddress = JSON.parse(localStorage.getItem('userAddress'));

  return (
    <Container style={{ padding: '40px' }}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col
            style={{
              border: '2px solid whitesmoke',
              borderRadius: '6px',
              padding: '10px',
              backgroundColor: '#f5f7e3'
            }}
            className="accountcol"
            md={6}
          >
            <h4>Account Details</h4>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" required value={formData.name} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" required value={formData.email} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="tel" name="phone" required value={formData.phone} onChange={handleChange} />
            </Form.Group>
          </Col>

          <Col
            style={{
              border: '2px solid whitesmoke',
              borderRadius: '6px',
              padding: '10px',
              backgroundColor: '#f5f7e3'
            }}
            className="Addresscol"
            md={6}
          >
            <h4 className="mb-3">Delivery Address</h4>
            <Form.Group className="mb-3">
              <Form.Label>Home Number</Form.Label>
              <Form.Control type="text" name="homeNumber" required value={formData.homeNumber} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Street</Form.Label>
              <Form.Control type="text" name="street" required value={formData.street} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Landmark</Form.Label>
              <Form.Control type="text" name="landmark" value={formData.landmark} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" name="city" required value={formData.city} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" name="state" required value={formData.state} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>

        <Button style={{ marginTop: '2%' }} variant="primary" type="submit">
          Save Details
        </Button>
      </Form>

      {savedAddress && (
        <Card className="mt-4 p-3">
          <h5>Saved Delivery Address:</h5>
          <p>
            {savedAddress.homeNumber}, {savedAddress.street},<br />
            {savedAddress.landmark && (
              <>
                {savedAddress.landmark},<br />
              </>
            )}
            {savedAddress.city} - {savedAddress.state}
          </p>
        </Card>
      )}
    </Container>
  );
};

export default Account;
