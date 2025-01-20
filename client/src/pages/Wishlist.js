import { observer } from 'mobx-react-lite';
import React, {useContext, useEffect, useState} from 'react';
import { HOME_ROUTE, LOGIN_ROUTE, WISHLIST_ROUTE } from '../utils/consts.js';
import logo from '../assets/navIcons/navLogo.svg'
import { Context } from '../index.js';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, NavLink, Row, Table } from 'react-bootstrap';
import { addItem, check, getItemsWishlist, removeItemWishlist } from '../http/userAPI.js';
import trophyIcon from '../assets/contact/trophy.png';
import guaranteeIcon from '../assets/contact/guarantee.png';
import shippingIcon from '../assets/contact/shipping.png';
import customerIcon from '../assets/contact/customer.png';
import { fetchDevices } from '../http/deviceAPI.js';
import cartIcon from '../assets/navIcons/cart.svg'

const Wishlist = observer(() => {

    const [wishlist, setWishlist] = useState([])
    const [devices, setDevices] = useState([])
    const [isWishlistUpdated, setisWishlistUpdated] = useState(false)
    const [userId, setUserId] = useState()

    const {device, user} = useContext(Context)

    const navigate = useNavigate()

    useEffect(() => {
        check().then(
            data => {setUserId(data.id)}
             , 
            error => console.log(error)
        )
    }, [])

    useEffect( () => {
        //фетчим айди юзера, затем по этому айди его корзину
        check().then(
            data => {
                console.log(data);
                // setUserId(data.id);
                console.log(data.id)
                getItemsWishlist(data.id).then(data1 => {
                    console.log(data1); 
                    setWishlist(data1.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)));
                    user.setWishlist(data1.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)));
                    let wishlistValue = user.wishlist
                    console.log('user.setWishlist updated' + wishlistValue)
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
    [user.wishlistUpdated]
)
    useEffect(() => {
        const handleStorageChange = (event) => {
            console.log('in handleStorageChange');
            if(event.key === 'wishlist' || event.key === 'wishlistUpdated') {
                user.loadWishlistFromLocalStorage();
            }
        }
        window.addEventListener('storage', handleStorageChange);
        // return () => {
        //     window.removeEventListener('storage', handleStorageChange)
        // }
}, [user.wishlistUpdated])

const handleAddToCart = (deviceId, devicePrice) => {
    if(!userId) {
        navigate(LOGIN_ROUTE)
        return
    }
    // console.log(e.target.value)

    // console.log(e.target.value.split(','))
    // const [deviceId, devicePrice] = e.target.value.split(',')
    const formData = new FormData()
    formData.append('deviceId', deviceId)
    formData.append('userId', userId)
    formData.append('price', devicePrice)
    formData.append('quantity', 1)
    console.log(formData)
    addItem(formData).then(data => {
        console.log(data)
        console.log(JSON.parse(JSON.stringify(user.cart)))
        user.setCart(data.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)));
        // user.setCartUpdated(!user.cartUpdated)
        // console.log([...user.cart])
        // user.setCart([...user.cart, ])
    }, error => console.log(error)
    )
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
                Wishlist
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
                    to={WISHLIST_ROUTE} 
                    className={'d-flex align-items-center'}
                    >
                    <h2 style={{fontSize: 16, color: '#000', margin: 0}} className=''>Wishlist</h2>
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
                                <th className='py-3' style={{backgroundColor: '#F9F1E7'}}>Actions</th>
                                <th className='py-3' style={{backgroundColor: '#F9F1E7'}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {wishlist && wishlist.map(wishlistDevice =>
                                <tr
                                    key={wishlistDevice.id}
                                    className='cart-table'
                                >
                                    <th style={{fontWeight: 400}}>
                                        <img style={{width: 60, height: 60, borderRadius: 5, marginRight: 10}} src={process.env.REACT_APP_API_URL + devices.find((device) => {
                                            return device.id === wishlistDevice.deviceId 
                                        }).img}></img>
                                        {devices.find((device) => {
                                            return device.id === wishlistDevice.deviceId 
                                        }).name}
                                    </th>
                                    <th style={{fontWeight: 400}}
                                        // className='d-flex align-items-center'
                                    >
                                        {wishlistDevice.price}₽
                                    </th>
                                    {/* <th style={{fontWeight: 400}}>
                                        <Button variant='light' className='me-2'
                                            onClick={() => {
                                                if(wishlistDevice.quantity > 1)
                                                    changeQuantity(wishlistDevice.deviceId, wishlistDevice.basketId, wishlistDevice.quantity - 1)
                                                else
                                                    removeItem(wishlistDevice.deviceId,wishlistDevice.basketId).then(data => console.log(data), error => console.log(error))

                                                // setIsWishlistUpdated(true)
                                                user.setWishlistUpdated(!user.wishlistUpdated)
                                            }}
                                        >
                                            -
                                        </Button>
                                        {wishlistDevice.quantity}
                                        <Button variant='light' className='ms-2'
                                            onClick={() => {
                                                changeQuantity(wishlistDevice.deviceId, wishlistDevice.basketId, wishlistDevice.quantity + 1)
                                                // setIsWishlistUpdated(true)
                                                user.setWishlistUpdated(!user.wishlistUpdated)

                                            }}
                                        >
                                            +
                                        </Button>
                                    </th> */}
                                    {/* <th style={{fontWeight: 400}}>
                                        {wishlistDevice.price}₽
                                    </th> */}
                                    <th style={{fontWeight: 400}}>
                                        <Button 
                                        onClick={async() => {
                                            console.log(wishlistDevice.deviceId,wishlistDevice.wishlistId)
                                            let data = await removeItemWishlist(wishlistDevice.deviceId,wishlistDevice.wishlistId).then(data => console.log(data), error => console.log(error))
                                            // setIsWishlistUpdated(true)
                                            user.setWishlistUpdated(!user.wishlistUpdated)

                                        }} 
                                        variant='danger' 
                                        value={wishlistDevice.deviceId}>
                                            Remove
                                        </Button>
                                        
                                        <Button className='w-50 mx-auto'
                                            variant='light'
                                            style={{color: '#B88E2F', fontSize: 16, fontWeight: 600}}
                                            onClick={() => {handleAddToCart(wishlistDevice.deviceId, wishlistDevice.price); 
                                                user.setCartUpdated(!user.cartUpdated)
                                            }}
                                        >
                                            Add to <img src={cartIcon} style={{width: 20}}/>
                                        </Button>
                                    </th>
                                </tr>
                                )}
                        </tbody>
                    </Table>
                    {wishlist.length === 0 ? 'Your cart is empty...' : ''}

                </Col>
                {/* <Col md={4}>
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
                </Col> */}
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
 
export default Wishlist;