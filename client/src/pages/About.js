import React from 'react';
import { Card, Col, Container, Form, FormControl, Row } from 'react-bootstrap';
import post1_img from '../assets/about/post1.png'
import post_author from '../assets/about/post_author.png'
import post_date from '../assets/about/post_date.png'
import trophyIcon from '../assets/contact/trophy.png';
import guaranteeIcon from '../assets/contact/guarantee.png';
import shippingIcon from '../assets/contact/shipping.png';
import customerIcon from '../assets/contact/customer.png';

const About = () => {
    return ( 
        <>
        <Container>
        <Container className='about-background py-5 mb-5'>
            <h1 
                className='text-center pt-5'
                style={{fontSize: 48}}
            >
                About
            </h1>
            <h2
                className='text-center pb-5'
                style={{fontSize: 16}}
            >
                Home {">"} About
            </h2>
        </Container>
        <Container className=''> 
            
        </Container>
            <Row>
                <Col md={8} className='px-5'>
                    <Card>
                        <Card.Img variant="top" src={post1_img} />
                        <Card.Body className='d-flex justify-content-center flex-column'>
                            <Card.Title style={{fontSize: 30, fontWeight: 600}}>Going all-in with millennial design</Card.Title>
                            {/* <Card.Text> */}
                                <div 
                                    className='d-flex mb-2 gap-4' 
                                    style={{fontSize: 16, color: '#9F9F9F'}}
                                >
                                    <div className='d-flex align-items-center gap-2'>
                                        <img src={post_author} alt='post1_author' style={{width: 15, height: 15}} />
                                        Admin
                                    </div>
                                    <div className='d-flex align-items-center gap-2'>
                                        <img src={post_date} alt='post_date' style={{width: 15, height: 15}} />
                                        03 Aug 2022
                                    </div>
                                </div>
                                <div 
                                    className='' 
                                    style={{fontSize: 15, fontWeight: 500, color: '#9F9F9F'}}
                                >
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum.
                                </div>
                            {/* </Card.Text> */}
                            <Card.Link href="#" className='text-black' style={{fontWeight: 500, fontSize: 16}}>Read more</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className='px-5'>
                <Form className='form-subscribe mb-5'>
                    <FormControl 
                        placeholder='Search for posts...'
                        // value={value}
                        onChange={value => value}
                    /> </Form>
                    <h3 style={{fontSize: 24, fontWeight: 500}}>Categories</h3>
                    <ul className="list-unstyled mb-5">
                        <li className='my-4 d-flex justify-content-between' style={{color:'#9F9F9F', textDecoration: 'none', fontWeight: '500', fontSize: 16}} >
                            Crafts <span>2</span>
                        </li>
                        <li className='my-4 d-flex justify-content-between' style={{color:'#9F9F9F', textDecoration: 'none', fontWeight: '500', fontSize: 16}} >
                            Design <span>8</span>
                        </li>
                        <li className='my-4 d-flex justify-content-between' style={{color:'#9F9F9F', textDecoration: 'none', fontWeight: '500', fontSize: 16}} >
                            Handmade <span>7</span>
                        </li>
                        <li className='my-4 d-flex justify-content-between' style={{color:'#9F9F9F', textDecoration: 'none', fontWeight: '500', fontSize: 16}} >
                            Interior <span>1</span>
                        </li>
                        <li className='my-4 d-flex justify-content-between' style={{color:'#9F9F9F', textDecoration: 'none', fontWeight: '500', fontSize: 16}} >
                            Wood <span>6</span>
                        </li>
                    </ul>
                    <h3 style={{fontSize: 24, fontWeight: 500}}>Recent Posts</h3>
                    <ul className="list-unstyled ">
                        <li className='my-4 d-flex justify-content-left gap-2' style={{color:'#9F9F9F', textDecoration: 'none', fontWeight: '500', fontSize: 16}} >
                            <img style={{width: 80, height: 80, borderRadius: "10px"}} src={post1_img}/>
                            <div className='d-flex flex-column gap-2'>
                            <span style={{fontSize: 14, color: '#000', fontWeight:400}}>Going all-in with millennial design</span> 
                            <span style={{fontSize: 12, fontWeight:400}}>03 Aug 2022</span>
                            </div>
                        </li>
                        <li className='my-4 d-flex justify-content-left gap-2' style={{color:'#9F9F9F', textDecoration: 'none', fontWeight: '500', fontSize: 16}} >
                            <img style={{width: 80, height: 80, borderRadius: "10px"}} src={post1_img}/>
                            <div className='d-flex flex-column gap-2'>
                            <span style={{fontSize: 14, color: '#000', fontWeight:400}}>Going all-in with millennial design</span> 
                            <span style={{fontSize: 12, fontWeight:400}}>03 Aug 2022</span>
                            </div>
                        </li>
                        <li className='my-4 d-flex justify-content-left gap-2' style={{color:'#9F9F9F', textDecoration: 'none', fontWeight: '500', fontSize: 16}} >
                            <img style={{width: 80, height: 80, borderRadius: "10px"}} src={post1_img}/>
                            <div className='d-flex flex-column gap-2'>
                            <span style={{fontSize: 14, color: '#000', fontWeight:400}}>Going all-in with millennial design</span> 
                            <span style={{fontSize: 12, fontWeight:400}}>03 Aug 2022</span>
                            </div>
                        </li>
                        <li className='my-4 d-flex justify-content-left gap-2' style={{color:'#9F9F9F', textDecoration: 'none', fontWeight: '500', fontSize: 16}} >
                            <img style={{width: 80, height: 80, borderRadius: "10px"}} src={post1_img}/>
                            <div className='d-flex flex-column gap-2'>
                            <span style={{fontSize: 14, color: '#000', fontWeight:400}}>Going all-in with millennial design</span> 
                            <span style={{fontSize: 12, fontWeight:400}}>03 Aug 2022</span>
                            </div>
                        </li>
                        <li className='my-4 d-flex justify-content-left gap-2' style={{color:'#9F9F9F', textDecoration: 'none', fontWeight: '500', fontSize: 16}} >
                            <img style={{width: 80, height: 80, borderRadius: "10px"}} src={post1_img}/>
                            <div className='d-flex flex-column gap-2'>
                            <span style={{fontSize: 14, color: '#000', fontWeight:400}}>Going all-in with millennial design</span> 
                            <span style={{fontSize: 12, fontWeight:400}}>03 Aug 2022</span>
                            </div>
                        </li>
                    </ul>
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
}
 
export default About;