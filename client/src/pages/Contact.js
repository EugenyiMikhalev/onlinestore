import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import addressIcon from '../assets/contact/address.png';
import phoneIcon from '../assets/contact/phone.png';
import timeIcon from '../assets/contact/time.png';
import trophyIcon from '../assets/contact/trophy.png';
import guaranteeIcon from '../assets/contact/guarantee.png';
import shippingIcon from '../assets/contact/shipping.png';
import customerIcon from '../assets/contact/customer.png';



const Contact = () => {
    return ( 
        <>
        <Container>
            <Container className='contact-background py-5 mb-5'>
                <h1 
                    className='text-center pt-5'
                    style={{fontSize: 48}}
                >
                    Contact
                </h1>
                <h2
                    className='text-center pb-5'
                    style={{fontSize: 16}}
                >
                    Home {">"} Contact
                </h2>
            </Container>
            <Container className='d-flex flex-column align-items-center'>
                <h2 style={{fontSize: 36, fontWeight: 500, color: 'black'}}>Get In Touch With Us</h2>
                <h3 className='mt-2 mb-5' style={{fontSize: 16, fontWeight: 400, color: '#9F9F9F', maxWidth: 644, textAlign:'center'}}>For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</h3>
                <Row style={{width: '70%'}}>
                    <Col md={5}>
                        <ul className="list-unstyled mb-5 d-flex flex-column align-items-start justify-content-center">
                            <li className='my-4 d-flex justify-content-between gap-4' style={{textDecoration: 'none'}} >
                                <img src={addressIcon} style={{width: 27, height: 27}}/>
                                <div className='d-flex flex-column' style={{width: 212}}>
                                    <span style={{fontSize: 24, fontWeight: 600, color: '#000'}}>Address</span>
                                    <span style={{fontSize: 16, fontWeight: 400, color: '#000'}}>236 5th SE Avenue, New York NY10000, United States</span>
                                </div>
                            </li>
                            <li className='my-4 d-flex justify-content-between gap-4' style={{textDecoration: 'none'}} >
                                <img src={phoneIcon} style={{width: 27, height: 27}}/>
                                <div className='d-flex flex-column' style={{width: 212}}>
                                    <span style={{fontSize: 24, fontWeight: 600, color: '#000'}}>Phone</span>
                                    <span style={{fontSize: 16, fontWeight: 400, color: '#000'}}>Mobile: +(84) 546-6789 <br/>Hotline: +(84) 456-6789</span>
                                </div>
                            </li>
                            <li className='my-4 d-flex justify-content-between gap-4' style={{textDecoration: 'none'}} >
                                <img src={timeIcon} style={{width: 27, height: 27}}/>
                                <div className='d-flex flex-column' style={{width: 212}}>
                                    <span style={{fontSize: 24, fontWeight: 600, color: '#000'}}>Working Time</span>
                                    <span style={{fontSize: 16, fontWeight: 400, color: '#000'}}>Monday-Friday: 9:00 - 22:00 <br/>Saturday-Sunday: 9:00 - 21:00</span>
                                </div>
                            </li>
                        </ul>
                        <div>
                           
                        </div>
                    </Col>
                    <Col md={7}>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label style={{fontSize: 16, fontWeight: 600}} className='mb-3'>Your name</Form.Label>
                            <Form.Control type="text" placeholder="Abc" 
                                className='py-3'
                                style={{border: '1px solid #9F9F9F', borderRadius: '10px'}}
                            />
                            <Form.Label style={{fontSize: 16, fontWeight: 600}} className='mb-3 mt-5'>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Abc@def.com" 
                                className='py-3'
                                style={{border: '1px solid #9F9F9F', borderRadius: '10px'}}
                            />
                            <Form.Label style={{fontSize: 16, fontWeight: 600}} className='mb-3  mt-5'>Subject</Form.Label>
                            <Form.Control type="text" placeholder="This is an optional" 
                                className='py-3'
                                style={{border: '1px solid #9F9F9F', borderRadius: '10px'}}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label style={{fontSize: 16, fontWeight: 600}} className='mb-3  mt-5'>Message</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder='Hi! i’d like to ask about'
                                className='py-3'
                                style={{border: '1px solid #9F9F9F', borderRadius: '10px'}}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className='contact__submit-button px-5'
                            style={{fontSize: 16, fontWeight: 400}}
                        >
                            Submit
                        </Button>
                        </Form>
                    </Col>
                </Row>
            
            </Container>
            
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
}
 
export default Contact;