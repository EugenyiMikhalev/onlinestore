import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import star from '../assets/star.png'
import {useNavigate} from 'react-router-dom'
import { DEVICE_ROUTE } from '../utils/consts';

const DeviceItem = ({device, brands}) => {

    
    const navigate = useNavigate()
    return ( 
        <Col md={3} className='mt-3' 
            onClick={() => 
                navigate(DEVICE_ROUTE + '/' + device.id)
            }
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
            <Card style={{width: 200, cursor: 'pointer'}} border={'light'}>
                <Card.Img variant="top" src={process.env.REACT_APP_API_URL + device.img} />
                <Card.Body className='d-flex justify-content-center flex-column'>
                    <Card.Title style={{fontSize: 24, fontWeight: 600}}>{device.name}</Card.Title>
                    {/* <Card.Text> */}
                        <div 
                            className='text-black-50 d-flex justify-content-between' 
                            style={{fontSize: 16}}
                        >
                            {brands.find(brand => brand.id === device.brandId).name} <div>{device.rating} <Image src={star} width={15} height={15}/></div>
                            
                        </div>
                        <div 
                            className='text-black-50' 
                            style={{fontSize: 20, fontWeight: 600}}
                        >
                            {device.price}₽
                        </div>
                    {/* </Card.Text> */}
                </Card.Body>
            </Card>
        </Col>
     );
}
 
export default DeviceItem;