import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, ListGroup, Pagination, Row, Table, Dropdown, Form, FormControl} from 'react-bootstrap';
import CreateBrand from '../components/modals/CreateBrand';
import CreateType from '../components/modals/CreateType';
import CreateDevice from '../components/modals/CreateDevice';
import ChangeDevice from '../components/modals/ChangeDevice';
import { useNavigate } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts';
import { accessAdmin, check, getAndCountAll } from '../http/userAPI';
import { deleteBrand, deleteDevice, deleteType, fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI';
import { Context } from '..';
import addIcon from '../assets/add.png'

import { observer } from 'mobx-react-lite';
import SortDevices from '../components/SortDevices';
import ConfirmDelete from '../components/modals/ConfirmDelete';


const Admin = observer(() => {

    const navigate = useNavigate()
    const {device, user} = useContext(Context)

    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)
    const [deviceChangeVisible, setDeviceChangeVisible] = useState(false)
    const [deviceChangeId, setDeviceChangeId] = useState(0)

    const [areBrandsUpdated, setAreBrandsUpdated] = useState(false)
    const [areTypesUpdated, setAreTypesUpdated] = useState(false)
    const [areDevicesUpdated, setAreDevicesUpdated] = useState(false)

    const [show, setShow] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteArguments, setDeleteArguments] = useState([]);

    const [userSortOrder, setUserSortOrder] = useState('id')
    const [userSearch, setUserSearch] = useState('')
    //check if admin
    useEffect(() => {
        // check().then(
        //   data => {if(data.role !== 'ADMIN') navigate(SHOP_ROUTE)}
        //    , 
        //   error => console.log(error)
        // )
        device.setSelectedType({})
        device.setSelectedBrand({})
        device.setSearch('')
        accessAdmin().then(response => {
            console.log('accessAdmin response:', response)
            // if (response.ok) {
            //     // User is authorized, proceed
            //     console.log('User is authorized as admin', response);
            // } else {
            //     // User is not authorized, handle accordingly
            //     console.log('User is not authorized as admin');
            //     navigate(SHOP_ROUTE); // Redirect to the shop route
            // }
            
            
        }, error => {console.log('accessAdmin error:', error);  navigate(SHOP_ROUTE);})
        .catch(error => {console.error('Error checking admin access:', error); navigate(SHOP_ROUTE);});
      }, [])

    //users
    const reqUsers = () => {
        // console.log('in useeffect userssss page:', user.page)

        getAndCountAll(user.page, 10, userSortOrder, userSearch).then(data => {
            user.setUsers(data.rows)
            user.setTotalCount(data.count)
        })
    }


    useEffect(() => {
        console.log('in useeffect users')
        reqUsers();
      }, [user.page, userSortOrder, userSearch])
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
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit, device.search, device.sortOrder).then(data => {
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
        device.setLimit(5)
        reqDevices();
        setAreDevicesUpdated(false)
    }, [areDevicesUpdated, deviceVisible, device.page, device.search, device.sortOrder, device.selectedType, device.selectedBrand])

    //handle delete button
    useEffect(() => {
        if(!confirmDelete) return
        console.log('in cofirmDelete true: ',deleteArguments)
        let [deleteFrom, deleteName] = deleteArguments
            
            if (deleteFrom === 'brand') {
                deleteBrand({id: deleteName}).then(data => {
                    console.log(data)
                    setAreBrandsUpdated(true)
                    setAreDevicesUpdated(true)

                }) }
            else if(deleteFrom === 'type'){
                deleteType({id: deleteName}).then(data => {
                    console.log(data)
                    setAreTypesUpdated(true)
                    setAreDevicesUpdated(true)

                }) }
            else if(deleteFrom === 'device'){
                deleteDevice({name: deleteName}).then(data => {
                    console.log(data)
                    setAreDevicesUpdated(true)
                })
            }
            setConfirmDelete(false)
    }, [confirmDelete])

    const handleDelete = (deleteFrom, deleteName) => {
        setDeleteArguments([deleteFrom, deleteName])
        setShow(true)
        // if(confirmDelete) {
//  console.log(typeof(e.target.value))

//         let deleteFrom = e.target.value.split(",")[0]
//         let deleteName = e.target.value.split(",")[1]
            // console.log('in cofirmDelete true: ',deleteFrom, deleteName)

            
            // if (deleteFrom === 'brand') {
            //     deleteBrand({name: deleteName}).then(data => {
            //         console.log(data)
            //         setAreBrandsUpdated(true)
            //     }) }
            // else if(deleteFrom === 'type'){
            //     deleteType({name: deleteName}).then(data => {
            //         console.log(data)
            //         setAreTypesUpdated(true)
            //     }) }
            // else if(deleteFrom === 'device'){
            //     deleteDevice({name: deleteName}).then(data => {
            //         console.log(data)
            //         setAreDevicesUpdated(true)
            //     })
            // }
            // setConfirmDelete(false)
        // } else             console.log('in cofirmDelete false: ',deleteFrom, deleteName)

    }

    // handlge change button
    const handleChange = (deviceId) => {
        console.log('before:', deviceId)
        setDeviceChangeId(deviceId)
    }

    useEffect(() => {
        if(deviceChangeId === 0) return;
        console.log('after:', deviceChangeId)
        setDeviceChangeVisible(true)
    }, [deviceChangeId])

    //pagination for devices
    const pageCountDevices = Math.ceil(device.totalCount / device.limit)
    const pagesDevices = []
    for (let i = 0; i < pageCountDevices; i++) {
        pagesDevices.push(i+1)
        
    }
    //pagination for users
    const pageCountUsers = Math.ceil(user.totalCount / 10)
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
                        <Card.Body className='background-light'>
                            <Card.Title>Types</Card.Title>
                            <Table responsive className='light'>
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
                                            onClick={() => {handleDelete('type', type.id)}}
                                            // value={['type', type.name]}
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
                                className='background-light'
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
                        <Card.Body className='background-light'>
                            <Card.Title>Brands</Card.Title>
                            <Table responsive className='light'>
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
                                            // value={['brand', brand.name]}
                                            onClick={() => {handleDelete('brand', brand.id)}}

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
                                className='background-light'
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
            <Row className='mt-4'>
            <Col md={6}>
                    <Card>
                        <Card.Body className='background-light'>
                            <Card.Title className='d-flex align-items-center gap-4 flex-wrap'>Devices: {device.totalCount}
                                <Form className='admin_user-search'>
                                    <FormControl 
                                        placeholder='Search in name...'
                                        value={device.search}
                                        onChange={e => device.setSearch(e.target.value)}
                                        /> 
                                </Form>
                                <SortDevices />
                                <Dropdown>
                                    <Dropdown.Toggle variant="light" id="dropdown-basic" className='dropdown-light'>
                                        Set type
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item 
                                            onClick={() => 
                                                device.setSelectedType({})
                            
                                            }
                                        >none</Dropdown.Item>
                                        {device.types.map(type =>
                                            <Dropdown.Item 
                                                style={{cursor: 'pointer'}}
                                                active={type.id === device.selectedType.id}
                                                onClick={() => device.setSelectedType(type)}
                                                key={type.id}
                                            >
                                                {type.name}
                                            </Dropdown.Item>
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown>
                                <Dropdown.Toggle variant="light" id="dropdown-basic" className='dropdown-light'>
                                        Set brand
                                    </Dropdown.Toggle>
                                <Dropdown.Menu>
                                        <Dropdown.Item 
                                            onClick={() => 
                                                device.setSelectedBrand({})
                                                
                                            }
                                        >none</Dropdown.Item>
                                        {device.brands.map(brand =>
                                            <Dropdown.Item 
                                                style={{cursor: 'pointer'}}
                                                active={brand.id === device.selectedBrand.id}
                                                onClick={() => device.setSelectedBrand(brand)}
                                                key={brand.id}
                                            >
                                                {brand.name}
                                            </Dropdown.Item>
                                        )}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Card.Title>
                            <Table responsive className='light'>
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
                                        <th><img style={{width: 75, height: 75}} src={process.env.REACT_APP_API_URL + device.img}/></th>
                                        <th style={{fontWeight: 400}}>{device.price}</th>
                                        <th style={{fontWeight: 400}}>{new Date(device.createdAt).toLocaleDateString("ru", 
                                            {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                                        </th>
                                        <th className='d-flex gap-2 flex-wrap'>
                                        <Button 
                                            className='w-75 button-light'
                                            variant='light'
                                            type='button'
                                            value={['device', device.name]}
                                            onClick={() => {handleChange(device.id)}}
                                        >
                                            Change
                                        </Button>
                                        <Button 
                                            className='w-75'
                                            variant='danger'
                                            type='button'
                                            // value={['device', device.name]}
                                            onClick={() => {handleDelete('device', device.name)}}
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
                                className='background-light'
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
                        <Card.Body className='background-light'>
                            <Card.Title className='d-flex align-items-center gap-4 flex-wrap'>Users: {user.totalCount} 
                                <Form className='admin_user-search'>
                                    <FormControl 
                                        placeholder='Search in email...'
                                        value={userSearch}
                                        onChange={e => setUserSearch(e.target.value)}
                                        /> 
                                </Form>
                                <Dropdown>
                                    <Dropdown.Toggle variant="light" id="dropdown-basic" className='dropdown-light'>
                                        Sort by
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item 
                                            onClick={() => 
                                                setUserSortOrder('id')
                            
                                            }
                                        >id</Dropdown.Item>
                                        <Dropdown.Item 
                                        onClick={() => 
                                            setUserSortOrder('role')
                        
                                        }
                                        >role</Dropdown.Item>
                                        <Dropdown.Item 
                                        onClick={() => 
                                            setUserSortOrder('last_login')
                        
                                        }
                                        >last login</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                            </Card.Title>
                            <Table responsive className='light'>
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
                
            
            
            
            <ConfirmDelete show={show} onHide={() => setShow(false)} setConfirmDelete={setConfirmDelete}/>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <ChangeDevice 
                show={deviceChangeVisible} 
                onHide={() => {setDeviceChangeVisible(false); setDeviceChangeId(0)}}
                deviceId={deviceChangeId}></ChangeDevice>
        </Container>
       
     );
})
 
export default Admin;