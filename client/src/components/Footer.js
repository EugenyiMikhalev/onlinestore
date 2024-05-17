import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { ABOUT_ROUTE, CONTACT_ROUTE, HOME_ROUTE, SHOP_ROUTE } from '../utils/consts';

const Footer = () => {

    const [email, setEmail] = useState('')

    async function click() {

    }

    return ( 
        <Container>
        <footer className="page-footer font-small blue pt-4 d-flex flex-column align-items-center px-5 mt-5" style={{borderTop: '2px solid rgba(0,0,0, 17%)'}}>
            <div className="container-fluid text-md-left py-5">
                <div className="row">
                    {/* <div className="col-md-6 mt-md-0 mt-3"> */}
                    <div className="col-md-3">
                        <h5 className="font-weight-bold">Furniro.</h5>
                        <address 
                            className='text-left'
                            style={{color: "#9F9F9F"}}
                        >
                            400 University Drive Suite 200 Coral Gables, <br/>
                            FL 33134 USA
                        </address>
                    </div>

                    <hr className="clearfix w-100 d-md-none pb-0"/>

                    <div className="col-md-3">
                        <h5 className="" 
                            style={{color: "#9F9F9F"}}
                        >Links</h5>
                        <ul className="list-unstyled">
                            <li className='my-4'>
                                <NavLink
                                    to={HOME_ROUTE}
                                    style={{color:'black', textDecoration: 'none', fontWeight: 'bold'}} 
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className='my-4'>
                                <NavLink
                                    to={SHOP_ROUTE}
                                    style={{color:'black', textDecoration: 'none', fontWeight: 'bold'}} 
                                >
                                    Shop
                                </NavLink>
                            </li>
                            <li className='my-4'>
                                <NavLink
                                    to={ABOUT_ROUTE}
                                    style={{color:'black', textDecoration: 'none', fontWeight: 'bold'}} 
                                >
                                    About
                                </NavLink>
                            </li>
                            <li className='my-4'>
                                <NavLink
                                    to={CONTACT_ROUTE}
                                    style={{color:'black', textDecoration: 'none', fontWeight: 'bold'}} 
                                >
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-3">
                        <h5 className=""
                            style={{color: "#9F9F9F"}}
                        >Help</h5>
                        <ul className="list-unstyled">
                        <li className='my-4'>
                                <NavLink
                                    to={HOME_ROUTE}
                                    style={{color:'black', textDecoration: 'none', fontWeight: 'bold'}} 
                                >
                                    Payment Options
                                </NavLink>
                            </li>
                            <li className='my-4'>
                                <NavLink
                                    to={SHOP_ROUTE}
                                    style={{color:'black', textDecoration: 'none', fontWeight: 'bold'}} 
                                >
                                    Returns
                                </NavLink>
                            </li>
                            <li className='my-4'>
                                <NavLink
                                    to={SHOP_ROUTE}
                                    style={{color:'black', textDecoration: 'none', fontWeight: 'bold'}} 
                                >
                                    Privacy Policies
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-3">
                        <h5 className=""
                            style={{color: "#9F9F9F"}}
                        >Newsletter</h5>
                        <Form className='d-flex flex-column form-subscribe'>
                            <Form.Control
                                className='mt-3'
                                placeholder='Enter Your Email Address'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Form>
                        <Button 
                        className='align-self-end mt-3'
                        variant={"outline-dark"}
                        onClick={click}
                        >
                            Subscribe
                        </Button>
                    </div>
                </div>
            </div>

            <div 
                className="footer-copyright text-left py-4"
                style={{fontWeight: 'bold', borderTop: '2px solid rgba(0,0,0, 17%)', width: '100%' }}
            >
                2024 furniro. All rights reverved
            </div>

        </footer>
        </Container>
     );
}
 
export default Footer;