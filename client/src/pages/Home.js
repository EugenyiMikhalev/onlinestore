import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap'
import homeBackground from '../assets/home/homeBackground.png'
import homeDining from '../assets/home/homeDining.png'
import homeLiving from '../assets/home/homeLiving.png'
import homeBedroom from '../assets/home/homeBedroom.png'
import { useNavigate } from 'react-router-dom'
import { SHOP_ROUTE } from '../utils/consts'
import { Context } from '..'
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI'
import DeviceList from '../components/DeviceList'
import trophyIcon from '../assets/contact/trophy.png';
import guaranteeIcon from '../assets/contact/guarantee.png';
import shippingIcon from '../assets/contact/shipping.png';
import customerIcon from '../assets/contact/customer.png';

export default function Home() {

    const navigate = useNavigate()

    const {device} = useContext(Context)
    const [loading, setLoading] = useState(true)
    const [imgLoading, setImgLoading] = useState(true)

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        device.setPage(1)
        device.setLimit(10)
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit, device.search, device.sortOrder).then(data => {
            console.log(data)
            
            device.setDevices(data.rows)

           
            device.setTotalCount(data.count)},
        error => console.log(error)

        ).finally(() => setLoading(false))
    }, [])

  return (
    <Container>
        <Container 
            fluid 
            className='p-0 d-flex align-items-center justify-content-center'
            style={{maxWidth: 1440, position: 'relative', height: '90vh', overflow: 'hidden', backgroundColor: '#fff'}} 
            // style={{backgroundImage: `url(${homeBackground})`, backgroundRepeat: 'no-repeat', backgroundSize: 'fit',height: 1000}}
        >
            {imgLoading &&<Spinner animation='grow'/>}
      
            <img 
                src={homeBackground} 
                style={{width: '100%', display: imgLoading ? "none" : "block"}}
                onLoad={() => setImgLoading(false)}
            />
            <div style={{position: 'absolute', backgroundColor: '#FFF3E3', padding: '50px 40px', maxWidth: '43%', right: 58, top: '15%', borderRadius: 10}}>
                <h2 
                    style={{fontSize: 16, fontWeight: 500, letterSpacing: 3}}
                >New Arrival</h2>
                <h1
                    style={{fontSize: 52, fontWeight: 800, letterSpacing: 0, lineHeight: '65px', color: '#B88E2F'}}
                >Discover Our <br/>New Collection</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
                <Button
                    onClick={() => navigate(SHOP_ROUTE)}
                    style={{textTransform: 'uppercase', borderRadius: 0, backgroundColor: '#B88E2F', border: 'none', fontSize: 16, fontWeight: 800, padding: "25px 72px"}}
                >
                    buy now
                </Button>
            </div>
        </Container>
        <Container
            className='d-flex flex-column justify-content-center align-items-center'
        >
            <h2
                style={{fontSize: 32, fontWeight: 800, color: '#000', paddingTop: 56}}
            >Browse The Range</h2>
            <p
                style={{fontSize: 20, fontWeight: 400, color: '#000', paddingBottom: 56}}
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <Container
                className='d-flex justify-content-around'
            >
                <Card style={{ width: 381, overflow: 'hidden'}} border='light'>
                <Card.Img variant="top" src={homeDining} className='hover-scale'/>
                <Card.Body className='d-flex justify-content-center'  style={{backgroundColor: '#fff', zIndex: 2}}>
                    <Card.Title style={{fontSize: 24, fontWeight: 600}}>Dining</Card.Title>
                </Card.Body>
                </Card>
                <Card style={{ width: 381, overflow: 'hidden'}} border='light'>
                <Card.Img variant="top" src={homeLiving} className='hover-scale'/>
                <Card.Body className='d-flex justify-content-center'  style={{backgroundColor: '#fff', zIndex: 2}}>
                    <Card.Title style={{fontSize: 24, fontWeight: 600}}>Living</Card.Title>
                </Card.Body>
                </Card>
                <Card style={{ width: 381, overflow: 'hidden'}} border='light'> 
                <Card.Img variant="top" src={homeBedroom} className='hover-scale'/>
                <Card.Body className='d-flex justify-content-center' style={{backgroundColor: '#fff', zIndex: 2}}>
                    <Card.Title style={{fontSize: 24, fontWeight: 600}}>Bedroom</Card.Title>
                </Card.Body>
                </Card>
            </Container>
        </Container>

        <Container
            className='d-flex flex-column justify-content-center align-items-center mt-5'
        >
            <h2
                style={{fontSize: 32, fontWeight: 800, color: '#000', paddingTop: 56}}
            >Our Products</h2>
            <Row className='w-100'>
                
                <Col md={12} className='d-flex flex-column'>
                    <DeviceList loading={loading}/>
                    <Button
                    onClick={() => navigate(SHOP_ROUTE)}
                    variant='light'
                    style={{textTransform: 'uppercase', fontSize: 20, fontWeight: 800, borderRadius: 0}}
                    className='mt-3 mx-auto'
                    
                >
                    show all
                </Button>
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
    </Container>
  )
}
