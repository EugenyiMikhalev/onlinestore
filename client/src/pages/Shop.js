import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
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
import { NavLink } from 'react-router-dom';
import { HOME_ROUTE, SHOP_ROUTE } from '../utils/consts';
import logo from '../assets/navIcons/navLogo.svg'
import CustomToggle from '../components/CustomToggle';
import Search from '../components/Search';
import SortDevices from '../components/SortDevices';

const Shop = observer(() => {

    const {device} = useContext(Context)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        
    }, [])

    useEffect(() => {
        device.setLimit(10)
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit, device.search, device.sortOrder).then(data => {
            console.log(data)
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
    }, [device.page, device.selectedType, device.selectedBrand, device.search, device.sortOrder])

    return (
        <>
        <Container className='shop-background py-5 d-flex flex-column align-items-center'>
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
                Shop
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
                    to={SHOP_ROUTE} 
                    className={'d-flex align-items-center'}
                    >
                    <h2 style={{fontSize: 16, color: '#000', margin: 0}} className=''>Shop</h2>
                </NavLink> 
            </div>
            
           
        </Container>
        <Container className='px-0'> 
        <Accordion 
            // defaultActiveKey="0"
            style={{backgroundColor: '#F9F1E7', borderRadius: 0, border: 'none'}}
            className='mx-0 px-5 w-100 py-2 mb-4'
            
        >
            <Card style={{backgroundColor: '#F9F1E7', borderRadius: 0, border: 'none'}}>
                <Card.Header className='d-flex align-items-center justify-content-between'
                    style={{backgroundColor: '#F9F1E7', borderRadius: 0, border: 'none'}}
                >
                <CustomToggle eventKey="0">Filter</CustomToggle>
                
                <div>
                    <span style={{fontSize: 20, color: '#B88E2F'}} className='mx-2'>{device.selectedBrand.name ? device.selectedBrand.name : ''} </span>
                    <span style={{fontSize: 22, color: '#000'}}>{(device.selectedBrand.name && device.selectedType.name) ? '|' : ''}</span>
                    <span style={{fontSize: 20, color: '#B88E2F'}} className='mx-2'>{device.selectedType.name ? device.selectedType.name : ''}</span>
                </div>
                <div className='d-flex gap-4'>
                    <SortDevices />
                    <Search />
                </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                <Card.Body className='d-flex gap-3 flex-column'>
                    <TypeBar/>
                    <BrandBar/>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
            <Row className='w-100'>
                {/* <Col md={2}>
                    <TypeBar/>
                </Col>
                <Col md={10}>
                    <BrandBar/>
                    <DeviceList loading={loading}/>
                    <Pages/>
                </Col> */}
                <Col md={12}>
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