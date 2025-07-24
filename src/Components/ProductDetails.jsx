import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Row, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProductDetails({ cartitems, handleAddToCart }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { title, price, images, description, category, id } = location.state || {};
  const [otherProducts, setOtherProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const colors = ["white", "black", "green", "grey", "red"];



  const token = localStorage.getItem("token");


  useEffect(() => {
    async function getdata() {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/categories/${category?.id || 1}/products?limit=10&offset=0`
      );
      setOtherProducts(response.data);
    }
    getdata();
  }, [category]);

 const handlePayNow = async () => {
  const token = localStorage.getItem("token");
  const productDetails = JSON.parse(localStorage.getItem("productDetails"));

  if (!token || !productDetails) {
    alert("Please log in and try again.");
    return;
  }

  const orderId = "ORDER-" + Date.now(); 

  const orderItem = {
  productId: productDetails.id || "N/A",
  productImage: productDetails.designImage || productDetails.productImage || "",  
  productTitle: productDetails.title,
  quantity: productDetails.quantity,
  price: productDetails.price,
  selectedColor: productDetails.selectedColor,
  selectedSize: productDetails.selectedSize,
  total: productDetails.price * productDetails.quantity,
  text: productDetails.text || "",               
  description: productDetails.description || "",  
};

const totalPrice = orderItem.total;

  try {
    const res = await axios.post(
      "http://localhost:5000/api/orders/create",
      {
        items: [orderItem],
        totalPrice,
        orderId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    console.log("Order successfully placed:", res.data);
    navigate("/orderconfirm", { state: { orderId, ...res.data } });

  } catch (error) {
    console.error("Error placing order:", error);
    alert("Something went wrong. Please try again.");
  }
};


  const handleDesign = () => {
    localStorage.setItem("productDetails", JSON.stringify({
      id,
      title,
      price,
      quantity,
      images,      
      selectedSize,
      selectedColor,
    }));

    navigate("/design");
  };

  return (
    <div style={{ padding: "40px" }}>
      <Row>
        <Col lg={2}>
          <div className="div" style={{ display: "flex", flexDirection: "column" }}>
            {images.map((image, index) => (
              <img
                className="Image"
                key={index}
                src={image}
                width={90}
                style={{ marginBottom: "20px" }}
                alt={`product-image-${index}`}
              />
            ))}
          </div>
        </Col>

        <Col lg={5}>
          <div style={{ marginLeft: "-12%" }}>
            <img
              className="mainImg"
              src={images[0] || ""}
              width={280}
              style={{ marginBottom: "20px" }}
              alt="product-main-image"
            />
            <h2 className="title">{title}</h2>
            <h3 className="price">${price}</h3>
            <p className="info" style={{ width: "100%" }}>{description.split(".")[0]}</p>

            <h5>Select Color:</h5>
            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
              {colors.map((color, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    backgroundColor: color,
                    border: selectedColor === color ? "2px solid black" : "1px solid gray",
                    cursor: "pointer"
                  }}
                />
              ))}
            </div>

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
                    fontWeight: "bold",
                    textAlign: "center"
                  }}
                >
                  {size}
                </div>
              ))}
            </div>

            <Button onClick={handleDesign} className="DesignBtn">Customize now</Button>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
              <Button variant="secondary" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>–</Button>
              <span style={{ fontWeight: "bold", fontSize: "18px" }}>{quantity}</span>
              <Button variant="secondary" onClick={() => setQuantity((prev) => prev + 1)}>+</Button>

              <Button
                className="cart"
                style={{ marginLeft: "10px" }}
                onClick={() => {
                  const currentCartItems = cartitems || {};
                  handleAddToCart({
                    ...currentCartItems,
                    [id]: {
                      images,
                      title,
                      price,
                      quantity,
                      selectedColor,
                      selectedSize,
                    }
                  });
                }}
              >
                Add to cart
              </Button>

              <Button
                  className="Buynowbtn"
                  onClick={() => {
                    navigate("/checkout", {
                         state: {
                         images: images?.[0] || "",
                         title,
                         price,
                         quantity,
                         selectedSize,
                         selectedColor,
                         designImage: null,
                         description: null,
                    },
                  });
                  }}
                  >
                  Buy Now
              </Button>
            </div>
          </div>
        </Col>

        <Col>
          <h2 style={{ marginLeft: "5%" }} className="similar">Other products under same category</h2>
          <div style={{ display: "flex", flexWrap: "wrap", marginLeft: "5%" }}>
            {otherProducts.map((product) => {
              if (product.id === id) return null;
              return (
                <Card key={product.id} style={{ width: "10rem", margin: "10px", border: "none" }}>
                  <Card.Img variant="top" src={product.images[0]} style={{ height: "10rem" }} />
                  <Card.Body>
                    <Card.Title>{product.title.split(" ")[1]}</Card.Title>
                    <Card.Text>${product.price}</Card.Text>
                    <Button className="viewbtn" onClick={() => navigate(`/product/${product.id}`, { state: product })}>
                      View item
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </Col>
      </Row>
    </div>
  );
}
