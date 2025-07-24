import React, { useState } from 'react';
import Hoodieimg from "../assets/hoodie.png";
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const Hoodie = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [type, setType] = useState("Cap"); // Default to "Cap"
  const navigate = useNavigate();

  const handleCustomize = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select both size and color.");
      return;
    }

    const hoodieDetails = {
      title: "Custom Hoodie",
      size: selectedSize,
      color: selectedColor,
      type,
      images: [Hoodieimg]
    };

    localStorage.setItem("productDetails", JSON.stringify(hoodieDetails));
    navigate('/design');
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1 style={{ textAlign: 'center' }}>Design your Hoodie as you need</h1>
      <div style={{ display: "flex", gap: "40px", alignItems: "center", marginTop: '4%', justifyContent: 'center' }}>
        <img src={Hoodieimg} alt="Hoodie" style={{ width: "300px" }} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h5>Select Size:</h5>
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
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
            aria-label="Hoodie Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{ marginBottom: "20px" }}
          >
            <option value="Cap">With Cap</option>
            <option value="No Cap">Without Cap</option>
          </Form.Select>

          <Button onClick={handleCustomize}>Customize Now</Button>
        </div>
      </div>
    </div>
  );
};
