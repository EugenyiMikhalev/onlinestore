import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, Card } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import trophyIcon from '../assets/contact/trophy.png';
import guaranteeIcon from '../assets/contact/guarantee.png';
import shippingIcon from '../assets/contact/shipping.png';
import customerIcon from '../assets/contact/customer.png';
import { addItem, changeQuantity, check, getItems, removeItem } from '../http/userAPI.js';
import { fetchDevices, fetchOneDevice } from '../http/deviceAPI.js';
import { CART_ROUTE, CHECKOUT_ROUTE, HOME_ROUTE } from '../utils/consts.js';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/navIcons/navLogo.svg'
import { Context } from '../index.js';


const Cart = observer(() => {

    // const [userId, setUserId] = useState()
    const [cart, setCart] = useState([])
    const [devices, setDevices] = useState([])
    const [isCartUpdated, setIsCartUpdated] = useState(false)
    const {device, user} = useContext(Context)

    const navigate = useNavigate()

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
                    user.setCart(data1.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)));
                    let cartValue = user.cart
                    console.log('user.setCart updated' + cartValue)
                }, error => console.log(error))
            }
             , 
            error => console.log(error)
        )
        //фетчим все девайсы магазина для получения данных девайсов корзины (в корзине етсь только айди девайса и цена)
        fetchDevices({}, {}, 1, 10000, '').then(data => {setDevices(data.rows); console.log(data.rows)}, error => console.log(error))
        // setIsCartUpdated(false)
        // user.setCartUpdated(!user.cartUpdated)
    } , 
    // [isCartUpdated]
    [user.cartUpdated]
)
    useEffect(() => {
        const handleStorageChange = (event) => {
            console.log('in handleStorageChange');
            if(event.key === 'cart' || event.key === 'cartUpdated') {
                user.loadCartFromLocalStorage();
            }
        }
        window.addEventListener('storage', handleStorageChange);
        // return () => {
        //     window.removeEventListener('storage', handleStorageChange)
        // }
}, [user.cartUpdated])

    // const getCartDeviceName = (cartDeviceId) => {
    //     let cartDeviceName = fetchOneDevice(cartDeviceId).then(data => data.name)
    //     // fetchOneDevice(cartDeviceId).then(data => {cartDeviceName = data.name; console.log(cartDeviceName); console.log(data.name)}, error => console.log(error))
    //     console.log(cartDeviceName)
    //     return 1
    // }

    const handleRemoveItem = (e) => {
        console.log(e.target.value)
    }

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
                Cart
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
            </div>
        </Container>
        <Container className='mt-2'> 
            <Row>
                <Col md={8}>
                    <Table responsive>
                        <thead >
                            <tr>
                                <th className='py-3' style={{backgroundColor: '#F9F1E7'}}>Product</th>
                                <th className='py-3' style={{backgroundColor: '#F9F1E7'}}>Price</th>
                                <th className='py-3' style={{backgroundColor: '#F9F1E7'}}>Quantity</th>
                                <th className='py-3' style={{backgroundColor: '#F9F1E7'}}>Subtotal</th>
                                <th className='py-3' style={{backgroundColor: '#F9F1E7'}}></th>
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
                                        {devices.find((device) => {
                                            return device.id === cartDevice.deviceId 
                                        }).name}
                                    </th>
                                    <th style={{fontWeight: 400}}
                                        // className='d-flex align-items-center'
                                    >
                                        {cartDevice.price}₽
                                    </th>
                                    <th style={{fontWeight: 400}}>
                                        <Button variant='light' className='me-2'
                                            onClick={() => {
                                                if(cartDevice.quantity > 1)
                                                    changeQuantity(cartDevice.deviceId, cartDevice.basketId, cartDevice.quantity - 1)
                                                else
                                                    removeItem(cartDevice.deviceId,cartDevice.basketId).then(data => console.log(data), error => console.log(error))

                                                // setIsCartUpdated(true)
                                                user.setCartUpdated(!user.cartUpdated)
                                            }}
                                        >
                                            -
                                        </Button>
                                        {cartDevice.quantity}
                                        <Button variant='light' className='ms-2'
                                            onClick={() => {
                                                changeQuantity(cartDevice.deviceId, cartDevice.basketId, cartDevice.quantity + 1)
                                                // setIsCartUpdated(true)
                                                user.setCartUpdated(!user.cartUpdated)

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
                                            // setIsCartUpdated(true)
                                            user.setCartUpdated(!user.cartUpdated)

                                        }} 
                                        variant='danger' 
                                        value={cartDevice.deviceId}>
                                            Remove
                                        </Button>
                                    </th>
                                </tr>
                                )}
                        </tbody>
                    </Table>
                    {cart.length === 0 ? 'Your cart is empty...' : ''}

                </Col>
                <Col md={4}>
                    <Card 
                        style={{backgroundColor: '#F9F1E7', border: 'none', borderRadius: 0}}
                        className='px-5 pb-5'
                    >
                        <Card.Body className='d-flex flex-column align-items-center'>
                            <Card.Title style={{fontSize: 32, fontWeight: 600, textAlign: 'center'}}>Cart Totals</Card.Title>
                            <Card.Text className='d-flex justify-content-between my-5 w-100'
                                style={{fontSize: 16, fontWeight: 500}}
                            >
                                Total <span style={{color: '#B88E2F', fontSize: 20}}>{cart.length === 0 ? '0' : cart.reduce((accumulator, cartDevice) => accumulator + cartDevice.quantity * cartDevice.price, 0,)}₽</span>
                            </Card.Text>
                            <Button
                                style={{fontWeight: 400, fontSize: 20, alignSelf: 'center', margin: 'auto'}}
                                className='px-5 py-2 align-self-center my-auto cart__button-add'
                                onClick={() => navigate(CHECKOUT_ROUTE)}
                            >Check Out</Button>
                        </Card.Body>
                    </Card>
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
 
export default Cart;