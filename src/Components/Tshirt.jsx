import React, { useState } from 'react';
import Tshirtimg from "../assets/tshirt.png";
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const Tshirt = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [type, setType] = useState("Regular");
  const [name, setName] = useState("");
  const [jerseyNumber, setJerseyNumber] = useState("");
  const navigate = useNavigate();

  const handleCustomize = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select both size and color.");
      return;
    }

    const tshirtDetails = {
      title: "Custom T-shirt",
      size: selectedSize,
      color: selectedColor,
      type,
      name: type === 'Athletic' ? name : "",
      jerseyNumber: type === 'Athletic' ? jerseyNumber : "",
      images: [Tshirtimg] 
    };

    localStorage.setItem("productDetails", JSON.stringify(tshirtDetails));
    navigate("/design", {
    state: {
    name,
    jerseyNumber,
  },
});
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1 style={{textAlign:'center'}}>Design your Tshirt as you need</h1>
      <div style={{ display: "flex", gap: "40px", alignItems: "center", marginTop:'4%',justifyContent:'center'}}>
        <img src={Tshirtimg} alt="T-shirt" style={{ width: "300px" }} />
        <div style={{display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center',}}>
          <h5>Select Size:</h5>
          <div style={{ display: "flex",gap: "10px", marginBottom: "20px" }}>
            {["S", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                onClick={() => setSelectedSize(size)}
                style={{
                  backgroundColor: selectedSize === size ? "#007bff" : "#ccc",
                  color: selectedSize === size ? "white" : "black",
                  padding: "10px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                {size}
              </div>
            ))}
          </div>

          <h5>Select Color:</h5>
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            {["Red", "Blue", "Green", "Black", "White"].map((color) => (
              <div
                key={color}
                onClick={() => setSelectedColor(color)}
                style={{
                  backgroundColor: color.toLowerCase(),
                  border: selectedColor === color ? "3px solid #007bff" : "2px solid #ccc",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  cursor: "pointer"
                }}
                title={color}
              />
            ))}
          </div>

          <Form.Select
            aria-label="Tshirt Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{ marginBottom: "20px" }}
          >
            <option value="Regular">Regular</option>
            <option value="Athletic">Athletic</option>
          </Form.Select>

          {type === "Athletic" && (
            <div style={{ marginBottom: "20px" }}>
              <Form.Group controlId="formName" style={{ marginBottom: "10px" }}>
                <Form.Label>Enter Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. John"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formJerseyNumber">
                <Form.Label>Enter Jersey Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="e.g. 23"
                  value={jerseyNumber}
                  onChange={(e) => setJerseyNumber(e.target.value)}
                />
              </Form.Group>
            </div>
          )}

          <Button onClick={handleCustomize}>Customize Now</Button>
        </div>
      </div>
    </div>
  );
};
