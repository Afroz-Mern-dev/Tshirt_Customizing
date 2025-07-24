import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, } from "react-router-dom";

export default function ProductsInfo() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getProducts() {
            const response = await axios.get('https://api.escuelajs.co/api/v1/products?offset=0&limit=36');
            const filteredProducts = response.data.filter(
                (product) => product.title && product.images && product.images.length > 0
            );
            setProducts(filteredProducts); 
        }
        getProducts();
    }, []);

    return (
        <div style={{ padding: '40px', backgroundColor:'#fceabb' }}>
            <h2 className="dash-line-heading">Top picks for you</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {products.map((product) => (
                    <Card key={product.id} style={{ width: '18rem', margin: '20px', border: 'none' }}>
                        <Card.Img variant="top" src={product.images[0]} style={{ height: '17rem' }} />
                        <Card.Body>
                            <Card.Title>{product.title}</Card.Title>
                            <Card.Text>${product.price}</Card.Text>
                            <Button onClick={() => navigate(`/product/${product.id}`, { state: product })}>
                                View item
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
}