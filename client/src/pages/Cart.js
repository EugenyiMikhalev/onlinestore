import Reactfrom from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import trophyIcon from '../assets/contact/trophy.png';
import guaranteeIcon from '../assets/contact/guarantee.png';
import shippingIcon from '../assets/contact/shipping.png';
import customerIcon from '../assets/contact/customer.png';


const Shop = observer(() => {

    
    return (
        <>
        <Container className='shop-background py-5 mb-4'>
            <h1 
                className='text-center pt-5'
                style={{fontSize: 48}}
            >
                Cart
            </h1>
            <h2
                className='text-center pb-5'
                style={{fontSize: 16}}
            >
                Home {">"} Cart
            </h2>
        </Container>
        <Container className='mt-2'> 
            <Row>
                <Col md={8}>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {device.types && device.types.map(type =>
                                <tr
                                    key={type.id}
                                    
                                >
                                    <th style={{fontWeight: 400}}>{type.name}</th>
                                    <th style={{fontWeight: 400}}>{new Date(type.createdAt).toLocaleDateString("ru", 
                                        {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                                    </th>
                                    <th>
                                    <Button variant='danger'
                                        type='button'
                                        onClick={handleClick}
                                    >
                                        Delete
                                    </Button>
                                    </th>
                                </tr>
                                )} */}
                        </tbody>
                    </Table>
                </Col>
                <Col md={4}>
                
                </Col>
            </Row>
        </Container>
        <Container style={{backgroundColor: '#FAF3EA', width: '100%', padding: 0}} className='my-5 d-flex justify-content-between py-5 px-4'>
        <div className='d-flex justify-content-center align-items-center gap-3' style={{textDecoration: 'none'}} >
            <img src={trophyIcon} style={{width: 60, height: 60}}/>
            <div className='d-flex flex-column' style={{width: 212}}>
                <span style={{fontSize: 25, fontWeight: 600, color: '#000'}}>High Quality</span>
                <span style={{fontSize: 20, fontWeight: 500, color: '#898989'}}>crafted from top materials</span>
            </div>
        </div>
        <div className='d-flex justify-content-center align-items-center gap-3' style={{textDecoration: 'none'}} >
            <img src={guaranteeIcon} style={{width: 60, height: 60}}/>
            <div className='d-flex flex-column' style={{width: 212}}>
                <span style={{fontSize: 25, fontWeight: 600, color: '#000'}}>Warranty Protection</span>
                <span style={{fontSize: 20, fontWeight: 500, color: '#898989'}}>Over 2 years</span>
            </div>
        </div>
        <div className='d-flex justify-content-center align-items-center gap-3' style={{textDecoration: 'none'}} >
            <img src={shippingIcon} style={{width: 60, height: 60}}/>
            <div className='d-flex flex-column' style={{width: 212}}>
                <span style={{fontSize: 25, fontWeight: 600, color: '#000'}}>Free Shipping</span>
                <span style={{fontSize: 20, fontWeight: 500, color: '#898989'}}>Order over 150 $</span>
            </div>
        </div>
        <div className='d-flex justify-content-center align-items-center gap-3' style={{textDecoration: 'none'}} >
            <img src={customerIcon} style={{width: 60, height: 60}}/>
            <div className='d-flex flex-column' style={{width: 212}}>
                <span style={{fontSize: 25, fontWeight: 600, color: '#000'}}>24 / 7 Support</span>
                <span style={{fontSize: 20, fontWeight: 500, color: '#898989'}}>Dedicated support</span>
            </div>
        </div>
    </Container>
        </>
    );
})
 
export default Shop;