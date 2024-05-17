import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button, Form, Dropdown, Row, Col, FormGroup } from 'react-bootstrap';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Context } from '../../index';
import { changeDevice, fetchBrands, fetchOneBrand, fetchOneDevice, fetchOneType, fetchRatings, fetchTypes } from '../../http/deviceAPI';
import { observer } from 'mobx-react-lite';
import ToolTip from '../Overlays/ToolTip';


const ChangeDevice = observer(({show, onHide, deviceId}) => {
    
    const {device} = useContext(Context)
    const [fetchedBrand, setFetchedBrand] = useState({})
    const [fetchedType, setFetchedType] = useState({})
    const [fetchedInfo, setFetchedInfo] = useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [mainImg, setMainImg] = useState([])
    const [files, setFiles] = useState([])
    const [deletedFiles, setDeletedFiles] = useState([])
    const [info, setInfo] = useState([])
    const [fileInputs, setFileInputs] = useState(1)
    const [deviceFetched, setDeviceFetched] = useState({info:[]})
    const [dataFetched, setDataFetched] = useState(false)

    const [validated, setValidated] = useState(false);

    const [deviceUpdated, setDeviceUpdated] = useState(false)
    const [mainImgDeleted, setMainImgDeleted] = useState(false)
    // const [brand, setBrand] = useState('')

    // console.log(deviceId)
    useEffect(() => {
        console.log('in useeffect modal')
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        if(deviceId !== 0)
            fetchOneDevice(deviceId).then(data => {
                console.log('fetched device:', data)
                fetchRatings(deviceId).then(data1 => {
                    let rating = 0;
                    let count = 0;
                    data1.rows.map(rate => {
                        rating = rating + rate.rate;
                        count += 1})
                    rating /= count
                    setDeviceFetched({...data, rating: Math.round(rating * 10) / 10})
                    setInfo(data.info.map((i, index) => ({ ...i, number: Date.now() + index})))
                    setFetchedInfo(data.info.map((i, index) => ({ ...i, number: Date.now() + index})))
                    console.log('data.imgs:', data.imgs)
                    console.log('deviceFetched.imgs:', deviceFetched.imgs)
                }
                    , error => console.log(error))
                fetchOneBrand(data.brandId).then(brandFetched => {
                    device.setSelectedBrand(brandFetched);
                    setFetchedBrand(brandFetched)
                    // console.log('brand:', device.selectedBrand)
                    fetchOneType(data.typeId).then(typeFetched => {
                        device.setSelectedType(typeFetched);
                        setFetchedType(typeFetched)
                        // console.log('type:', device.selectedType)
                        // console.log('a1:', brandFetched.name !== device.selectedBrand.name)
                        // console.log('a1:', brandFetched.name ,device.selectedBrand.name)
                        // console.log('a2:', typeFetched.name !== device.selectedType.name)
                        // console.log('a2:', typeFetched.name , device.selectedType.name)
                        // console.log('a3:', name !== '')
                        // console.log('a4:', price !== 0)
                        // console.log('a5:', mainImg.length !== 0)
                        // console.log('a6:', files.length !== 0)
                        // console.log('a7:', deletedFiles.length !== 0)
                        setDataFetched(true)
                        setDeviceUpdated((mainImgDeleted || brandFetched.name !== device.selectedBrand.name || typeFetched.name !== device.selectedType.name || name !== ''  || price !== 0 || mainImg.length !== 0 || files.length !== 0 || deletedFiles.length !== 0 || JSON.stringify(info) !== JSON.stringify(fetchedInfo)))
    
                    })

                })
                // fetchOneType(data.typeId).then(typeFetched => {
                //     device.setSelectedType(typeFetched);
                //     setFetchedType(typeFetched)
                //     console.log('type:', device.selectedType)
                // })
        })
    }, [show])

    useEffect(() => {
        // console.log('datafetched:', dataFetched)
        if(!dataFetched || Object.keys(fetchedBrand).length === 0 || Object.keys(fetchedType).length === 0 || Object.keys(device.selectedBrand).length === 0 || Object.keys(device.selectedType).length === 0) {
            console.log('in udnefined')
            return
        }
        // console.log('1:', fetchedBrand.name !== device.selectedBrand.name)
        // console.log('1:', fetchedBrand.name ,device.selectedBrand.name)
        // console.log('2:', fetchedType.name !== device.selectedType.name)
        // console.log('2:', fetchedType.name, device.selectedType.name)
        // console.log('3:', name !== '')
        // console.log('4:', price !== 0)
        // console.log('5:', mainImg.length !== 0)
        // console.log('6:', files.length !== 0)
        // console.log('7:', deletedFiles.length !== 0)
        // console.log('8:', JSON.stringify(info) !== JSON.stringify(fetchedInfo))
        console.log('9:', mainImgDeleted)

        setDeviceUpdated((mainImgDeleted || fetchedBrand.name !== device.selectedBrand.name || fetchedType.name !== device.selectedType.name || name !== ''  || price !== 0 || mainImg.length !== 0 || files.length !== 0 || deletedFiles.length !== 0 || JSON.stringify(info) !== JSON.stringify(fetchedInfo)))
        
    }, [dataFetched, device.selectedBrand, device.selectedType, name, price, mainImg, files, deletedFiles, info, mainImgDeleted])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    
    const selectMainFile = e => {
        console.log(e.target)
        console.log('e.target.files[0]: ',e.target.files[0])
        // setMainImgChanged(true)
        if(e.target.files[0]) {
            setMainImgDeleted(true)
            setMainImg([...mainImg, e.target.files[0]]) 
            // setDeletedFiles([...deletedFiles, deviceFetched.img])
        }
        // else setMainImg([])
        console.log('mainImg: ', mainImg)
    }

    const selectFile = e => {
        console.log(e.target)
        console.log('e.target.files[0]: ',e.target.files[0])
        if(e.target.files[0])
            setFiles([...files, e.target.files[0]])
        if(files.every(el => el !== null))
            console.log('not null')
        console.log('files: ', files)
    }

    const postChange = () => {
        
        const formData = new FormData()

        if(name !== '')
            formData.append('name', name)
        else 
            formData.append('name', deviceFetched.name)
        if(price !== 0)
            formData.append('price', `${price}`)
        else 
            formData.append('price', deviceFetched.price)
        files.forEach(file => {
            formData.append('file', file);
        });
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        formData.append('deletedFiles', JSON.stringify(deletedFiles))
        if(mainImg.length !== 0)
           {
            console.log('mainImg exists') 
            formData.append('mainImg', mainImg[mainImg.length-1])
        }
        else 
            {
            console.log('mainImg doesnt exist') 
            formData.append('mainImg', [])
        }
                
        
        changeDevice(deviceFetched.id, formData).then(data => {
        
            device.setSelectedType({})
            device.setSelectedBrand({})
            setMainImgDeleted(false)
            setFetchedBrand({})
            setFetchedType({})
            setName('')
            setPrice(0)
            setFiles([])
            setDeletedFiles([])
            setMainImg([])
            setInfo([])
            setFileInputs(1)
            setDataFetched(false)
            setValidated(false);
            onHide()}
            , error => console.log('error on device change:', error))
        
        
    }

    const deleteFile = (e, img) => {
        console.log('img:', img)
        console.log(deletedFiles)
        console.log(e.target.classList)
        
        if(e.target.classList.contains('mainImg')) {
            if(!e.target.classList.contains('deleted')) {
                // setDeletedFiles([...deletedFiles, img])
                console.log('not includes: ', mainImgDeleted)
                e.target.classList.add('deleted')
                setMainImgDeleted(true)

            } else {
                console.log('includes')
                e.target.classList.remove('deleted')
                setMainImgDeleted(false)
                // setDeletedFiles(deletedFiles.filter(el => el !== img))
                setMainImg([])
            }
        } else {
            if(!deletedFiles.includes(img)) {
                setDeletedFiles([...deletedFiles, img])
                console.log('not includes')
                e.target.classList.add('deleted')
            } else {
                console.log('includes')
                e.target.classList.remove('deleted')
                setDeletedFiles(deletedFiles.filter(el => el !== img))
            }
        }
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            console.log('in checkValidity false')
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);

            return
        }
        postChange();
    
        setValidated(true);
        event.preventDefault();

      };

    return ( 

        <Modal
            show={show}
            onHide={() => {
                device.setSelectedType({})
                        device.setSelectedBrand({})
                        setMainImgDeleted(false)
                        setFetchedBrand({})
                        setFetchedType({})
                        setName('')
                        setPrice(0)
                        setFiles([])
                        setMainImg([])
                        setDeletedFiles([])
                        setInfo([])
                        setFileInputs(1)
                        setDataFetched(false)
                        setValidated(false);
                        onHide()}}
            size="lg"
            centered
            className='modal'
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" style={{fontSize: 20}}>
                Изменить продукт: <span style={{fontSize: 25, fontWeight: 700}}>{deviceFetched.name}</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className='d-flex flex-column gap-5 admin_user-search' noValidate validated={validated} onSubmit={handleSubmit}>
                        
                    <div className='d-flex flex-wrap justify-content-start'>
                        <FormGroup className='d-flex align-items-center gap-2 w-50 flex-wrap' >
                            <Form.Label style={{fontSize: 20, margin: 0, fontWeight: 600}}>Выберите тип: </Form.Label>
                            <Dropdown className='mt-2 mb-2' >
                                <Dropdown.Toggle variant='primary' className='dropdown-light'>{device.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {device.types.map(type =>
                                        <Dropdown.Item 
                                            onClick={() => device.setSelectedType(type)} 
                                            key={type.id}>{type.name}
                                        </Dropdown.Item>  
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </FormGroup>
                        <FormGroup className='d-flex align-items-center gap-2 w-50 flex-wrap'>
                            <Form.Label style={{fontSize: 20, margin: 0, fontWeight: 600}}>Выберите бренд: </Form.Label>
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
                        </FormGroup>
                    </div>

                    <div className='d-flex flex-wrap justify-content-start'>
                        <FormGroup className='d-flex flex-column w-50'>
                            <Form.Label style={{fontSize: 20, fontWeight: 600}}>Введите новое название ({deviceFetched.name}):</Form.Label>
                            <Form.Control
                                variant='success'
                                value={name}
                                onChange={e => setName(e.target.value)} 
                                className='createDevice-input w-75'
                                placeholder='Новое название...'
                            />
                        </FormGroup>
                        <FormGroup className='d-flex flex-column w-50'>
                            <Form.Label style={{fontSize: 20, fontWeight: 600}}>Введите новую стоимость ({deviceFetched.price} ₽):</Form.Label>
                            <Form.Control
                                value={price}
                                onChange={e => setPrice(Number(e.target.value))} 
                                className='createDevice-input w-75'
                                type='number'
                            />
                        </FormGroup>
                    </div>
                    <FormGroup className='d-flex flex-column gap-2'>
                        <Form.Label style={{fontSize: 20, fontWeight: 600, margin: 0}}>Основное изображение:</Form.Label>
                        <div  className={mainImg.length === 0 ? 'mainImg d-block delete-hover' : 'mainImg d-block delete-hover deleted'}  style={{width:'250px', height: '250px'}} onClick={(e) => deleteFile(e, deviceFetched.img)}>
                            <img 
                                src={process.env.REACT_APP_API_URL + deviceFetched.img} 
                                style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                
                            />
                            
                        </div>
                        
                        <Form.Control 
                                required={mainImgDeleted}
                                className='w-50'
                                type='file'
                                onChange={selectMainFile}
                            />
                    </FormGroup>
                    <FormGroup className='d-flex flex-column gap-2'>
                        <Form.Label style={{fontSize: 20, fontWeight: 600, margin: 0}}>Дополнительные изображения:</Form.Label>
                        <div className='d-flex gap-2 flex-wrap justify-content-start'>
                        
                            {deviceFetched.imgs && deviceFetched.imgs.map(img => 
                            <div  
                                className='d-block delete-hover'
                                style={{width:150, height:150}} 
                                onClick={(e) => deleteFile(e, img.filename)}
                                key={img.filename}
                            >
                                <img 
                                    src={process.env.REACT_APP_API_URL + img.filename} 
                                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                /> 
                            </div>    
                                )}
                        </div>
                        {Array.from({ length: fileInputs }).map((_, index) => (
                            <Form.Control 
                                key={index} // Make sure to provide a unique key for each component
                                className='w-50'
                                type='file'
                                onChange={selectFile}
                            />
                        ))}
                        <OverlayTrigger
                    overlay={<Tooltip id="button-tooltip-2" delay={ {show: 250, hide: 400} } placement="top">{files.every(file => file === null) ? 'Загрузите хотя бы 1 изображение' : 'Добавить файл'}</Tooltip>}
                >
                    <span className="d-inline-block" style={{width: 'fit-content'}}>
                        <Button variant='outline-dark'
                            className='mx-0 align-self-start'
                            type='button'
                            disabled={files.every(file => file === null)}
                            onClick={() => {
                            setFileInputs(fileInputs + 1)
                            }}
                        >
                            Дополнительное изображение
                        </Button>
                        </span>
                        </OverlayTrigger>
                    </FormGroup>
                    
                    <FormGroup className='d-flex flex-column gap-2'>
                        <Form.Label style={{fontSize: 20, fontWeight: 600, margin: 0}}>Свойства продукта:</Form.Label>
                        {
                            info.map(i => 
                                <Row className='d-flex gap-2' key={i.number}>
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
                                    <Col md={3}>
                                        <Button 
                                            onClick={() => removeInfo(i.number)}
                                            variant='outline-danger'
                                        >Удалить</Button>
                                    </Col>
                                </Row>    
                            )
                        }
                        <Button
                            variant='outline-dark'
                            onClick={addInfo}
                            className='w-50'
                        >
                            Добавить свойство

                        </Button>
                    </FormGroup>
                {/* </Form> */}
            {/* </Modal.Body> */}
            {/* <Modal.Footer> */}
            <FormGroup className='d-flex gap-2 justify-content-end'>
                <Button variant='outline-danger' 
                    onClick={() => {
                        device.setSelectedType({})
                        device.setSelectedBrand({})
                        setMainImgDeleted(false)
                        setFetchedBrand({})
                        setFetchedType({})
                        setName('')
                        setPrice(0)
                        setFiles([])
                        setDeletedFiles([])
                        setMainImg([])
                        setInfo([])
                        setFileInputs(1)
                        setDataFetched(false)
                        setValidated(false);
                        onHide()}}
                    
                >
                    Отменить изменения
                </Button>
                <OverlayTrigger
                    overlay={<Tooltip id="button-tooltip-2" delay={ {show: 250, hide: 400} } placement="top">{deviceUpdated ? 'Cохранить изменения' : 'Внесите хотя бы одно изменение'}</Tooltip>}
                >
                    <span className="d-inline-block">
                    <Button variant='outline-success'
                    //  onClick={postChange} 
                    type='submit'
                        disabled={!deviceUpdated}
                    >Изменить</Button>
                    </span>
                </OverlayTrigger>
                </FormGroup>
            {/* </Modal.Footer> */}
            </Form>

            </Modal.Body>

        </Modal>
    );
})
 
export default ChangeDevice;