import React, { useContext, useEffect, useState } from 'react';
import { check, getItems } from '../http/userAPI';
import { fetchDevices } from '../http/deviceAPI';
import { CART_ROUTE, CHECKOUT_ROUTE, HOME_ROUTE } from '../utils/consts';
import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../assets/navIcons/navLogo.svg'
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { reaction } from 'mobx';


const Checkout = observer(() => {

    const [cart, setCart] = useState([])
    const [devices, setDevices] = useState([])
    const [delivery, setDelivery] = useState('mail')
    const [city, setCity] = useState('Moscow');

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };
    const {device, user} = useContext(Context)

//     reaction(() => user.cartUpdated, 

// )

    useEffect( () => {
        //фетчим айди юзера, затем по этому айди его корзину
        check().then(
            data => {
                console.log(data);
                // setUserId(data.id);
                console.log(data.id)
                getItems(data.id).then(data1 => {
                    console.log(data1); 
                    setCart(data1.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)));
                    // user.setCart([...user.cart, data1.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))]);
                }, error => console.log(error))
            }
             , 
            error => console.log(error)
        )
        //фетчим все девайсы магазина для получания данных девайсов корзины (в корзине етсь только айди девайса и цена)
        fetchDevices({}, {}, 1, 10000, '').then(data => {setDevices(data.rows); console.log(data.rows)}, error => console.log(error))
    } , [user.cartUpdated])

    useEffect(() => {
        const handleStorageChange = (event) => {
            console.log('in handleStorageChange');
            if(event.key === 'cart' || event.key === 'cartUpdated') {
                user.loadCartFromLocalStorage();
            }
        }
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange)
        }
    }, [user.cartUpdated])

    return ( 
        <>
        <Container className='shop-background py-5 mb-4 d-flex flex-column align-items-center'>
            <NavLink 
                style={{textDecoration: 'none'}} 
                to={HOME_ROUTE} 
                className={'d-flex align-items-center mt-3'}
            >
                <img style={{width: 77, height:77}} src={logo} alt='Furniro'/>
            </NavLink>
            {/* <img src={logo} style={{width: 77, height:77}} alt='logo' className='mt-3'/> */}
            <h1 
                className='text-center'
                style={{fontSize: 48}}
            >
                Checkout
            </h1>
            <div 
                style={{color: '#000', fontSize: 20}} 
                className='mt-1 pb-4 d-flex gap-2 align-items-center justify-content-center'
            >
                <NavLink
                    style={{textDecoration: 'none'}} 
                    to={HOME_ROUTE} 
                    className={'d-flex align-items-center m-0'}
                    >
                    <h2 style={{fontSize: 16, color: '#000', margin: 0}} className=''>Home</h2>
                </NavLink>
                {'>'} 
                <NavLink 
                    style={{textDecoration: 'none', display: 'inline-block'}} 
                    to={CART_ROUTE} 
                    className={'d-flex align-items-center'}
                    >
                    <h2 style={{fontSize: 16, color: '#000', margin: 0}} className=''>Cart</h2>
                </NavLink>
                {'>'} 
                <NavLink 
                    style={{textDecoration: 'none', display: 'inline-block'}} 
                    to={CHECKOUT_ROUTE} 
                    className={'d-flex align-items-center'}
                    >
                    <h2 style={{fontSize: 16, color: '#000', margin: 0}} className=''>Checkout</h2>
                </NavLink> 
            </div>
        </Container>
        <Container>
            <Row className='d-flex justify-content-around'>
                <Col md={4}>
                <h2>Billing details</h2>
                <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label style={{fontSize: 16, fontWeight: 600}} className='mb-2'>First name</Form.Label>
                            <Form.Control type="text" placeholder="Jhon" 
                                className='py-3'
                                style={{border: '1px solid #9F9F9F', borderRadius: '10px'}}
                            />
                            <Form.Label style={{fontSize: 16, fontWeight: 600}} className='mb-2 mt-3'>Last name</Form.Label>
                            <Form.Control type="text" placeholder="Jhonson" 
                                className='py-3'
                                style={{border: '1px solid #9F9F9F', borderRadius: '10px'}}
                            />
                            <Form.Label style={{fontSize: 16, fontWeight: 600}} className='mb-2 mt-3'>Email address</Form.Label>
                            <Form.Control type="email" placeholder="example@mail.com" 
                                className='py-3'
                                style={{border: '1px solid #9F9F9F', borderRadius: '10px'}}
                            />
                            <Form.Label style={{fontSize: 16, fontWeight: 600}} className='mb-2 mt-3'>Phone</Form.Label>
                            <Form.Control type="phone" placeholder="79991234567" 
                                className='py-3'
                                style={{border: '1px solid #9F9F9F', borderRadius: '10px'}}
                            />
                            <Form.Label style={{fontSize: 16, fontWeight: 600}} className='mb-2 mt-3'>Delivery type</Form.Label>
                            {/* <Form.Control type="text" placeholder="This is an optional" 
                                className='py-3'
                                style={{border: '1px solid #9F9F9F', borderRadius: '10px'}}
                            /> */}
                            <Form.Check // prettier-ignore
                                type={'radio'}
                                id={`courier`}
                                label={`courier`}
                                name='delivery'
                                onClick={() => setDelivery('courier')}
                            />
                            <Form.Check
                                defaultChecked
                                name='delivery'
                                type={'radio'}
                                label={`mail`}
                                id={`mail`}
                                onClick={() => setDelivery('mail')}
                            />
                        {(delivery === 'mail') && <><Form.Label style={{fontSize: 16, fontWeight: 600}} className='mb-2 mt-3'>Zip Code</Form.Label>
                            <Form.Control type="text" placeholder="Enter ZIP CODE" 
                                className='py-3'
                                style={{border: '1px solid #9F9F9F', borderRadius: '10px'}}
                            />
                        </>
                        }
                        <Form.Label style={{fontSize: 16, fontWeight: 600}} className='mb-2 mt-3'>City</Form.Label>
                        <Form.Control type="text" placeholder="Moscow" 
                            className='py-3'
                            style={{border: '1px solid #9F9F9F', borderRadius: '10px'}}
                            value={(delivery === 'courier') ? 'Moscow' : city}
                            onChange={handleCityChange}
                            disabled={delivery === 'courier'} // Disable input if delivery is mail
                        />
                        <Form.Label style={{fontSize: 16, fontWeight: 600}} className='mb-2 mt-3'>Street name</Form.Label>
                        <Form.Control type="text" placeholder="Tverskaya street" 
                            className='py-3'
                            style={{border: '1px solid #9F9F9F', borderRadius: '10px'}}
                            // value={(delivery === 'courier') ? 'Moscow' : city}
                            // onChange={handleCityChange}
                            // disabled={delivery === 'courier'} // Disable input if delivery is mail
                        />
                        <Form.Label style={{fontSize: 16, fontWeight: 600}} className='mb-2 mt-3'>House number</Form.Label>
                        <Form.Control type="text" placeholder="1" 
                            className='py-3'
                            style={{border: '1px solid #9F9F9F', borderRadius: '10px'}}
                            // value={(delivery === 'courier') ? 'Moscow' : city}
                            // onChange={handleCityChange}
                            // disabled={delivery === 'courier'} // Disable input if delivery is mail
                        />
                        <Form.Label style={{fontSize: 16, fontWeight: 600}} className='mb-2 mt-3'>Flat number</Form.Label>
                        <Form.Control type="text" placeholder="1" 
                            className='py-3'
                            style={{border: '1px solid #9F9F9F', borderRadius: '10px'}}
                            // value={(delivery === 'courier') ? 'Moscow' : city}
                            // onChange={handleCityChange}
                            // disabled={delivery === 'courier'} // Disable input if delivery is mail
                        />
                        </Form.Group>
                        <Button variant="primary" type="submit" className='contact__submit-button px-5'
                            style={{fontSize: 16, fontWeight: 400}}
                        >
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col md={4} className=''>
                <Table responsive>
                        <thead >
                            <tr>
                                <th className='py-3' style={{backgroundColor: '#F9F1E7'}}>Product</th>
                                <th className='py-3' style={{backgroundColor: '#F9F1E7'}}>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart && cart.map(cartDevice =>
                                <tr
                                    key={cartDevice.id}
                                    className='cart-table'
                                >
                                    <th style={{fontWeight: 400}}>
                                        <img style={{width: 60, height: 60, borderRadius: 5, marginRight: 10}} src={process.env.REACT_APP_API_URL + devices.find((device) => {
                                            return device.id === cartDevice.deviceId 
                                        }).img}></img>
                                        {'' + devices.find((device) => {
                                            return device.id === cartDevice.deviceId 
                                        }).name + ' x ' + cartDevice.quantity }
                                    </th>
                                    <th style={{fontWeight: 400}}
                                        // className='d-flex align-items-center'
                                    >
                                        {cartDevice.quantity * cartDevice.price}₽
                                    </th>
                                    {/* <th style={{fontWeight: 400}}>
                                        <Button variant='light' className='me-2'
                                            onClick={() => {
                                                if(cartDevice.quantity > 1)
                                                    changeQuantity(cartDevice.deviceId, cartDevice.basketId, cartDevice.quantity - 1)
                                                else
                                                    removeItem(cartDevice.deviceId,cartDevice.basketId).then(data => console.log(data), error => console.log(error))

                                                setIsCartUpdated(true)
                                            }}
                                        >
                                            -
                                        </Button>
                                        {cartDevice.quantity}
                                        <Button variant='light' className='ms-2'
                                            onClick={() => {
                                                changeQuantity(cartDevice.deviceId, cartDevice.basketId, cartDevice.quantity + 1)
                                                setIsCartUpdated(true)
                                            }}
                                        >
                                            +
                                        </Button>
                                    </th>
                                    <th style={{fontWeight: 400}}>
                                        {cartDevice.quantity * cartDevice.price}₽
                                    </th>
                                    <th style={{fontWeight: 400}}>
                                        <Button 
                                        onClick={async() => {
                                            console.log(cartDevice.deviceId,cartDevice.basketId)
                                            let data = await removeItem(cartDevice.deviceId,cartDevice.basketId).then(data => console.log(data), error => console.log(error))
                                            setIsCartUpdated(true)
                                        }} 
                                        variant='danger' 
                                        value={cartDevice.deviceId}>
                                            Remove
                                        </Button>
                                    </th> */}
                                </tr>
                                )}
                                <tr>
                                    <th style={{backgroundColor: '#F9F1E7'}}>
                                        Total
                                    </th>
                                    <th style={{backgroundColor: '#F9F1E7'}}>
                                        {cart.length === 0 ? '0' : cart.reduce((accumulator, cartDevice) => accumulator + cartDevice.quantity * cartDevice.price, 0,)}₽
                                    </th>
                                </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
        </>
     );
})

export default Checkout;