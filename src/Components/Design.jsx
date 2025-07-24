import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { Col, Row } from "react-bootstrap";

const Design = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [color, setColor] = useState("#000000");
  const [text, setText] = useState("");
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [description, setDescription] = useState("");
  const [productImage, setProductImage] = useState(null);

  const navigate = useNavigate();

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 400;

    const context = canvas.getContext("2d");
    ctxRef.current = context;

   const productDetails = JSON.parse(localStorage.getItem("productDetails"));
      if (productDetails?.images?.[0]) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = productDetails.images[0]; 
      img.onload = () => {
     setProductImage(img);
     drawCanvas(context, elements, img);
    };
}

  }, []);

  const drawCanvas = (ctx, elements, backgroundImage) => {
    ctx.clearRect(0, 0, 400, 400);
    if (backgroundImage) {
      ctx.drawImage(backgroundImage, 0, 0, 400, 400);
    }

    elements.forEach((el) => {
      if (el.type === "text") {
        ctx.fillStyle = el.color;
        ctx.font = "20px Arial";
        ctx.fillText(el.text, el.x, el.y);
      } else if (el.type === "image" && el.img) {
        ctx.drawImage(el.img, el.x, el.y, el.width, el.height);
      }
    });
  };

  const addText = () => {
    if (!text.trim()) return;
    const newText = {
      type: "text",
      text,
      x: 150,
      y: 150,
      color,
    };
    const updated = [...elements, newText];
    setElements(updated);
    drawCanvas(ctxRef.current, updated, productImage);
    setText("");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.src = url;
    img.onload = () => {
      const newImage = {
        type: "image",
        img,
        x: 100,
        y: 100,
        width: 100,
        height: 100,
      };
      const updated = [...elements, newImage];
      setElements(updated);
      drawCanvas(ctxRef.current, updated, productImage);
    };
  };

  const isInside = (x, y, el) => {
    const ctx = ctxRef.current;
    if (!ctx) return false;
    if (el.type === "text") {
      const textWidth = ctx.measureText(el.text).width;
      return x >= el.x && x <= el.x + textWidth && y >= el.y - 20 && y <= el.y;
    }
    if (el.type === "image") {
      return x >= el.x && x <= el.x + el.width && y >= el.y && y <= el.y + el.height;
    }
    return false;
  };

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let i = elements.length - 1; i >= 0; i--) {
      if (isInside(x, y, elements[i])) {
        setSelectedElement(i);
        setDragOffset({ x: x - elements[i].x, y: y - elements[i].y });
        return;
      }
    }
  };

  const handleMouseMove = (e) => {
    if (selectedElement === null) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const updated = [...elements];
    const el = updated[selectedElement];
    el.x = x - dragOffset.x;
    el.y = y - dragOffset.y;

    setElements(updated);
    drawCanvas(ctxRef.current, updated, productImage);
  };

  const handleMouseUp = () => {
    setSelectedElement(null);
  };

  const saveDesignImage = () => {
  const canvas = canvasRef.current;
  if (canvas) {
    const imageData = canvas.toDataURL("image/png");
    localStorage.setItem("designImage", imageData);
  }
};


 const goToCheckout = () => {
  saveDesignImage(); 

  const productDetails = JSON.parse(localStorage.getItem("productDetails"));
  const designImage = localStorage.getItem("designImage");

  navigate("/checkout", {
    state: {
      ...productDetails,
      description,
      designImage, 
    },
  });
};


  return (
    <div style={{ padding: "20px", backgroundColor: "#fffbd5" }}>
      <Row>
        <Col md={3}>
          <h4 style={{ color: "purple" }}>Tools</h4>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{ width: "100%", marginBottom: "10px" }}
          />
          <input
            type="text"
            placeholder="Type text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
          />
          <Button variant="outlined"  onClick={addText} sx={{ mb: 1, backgroundColor:'darkcyan',border:'none', color:'white'}}>
            Add Text
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              if (selectedElement !== null) {
                const updated = [...elements];
                updated.splice(selectedElement, 1);
                setElements(updated);
                drawCanvas(ctxRef.current, updated, productImage);
                setSelectedElement(null);
              }
            }}
            disabled={selectedElement === null}
            sx={{ mb: 2,ml:'4%', mt:'3%',color:'white'}}
            style={{backgroundColor:'red',color:'white'}}
          >
            Delete Selected
          </Button>

          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{ backgroundColor: "grey", color: "#fff", mb: 2 }}
          >
            Upload Image
            <VisuallyHiddenInput type="file" accept="image/*" onChange={handleImageUpload} />
          </Button>

          <Button
            onClick={goToCheckout}
            sx={{ backgroundColor: "green", color: "#fff" }}
          >
            Continue to Checkout
          </Button>
        </Col>

        <Col md={6} style={{ textAlign: "center" }}>
          <h3 style={{ color: "purple" }}>Design Preview</h3>
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{ border: "1px solid #ccc", cursor: "move" }}
          />
        </Col>

        <Col md={3}>
          <h4 style={{ color: "purple" }}>Design Description</h4>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your design..."
            style={{
              width: "100%",
              height: "200px",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Design;
