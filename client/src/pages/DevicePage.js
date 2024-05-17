import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row, Carousel } from 'react-bootstrap';
import star from '../assets/star.svg'
import starGold from '../assets/starGold.png'
import { NavLink, useParams } from 'react-router-dom';
import { createRating, fetchOneDevice, fetchRatings } from '../http/deviceAPI';
import { HOME_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { Context } from '..';
import { addItem, check } from '../http/userAPI';

const DevicePage = () => {

    const {user} = useContext(Context)

    const [userId, setUserId] = useState()
    const [device, setDevice] = useState({info:[]})
    const {id} = useParams()

    useEffect(() => {
        fetchOneDevice(id).then(data => {
            fetchRatings(id).then(data1 => {
                let rating = 0;
                let count = 0;
                data1.rows.map(rate => {
                    rating = rating + rate.rate;
                    count += 1})
                rating /= count
                setDevice({...data, rating: Math.round(rating * 10) / 10})
                console.log(data.imgs)
                console.log(device.imgs)
            }
                , error => console.log(error))
        })
        check().then(
            data => {setUserId(data.id)}
             , 
            error => console.log(error)
        )
    }, [])

    const handleHoverStar = (e) => {
        let current = e.target.parentNode.children[0]
        e.target.src = starGold
        let i = 0
        while (current !== e.target) {
            // console.log(i)
            current.src = starGold
            i = i + 1
            current = e.target.parentNode.children[i]
        }
        while(i < 4) {
            // console.log(i)

            i = i + 1
            current = e.target.parentNode.children[i]
            current.src = star
        }
    }

    const handleHoverOutStar = (e) => {
        // e.target.src = star
        // let current = e.target.parentNode.children[0]
        // let i = 0
        // while (current !== e.target) {
        //     current.src = star
        //     i = i + 1
        //     current = e.target.parentNode.children[i]
        // }
        let current = e.target.parentNode.children[0]
        let i = 0
        while (i <= device.rating - 1) {

            current.src = starGold
            i = i + 1
            current = e.target.parentNode.children[i]
        }
        while(i < 5) {

            current = e.target.parentNode.children[i]
            current.src = star
            i = i + 1
        }
    }

    // const handleHoverOutStarContainer = (e) => {
    //     console.log(e.target)
    //     let current = e.target.parentNode.children[0]
    //     let i = 0
    //     while (i <= device.rating - 1) {
    //         if(current) current.src = starGold
    //         else console.log('src undefined', e.target)
    //         i = i + 1
    //         current = e.target.parentNode.children[i]
    //     }
    // }

    const handleRate = (e) => {
        e.target.src = star
        let current = e.target.parentNode.children[0]
        let i = 0
        while (current !== e.target) {
            current.src = star
            i = i + 1
            current = e.target.parentNode.children[i]
        }
        let rating = i + 1
        // let device_id = window.location.pathname.toString().split('/').pop()
        const formData = new FormData()
        formData.append('rate', rating)
        formData.append('product_id', id)
        formData.append('user_id', userId)
        createRating(formData).then(data => {
            console.log(data)
        })
        // createRating({
        //     device_id: window.location.pathname.toString().slice(-2),
        //     user_id: userId,
        //     rate: rating
        // }).then(data => {
        //     console.log(data)
        // })
    }

    const handleAddToCart = (e) => {
        const formData = new FormData()
        console.log(id, userId)
        formData.append('deviceId', id)
        formData.append('userId', userId)
        formData.append('price', device.price)
        formData.append('quantity', 1)
        console.log(formData)
        addItem(formData).then(data => 
            console.log(data), error => console.log(error)
        )
    }
    return ( 
        <Container >
            <div 
                style={{color: '#000', fontSize: 25, backgroundColor: '#F9F1E7'}} 
                className='mt-3 px-5 py-5 d-flex gap-4 align-items-center'
            >
                <NavLink 
                    style={{textDecoration: 'none'}} 
                    to={HOME_ROUTE} 
                    className={'d-flex align-items-center m-0'}
                    >
                    <h1 style={{fontSize: 16, color: '#9F9F9F', margin: 0}} className=''>Home</h1>
                </NavLink>
                {'>'} 
                <NavLink 
                    style={{textDecoration: 'none', display: 'inline-block'}} 
                    to={SHOP_ROUTE} 
                    className={'d-flex align-items-center'}
                    >
                    <h1 style={{fontSize: 16, color: '#9F9F9F', margin: 0}} className=''>Shop</h1>
                </NavLink>
                {'>'} <span style={{color: '#000', fontSize: 16, fontWeight: 600, borderLeft: '1px solid black', paddingLeft: 25}}>{device.name}</span>
            </div>

            <Row className='mt-3'>
                <Col md={5} 
                // className='px-2 d-flex justify-content-between'
                className='px-2 '
                >
                    {/* <img width={300} height={300} src={process.env.REACT_APP_API_URL + device.img} style={{margin: 'auto'}}/> */}
                    <Carousel style={{maxWidth:423, maxHeight:500, margin: 'auto'}} variant='dark'>
                        <Carousel.Item>
                            <img 
                                className='d-block w-100'
                                src={process.env.REACT_APP_API_URL + device.img} style={{width:423, height:500}}
                            />
                        </Carousel.Item>

                        {device.imgs && device.imgs.map(img => <Carousel.Item key={img.filename}>
                        <img 
                        className='d-block w-100'
                        src={process.env.REACT_APP_API_URL + img.filename} style={{width:423, height:500}}/>

                            
                        </Carousel.Item>)}
                        {/* <Carousel.Item>
                        <img 
                        className='d-block w-100'
                        src={process.env.REACT_APP_API_URL + device.img} style={{maxWidth:423, maxHeight:500}}/>

                            
                        </Carousel.Item>
                        <Carousel.Item>
                        <img 
                        className='d-block w-100'
                        src={process.env.REACT_APP_API_URL + device.img} style={{maxWidth:423, maxHeight:500}}/>

                            
                        </Carousel.Item> */}
                    </Carousel>
                </Col>
                <Col md={7} className='px-0 ' style={{padding: 0, height: 500}}>
                    <h1 style={{color: '#000', fontSize: 42, fontWeight: 400}}>{device.name}</h1>
                    <h3 className='my-3' style={{color: '#9F9F9F', fontSize: 24, fontWeight: 600}}>{device.price}₽</h3>
                    <div className='d-flex' style={{color: '#9F9F9F', fontSize: 13, fontWeight: 400}}>
                        {/* <div onMouseLeave={handleHoverOutStarContainer}> */}
                        <img 
                            onMouseOver={handleHoverStar}
                            onMouseLeave={handleHoverOutStar}
                            onClick={handleRate}
                            style={{width: 20, height: 20}} 
                            src={device.rating < 1 || isNaN(device.rating) ? star : starGold}/>
                        <img 
                            onMouseOver={handleHoverStar}
                            onMouseLeave={handleHoverOutStar}
                            onClick={handleRate}
                            style={{width: 20, height: 20}} 
                            src={device.rating < 2 || isNaN(device.rating) ? star : starGold}
                            />
                        <img 
                            onMouseOver={handleHoverStar}
                            onMouseLeave={handleHoverOutStar}
                            onClick={handleRate}
                            style={{width: 20, height: 20}} 
                            src={device.rating < 3 || isNaN(device.rating) ? star : starGold}
                            />
                        <img 
                            onMouseOver={handleHoverStar}
                            onMouseLeave={handleHoverOutStar}
                            onClick={handleRate}
                            style={{width: 20, height: 20}} 
                            src={device.rating < 4 || isNaN(device.rating) ? star : starGold}
                            />
                        <img 
                            onMouseOver={handleHoverStar}
                            onMouseLeave={handleHoverOutStar}
                            onClick={handleRate}
                            style={{width: 20, height: 20}} 
                            src={device.rating < 5 || isNaN(device.rating) ? star : starGold}
                            />
                        {/* </div> */}
                        <span 
                            className='ms-2 ps-2'
                            style={
                                isNaN(device.rating) ? {borderLeft: '1px solid black', display: 'inline-block'}
                                : {borderLeft: '1px solid black', display: 'inline-block', color: 'black'}
                            }
                        >
                            {isNaN(device.rating) ? ' No rating for this item' : device.rating}
                        </span>
                    </div>
                    <div className='my-3' style={{color: '#000', fontSize: 13, fontWeight: 400}}>
                        {device.info.map( (info, index) => 
                            <div key={info.id} style={{}}>
                                {info.title}: {info.description}
                            </div>
                    )}</div>
                    <Button  variant='light' className='devicePage__button-add justify-self-end'
                    // style={{alignSelf:'flex-end', justifySelf:'flex-end'}}
                        onClick={handleAddToCart}
                    >
                        Add to cart
                    </Button>
                </Col>
            </Row>


            
        </Container>
     );
}
 
export default DevicePage;