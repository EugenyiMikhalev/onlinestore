import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button, Form, Dropdown, Row, Col, FormGroup } from 'react-bootstrap';
import { Context } from '../../index';
import { createDevice, fetchBrands, fetchDevices, fetchTypes } from '../../http/deviceAPI';
import { observer } from 'mobx-react-lite';
import addIcon from '../../assets/add.png'


const CreateDevice = observer(({show, onHide}) => {
    
    const {device} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [files, setFiles] = useState([])
    const [info, setInfo] = useState([])
    const [fileInputs, setFileInputs] = useState(1)
    
    useEffect(() => {
        console.log('in useeffect modal')

        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices().then(data => device.setDevices(data.rows))
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        console.log(e.target)
        console.log('e.target.files[0]: ',e.target.files[0])

        setFiles([...files, e.target.files[0]])
        console.log('files: ', files)
    }

    const addDevice = () => {
        
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        // formData.append('file', files)
        files.forEach(file => {
            formData.append('file', file);
        });
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))

        createDevice(formData).then(data => {
            
            device.setSelectedType({})
            device.setSelectedBrand({})
            setName('')
            setPrice(0)
            setFiles([])
            setInfo([])
            setFileInputs(1)
            onHide()})
    }

    return ( 

        <Modal
            show={show}
            onHide={() => {
                device.setSelectedType({})
                device.setSelectedBrand({})
                setName('')
                setPrice(0)
                setFiles([])
                setInfo([])
                setFileInputs(1)
                onHide()}}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className='d-flex flex-column gap-5 admin_user-search'>

                <div className='d-flex flex-wrap justify-content-start'>
                    <Dropdown className='mt-2 mb-2 w-50'>
                        <Dropdown.Toggle className='dropdown-light'>{device.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item 
                                    onClick={() => device.setSelectedType(type)} 
                                    key={type.id}>{type.name}
                                </Dropdown.Item>  
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle className='dropdown-light'>{device.selectedBrand.name || "Выберите бренд"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item 
                                    onClick={() => device.setSelectedBrand(brand)} 
                                    key={brand.id}>{brand.name}
                                </Dropdown.Item>  
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    </div>
                    <div className='d-flex flex-wrap justify-content-start'>
                    <FormGroup className='d-flex flex-column w-50'>
                    <Form.Label style={{fontSize: 22}}>Введите название:</Form.Label>
                    <Form.Control
                        variant='success'
                        value={name}
                        onChange={e => setName(e.target.value)} 
                        className='createDevice-input w-50'
                        placeholder='Название...'
                    />
                    </FormGroup>
                    <FormGroup className='d-flex flex-column w-50'>
                    <Form.Label style={{fontSize: 22}}>Введите стоимость (₽):</Form.Label>
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))} 
                        className='createDevice-input w-50'
                        // placeholder='5'
                        type='number'
                    /></FormGroup>
                    </div>
                    {/* <Form.Control 
                        className='mt-3'
                        type='file'
                        onChange={selectFile}
                    /> */}
                    <h3 style={{fontSize: 22}}>Добавьте основное изображение:</h3>
                    {Array.from({ length: fileInputs }).map((_, index) => (
                        <Form.Control 
                            key={index} // Make sure to provide a unique key for each component
                            className='w-50'
                            type='file'
                            onChange={selectFile}
                        />
                    ))}
                    <Button variant='outline-dark'
                        className='mx-0 align-self-start'
                        type='button'
                        disabled={!files[0] && files.every(file => file !== null)}
                        onClick={() => {
                        setFileInputs(fileInputs + 1)
                        }}
                    >
                        Дополнительное изображение
                    </Button>
                    <hr/>
                    <Button
                        variant='outline-dark'
                        onClick={addInfo}
                        className='w-50'
                    >
                        Добавить новое свойство

                    </Button>
                    {
                        info.map(i => 
                            <Row className='mt-2' key={i.number}>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.title}
                                        onChange={e => changeInfo('title', e.target.value, i.number)}
                                        placeholder='Введите название свойства'
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.description}
                                        onChange={e => changeInfo('description', e.target.value, i.number)}
                                        placeholder='Введите описание свойства'
                                    />
                                </Col>
                                <Col md={4}>
                                    <Button 
                                        onClick={() => removeInfo(i.number)}
                                        variant='outline-danger'
                                    >Удалить</Button>
                                </Col>
                            </Row>    
                        )
                    }
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' 
                    onClick={() => {
                        device.setSelectedType({})
                        device.setSelectedBrand({})
                        setName('')
                        setPrice(0)
                        setFiles([])
                        setInfo([])
                        setFileInputs(1)
                        onHide()}}
                >
                    Закрыть
                </Button>
                <Button variant='outline-success' onClick={addDevice} 
                    disabled={!device.selectedBrand.id || !device.selectedType.id || !name || !price || !files.length}
                >Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
})
 
export default CreateDevice;