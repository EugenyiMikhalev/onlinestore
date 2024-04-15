import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, ListGroup, Pagination, Row, Table } from 'react-bootstrap';
import CreateBrand from '../components/modals/CreateBrand';
import CreateType from '../components/modals/CreateType';
import CreateDevice from '../components/modals/CreateDevice';
import { useNavigate } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts';
import { accessAdmin, check, getAndCountAll } from '../http/userAPI';
import { deleteBrand, deleteDevice, deleteType, fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI';
import { Context } from '..';
import addIcon from '../assets/add.png'

import { observer } from 'mobx-react-lite';
import Pages from '../components/Pages';


const Admin = observer(() => {

    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)

    const [areBrandsUpdated, setAreBrandsUpdated] = useState(false)
    const [areTypesUpdated, setAreTypesUpdated] = useState(false)
    const [areDevicesUpdated, setAreDevicesUpdated] = useState(false)

    const navigate = useNavigate()
    const {device, user} = useContext(Context)

    //check if admin
    useEffect(() => {
        // check().then(
        //   data => {if(data.role !== 'ADMIN') navigate(SHOP_ROUTE)}
        //    , 
        //   error => console.log(error)
        // )

        accessAdmin().then(response => {
            if (response.ok) {
                // User is authorized, proceed
                console.log('User is authorized as admin', response);
            } else {
                // User is not authorized, handle accordingly
                console.log('User is not authorized as admin');
                navigate(SHOP_ROUTE); // Redirect to the shop route
            }
        })
        .catch(error => {console.error('Error checking admin access:', error); navigate(SHOP_ROUTE);});
      }, [])

    //users
    const reqUsers = () => {
        // console.log('in useeffect userssss page:', user.page)

        getAndCountAll(user.page, 5).then(data => {
            user.setUsers(data.rows)
            user.setTotalCount(data.count)
        })
    }


    useEffect(() => {
        console.log('in useeffect users')
        reqUsers();
      }, [user.page])
    //brands
    const reqBrands = () => {
        fetchBrands().then(data => device.setBrands(data))
    }

    useEffect(() => {
        console.log('in useeffect brands')
        reqBrands();
        setAreBrandsUpdated(false)
    }, [areBrandsUpdated, brandVisible])

    //types
    const reqTypes = () => {
        fetchTypes().then(data => device.setTypes(data))
    }

    useEffect(() => {
        console.log('in useeffect types')
        reqTypes();
        setAreTypesUpdated(false)
    }, [areTypesUpdated, typeVisible])


    //devices
    const reqDevices = () => {
        // console.log('(device.selectedType.id', device.selectedType.id, 'device.selectedBrand.id', device.selectedBrand.id, 'device.page', device.page, 'device.limit', device.limit)
        const empty = {}
        fetchDevices(empty, empty, device.page, device.limit, '').then(data => {
            console.log(data)
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
    },
        error => console.log(error)
        )
    }

    useEffect(() => {

        // device.setSelectedBrand({})
        // device.setSelectedType({})
        // device.setSearch('')
        reqDevices();
        setAreDevicesUpdated(false)
    }, [areDevicesUpdated, deviceVisible, device.page])

    //handle delete button
    const handleClick = (e) => {
        const deleteIt = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].innerHTML
        const name = e.target.parentNode.parentNode.children[0].innerHTML
        console.log("1111: ", deleteIt);
        console.log("2222: ", name);
        
        if (deleteIt === 'Brands') {
            deleteBrand({name: name}).then(data => {
                console.log(data)
                setAreBrandsUpdated(true)
            }) }
        else if(deleteIt === 'Types'){
            deleteType({name: name}).then(data => {
                console.log(data)
                setAreTypesUpdated(true)
            }) }
        else if(deleteIt === 'Devices'){
            deleteDevice({name: name}).then(data => {
                console.log(data)
                setAreDevicesUpdated(true)
            }) }
    }
    //pagination for devices
    const pageCountDevices = Math.ceil(device.totalCount / device.limit)
    const pagesDevices = []
    for (let i = 0; i < pageCountDevices; i++) {
        pagesDevices.push(i+1)
        
    }
    //pagination for users
    const pageCountUsers = Math.ceil(user.totalCount / 5)
    const pagesUsers = []
    // console.log('pagesUsers in admin:', pagesUsers)
    for (let i = 0; i < pageCountUsers; i++) {
        pagesUsers.push(i+1)
        
    }
    return ( 
        <Container className='d-flex flex-column'>
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Types</Card.Title>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Created at</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {device.types && device.types.map(type =>
                                    <tr
                                        key={type.id}
                                        
                                    >
                                        <th style={{fontWeight: 400}}>{type.name}</th>
                                        <th style={{fontWeight: 400}}>{new Date(type.createdAt).toLocaleDateString("ru", 
                                            {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                                        </th>
                                        <th>
                                        <Button variant='danger'
                                            type='button'
                                            onClick={handleClick}
                                        >
                                            Delete
                                        </Button>
                                        </th>
                                    </tr>
                                    )}
                                </tbody>
                            </Table>
                            <Button variant='light'
                                type='button'
                                onClick={() => {
                                    setTypeVisible(true)
                                }}
                                style={{margin: 'auto'}}
                            >
                                <img src={addIcon} style={{width: 20, height: 20}}/>
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Brands</Card.Title>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Created at</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {device.brands && device.brands.map(brand =>
                                    <tr
                                        key={brand.id}
                                        
                                    >
                                        <th style={{fontWeight: 400}}>{brand.name}</th>
                                        <th style={{fontWeight: 400}}>{new Date(brand.createdAt).toLocaleDateString("ru", 
                                            {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                                        </th>
                                        <th>
                                        <Button variant='danger'
                                            type='button'
                                            onClick={handleClick}
                                        >
                                            Delete
                                        </Button>
                                        </th>
                                    </tr>
                                    )}
                                </tbody>
                            </Table>
                            <Button variant='light'
                                type='button'
                                onClick={() => {
                                    setBrandVisible(true)
                                }}
                                style={{margin: 'auto'}}
                            >
                                <img src={addIcon} style={{width: 20, height: 20}}/>
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>         
            <Row className='mt-2'>
            <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Devices</Card.Title>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Price</th>
                                        <th>Created at</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {device.devices && device.devices.map(device =>
                                    <tr
                                        key={device.id}
                                        
                                    >
                                        <th style={{fontWeight: 400}}>{device.name}</th>
                                        <th><img style={{width: 40, height: 40}} src={process.env.REACT_APP_API_URL + device.img}/></th>
                                        <th style={{fontWeight: 400}}>{device.price}</th>
                                        <th style={{fontWeight: 400}}>{new Date(device.createdAt).toLocaleDateString("ru", 
                                            {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                                        </th>
                                        <th>
                                        <Button variant='danger'
                                            type='button'
                                            onClick={handleClick}
                                        >
                                            Delete
                                        </Button>
                                        </th>
                                    </tr>
                                    )}
                                </tbody>
                            </Table>
                            
                            <Button variant='light'
                                type='button'
                                onClick={() => {
                                    setDeviceVisible(true)
                                }}
                                style={{margin: 'auto'}}
                            >
                                <img src={addIcon} style={{width: 20, height: 20}}/>
                            </Button>
                            <Pagination className='mt-2'>
                                {pagesDevices.map(page => 
                                    <Pagination.Item
                                        key={page}
                                        active={device.page === page}
                                        onClick={() => device.setPage(page)}
                                    >
                                        {page}
                                    </Pagination.Item>    
                                )}
                            </Pagination>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                <Card>
                        <Card.Body>
                            <Card.Title>Users: {user.totalCount}</Card.Title>
                            <Table responsive>
                                <thead>
                                    <tr>
                                    <th>id</th>
                                    <th>email</th>
                                    <th>phone</th>
                                    <th>role</th>
                                    <th>last login</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {user.users && user.users.map(one_user => 
                                    <tr
                                        key={one_user.id}
                                        
                                    >
                                        <th style={{fontWeight: 400}}>{one_user.id}</th>
                                        <th style={{fontWeight: 400}}>{one_user.email}</th>
                                        <th style={{fontWeight: 400}}>{one_user.phone}</th>
                                        <th style={{fontWeight: 400}}>role: {one_user.role}</th>
                                        <th style={{fontWeight: 400}}>{new Date(one_user.last_login).toLocaleDateString("ru", 
                                            {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
                                        )}</th>
                                    </tr>
                                    )}
                                </tbody>
                            </Table>
                            <Pagination className='mt-2'>
                                {pagesUsers.map(page => 
                                    <Pagination.Item
                                        key={page}
                                        active={user.page === page}
                                        onClick={() => user.setPage(page)}
                                    >
                                        {page}
                                    </Pagination.Item>    
                                )}
                            </Pagination>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
                

            
            
           
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
        </Container>
       
     );
})
 
export default Admin;