import React, {useEffect} from 'react';
import { Carousel, Button, Card,Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Firstslide from "../assets/firstslide.png";
import Secondslide from "../assets/secondslide.png";
import Thirdslide from "../assets/thirdslide.png";
import qualityimg from "../assets/checked.png";
import fast from "../assets/fast-delivery.png";
import order from "../assets/order.png";
import support from "../assets/24-7.png"
import CardOne from "../assets/card1.png"
import CardTwo from "../assets/HomeHoodie.png"
import Facebook from "../assets/facebook.png";
import Instagram from "../assets/instagram.png"
import Twitter from "../assets/twitter.png"
import Firstscnd from "../assets/firstslidescnd.png"
import Secondscnd from "../assets/secondslidescnd.png"
import Thirdscnd from "../assets/thirdslidescnd.png"
import axios from 'axios';
import { useState } from 'react';
import { StepperContext } from '@mui/material';

const Home = () => {

  const navigate= useNavigate();
  const[Producters, setProducters]= useState([])
    const [customText, setCustomText] = useState("");
  

  useEffect(() => {
    async function getProducts() {
        const response = await axios.get('https://fakestoreapi.com/products');
        const filteredProducts = response.data.filter(
            (product) => product.title && product.image
        );
        setProducters(filteredProducts); 
    }
    getProducts();
}, []);


  return (
    <div style={{ padding: '5px', margin: '10px', boxShadow:'7', backgroundColor:'#ffffff'}}>
    <Card style={{backgroundColor:'#34e89e'}}>  
      <Carousel>
        <Carousel.Item>
          <img
            className="slides"
            src={Firstslide}
            alt="First slide"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
          <img className='SecondslideImage' src={Thirdscnd} alt="" />
          <Carousel.Caption>
            <h3 className='textslide'>Wear your story. Design your identity. Ink your vision. Express yourself.</h3>
            {/* <p style={{color:'black'}} className='para'>Start browsing products and design your product as you needed</p> */}
            <Button onClick={(e)=> navigate('/products')} className='browsebutton' variant="primary">Browse products</Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="slides"
            src={Secondslide}
            alt="Second slide"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
          <img className='SecondslideImages'  src={Firstscnd} alt="" />
          <Carousel.Caption>
            <h3 className='textslides' >Make heads turn, not just shirts... & Embrace the Unconventional</h3>
            {/* <p style={{color:'black'}} className='para'>Start browsing products and design your product as you needed</p> */}
            <Button onClick={(e)=> navigate('/products')} className='browsebutton' variant="primary">Browse products</Button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>

          <img
            className="slides"
            src={Thirdslide}
            alt="Third slide"
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
          <img className='SecondslideImages' style={{maxHeight:'400px', objectFit:'cover', marginTop:'-34%',marginLeft:'-2%'}} src={Secondscnd} alt="" />
          <Carousel.Caption>
            <h3 className='textslide'>Wear Your Passion, Make a Statement Design your own customized Tshirts</h3>
            {/* <p style={{color:'black'}} className='para'>Start browsing products and design your product as you needed</p> */}
            <Button onClick={(e)=> navigate('/products')} className='browsebutton' variant="primary">Browse products</Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      </Card>
      <div className='secondcard' style={{padding:'2px'}}>
        <Card className='subcards'>
            <h4>Quality Product</h4>
            <img src={qualityimg} alt="" className="subcard"  />
        </Card>
        <Card className='subcards'>
            <h4>Fast Delivey</h4>
            <img src={fast} alt="" className="subcard"  />
        </Card>
        <Card className='subcards'>
            <h4>Easy ordering</h4>
            <img src={order} alt="" className="subcard"  />
        </Card>
        <Card className='subcards'>
            <h4>24/7 Support</h4>
            <img src={support} alt="" className="subcard"  />
        </Card>
      </div>
      <div className='secondslide' style={{padding:'4px',marginTop:'2%',}}>
        <Card className='cardu' style={{padding:'10px',backgroundColor:'lightcoral'}}>
          <h4 className='subheading'>CUSTOMIZABLE</h4>
          <div className='divhead'><h3>TEES</h3></div>
          <img src={CardOne} alt="" className='subslide' />
          <p className='cardpara'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, rerum?</p>
          <Button onClick={(e)=> navigate('/tshirt')} className='explorebtn' >Explore now</Button>
        </Card>
        <Card className='cardu' style={{padding:'10px',backgroundColor:'lightblue'}}>
          <h4 className='subheading'>GRAPHIC</h4>
          <div className='divhead'><h3>TEES</h3></div>
          <img src={CardTwo} alt="" className='subslide' />
          <p className='cardpara'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, rerum?</p>
          <Button onClick={(e)=> navigate('/hoodie')} className='explorebtn'>Explore now</Button>
        </Card>
      </div>
      <div className='SecondApi' style={{ padding: '40px', backgroundColor:'#fceabb'}}>
            <h2 className="dash-line-heading">Shop by needs (Non Customisible)</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {Producters.map((product) => (
                    <Card className='SecondapiCard' key={product.id} style={{  margin: '20px',display:'flex',justifyContent:'center', alignItems:'center',padding:'10px', backgroundColor:'#f5f7e3 ' }}>
                        <Card.Img className='FakeImg' variant="top" src={product.image}/>
                        <Card.Body>
                            <Card.Title>{product.title}</Card.Title>
                            <Card.Text>${product.price}</Card.Text>
                            <Button  onClick={() => {
                  navigate("/checkout", {
                    state: {
                      images: [product.image],
                      title: product.title,
                      Text: customText,
                      price: product.price,
                      quantity: 1,
                    }
                  });
                }} >
                                Buy now
                            </Button>

                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
      <div style={{marginTop:'3%'}} className="boxes">
                <div className="detail">
                    <ul>
                        <li><h4>Core Links</h4></li>
                        <li>Products</li>
                        <li>About Us</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
                <div className="detail">
                    <ul>
                        <li><h4>Support</h4></li>
                        <li>FAQs</li>
                        <li>Terms&Conditions</li>
                        <li>Customer Support</li>
                    </ul>
                </div>
                <div className="detail">
                    <ul>
                        <li><h4>Contact</h4></li>
                        <li>+91969639393</li>
                        <li>printrest@gmail.com</li>
                        <li>Bangalore</li>
                    </ul>
                </div>
                <div className="detail">
                    <ul>
                        <li><h4>Follow-us-on</h4></li>
                        <div className="social-media">
                           <img style={{height:'19px'}} src={Facebook} alt="" />
                           <img style={{height:'19px'}}  src={Instagram} alt="" />
                           <img style={{height:'19px'}}  src={Twitter} alt="" />
                       </div>    
                    </ul>
                </div>
            </div>
    </div>
  );
};

export default Home;
