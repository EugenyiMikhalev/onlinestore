import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Image, Button } from 'react-bootstrap';
import star from '../assets/star.png'
import {Link, useNavigate} from 'react-router-dom'
import { DEVICE_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import cartIcon from '../assets/navIcons/cart.svg'
import favIcon from '../assets/navIcons/favorites.svg'
import { addItem, addItemWishlist, check } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '..';

const DeviceItem = observer(({device, brands}) => {

    const [isHovered, setIsHovered] = useState(false);
    const [userId, setUserId] = useState()
    const {user} = useContext(Context)

    useEffect(() => {
        check().then(
            data => {setUserId(data.id)}
             , 
            error => console.log(error)
        )
    }, [])
    
    const navigate = useNavigate()

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
    const handleAddToWishlist = (deviceId, devicePrice) => {
        if(!userId) {
            navigate(LOGIN_ROUTE)
            return
        }

        const formData = new FormData()
        formData.append('deviceId', deviceId)
        formData.append('userId', userId)
        formData.append('price', devicePrice)
        console.log(formData)
        addItemWishlist(formData).then(data => {
            console.log(data)
            console.log(JSON.parse(JSON.stringify(user.wishlist)))
            user.setWishlist(data.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)));
            // user.setCartUpdated(!user.cartUpdated)
            // console.log([...user.cart])
            // user.setCart([...user.cart, ])
        }, error => console.log(error)
        )
    }

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
        <Col md={3} className='mt-3 d-flex justify-content-around flex-wrap' 
            style={{width: '280px'}}
        >
            {/* <Card style={{width: 150, cursor: 'pointer'}} border={'light'}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img} />
                <div className='mt-1 d-flex justify-content-between align-items-center'>
                    <div className='text-black-50'>
                        {brands.find(brand => brand.id === device.brandId).name}
                    </div>
                    <div className='d-flex align-items-center'>
                        <div>{device.rating}</div>
                        <Image src={star} width={15} height={15}/>
                    </div>
                </div>
                <div>{device.name}</div>
            </Card> */}
            <Card style={{ cursor: 'pointer', borderRadius: 0, position: 'relative', width: '100%'}} border={'light'}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Card.Img variant="top" src={process.env.REACT_APP_API_URL + device.img} style={{borderRadius: 0, width: '100%', height: 301}}/>
                <Card.Body className='d-flex justify-content-center flex-column'
                    style={{backgroundColor: '#F4F5F7'}}
                >
                    <Card.Title style={{fontSize: 24, fontWeight: 600}}>{device.name}</Card.Title>
                    {/* <Card.Text> */}
                        <div 
                            className='text-black-50 d-flex justify-content-between' 
                            style={{fontSize: 16}}
                        >
                            {brands.find(brand => brand.id === device.brandId).name} <div>{Math.floor(device.averageRating*10)/10} <Image src={star} width={15} height={15}/></div>
                            
                        </div>
                        <div 
                            className='' 
                            style={{fontSize: 20, fontWeight: 600, color: '#3A3A3A'}}
                        >
                            {device.price}₽
                        </div> 
                    {/* </Card.Text> */}
                </Card.Body>
                {<div style={isHovered ? {position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(58,58,58,72%)', opacity: '100%'}
                :     {position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(58,58,58,72%)', opacity: '0%'}
                    }
                    className='d-flex flex-column justify-content-center gap-2'
                >
                    <Link to={DEVICE_ROUTE + '/' + device.id} target="_blank" rel="noopener noreferrer" className='w-50 mx-auto'>
                    <Button className='w-100 mx-auto'
                        variant='light'
                        style={{color: '#B88E2F', fontSize: 16, fontWeight: 600}}
                        // onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}
                    >
                        Open
                    </Button> </Link>
                    {device.id && device.price &&<Button className='w-50 mx-auto'
                        variant='light'
                        style={{color: '#B88E2F', fontSize: 16, fontWeight: 600}}
                        onClick={() => {handleAddToWishlist(device.id, device.price); 
                            user.setWishlistUpdated(!user.wishlistUpdated)
                        }}
                    >
                        Add to <img src={favIcon} style={{width: 20}}/>
                    </Button>}
                    {device.id && device.price &&<Button className='w-50 mx-auto'
                        variant='light'
                        style={{color: '#B88E2F', fontSize: 16, fontWeight: 600}}
                        onClick={() => {handleAddToCart(device.id, device.price); 
                            user.setCartUpdated(!user.cartUpdated)
                        }}
                    >
                        Add to <img src={cartIcon} style={{width: 20}}/>
                    </Button>}
                </div>}
            </Card>
        </Col>
     );
})
 
export default DeviceItem;