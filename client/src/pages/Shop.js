import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI';
import Pages from '../components/Pages';
import trophyIcon from '../assets/contact/trophy.png';
import guaranteeIcon from '../assets/contact/guarantee.png';
import shippingIcon from '../assets/contact/shipping.png';
import customerIcon from '../assets/contact/customer.png';


const Shop = observer(() => {

    const {device} = useContext(Context)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        
    }, [])

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit, device.search).then(data => {
            console.log("search:", device.search)
            // if (device.search) {
           
            // device.setDevices(data.rows.filter(product => 
            //         product.name.toLowerCase().indexOf(device.search.toLowerCase()) !== -1
            //          ))} 
            // else {
            device.setDevices(data.rows)

            // }

           
            device.setTotalCount(data.count)},
        error => console.log(error)

        ).finally(() => setLoading(false))
    }, [device.page, device.selectedType, device.selectedBrand, device.search])

    return (
        <>
        <Container className='shop-background py-5 mb-4'>
            <h1 
                className='text-center pt-5'
                style={{fontSize: 48}}
            >
                Shop
            </h1>
            <h2
                className='text-center pb-5'
                style={{fontSize: 16}}
            >
                Home {">"} Shop
            </h2>
        </Container>
        <Container className='mt-2'> 
            <Row>
                <Col md={2}>
                    <TypeBar/>
                </Col>
                <Col md={10}>
                    <BrandBar/>
                    <DeviceList loading={loading}/>
                    <Pages/>
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