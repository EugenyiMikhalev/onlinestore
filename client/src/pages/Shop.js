import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI';
import Pages from '../components/Pages';

const Shop = observer(() => {

    const {device} = useContext(Context)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        
    }, [])

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 3).then(data => {
            console.log("search:", device.search)
            if (device.search) {
            // let rows = data.rows
            // let filteredRows = rows.filter(function (product) { 
            //     console.log(product.name.toLowerCase().indexOf(device.search.toLowerCase()))
            //     return product.name.toLowerCase().indexOf(device.search.toLowerCase()) !== -1
            // })
            // console.log("rows: ", filteredRows)
            // console.log("filtered: ", data.rows.filter(product => 
            //     product.name.toLowerCase().indexOf(device.search.toLowerCase() > -1)
            //     ))
            device.setDevices(data.rows.filter(product => 
                    product.name.toLowerCase().indexOf(device.search.toLowerCase()) !== -1
                     ))} 
            else {
            device.setDevices(data.rows)

            }

            // console.log(data.count)
            // device.setDevices(data.rows.filter(product => 
            //     product.name.toLowerCase().indexOf(device.search.toLowerCase() > -1)
            //     ))
            // device.setDevices(data.rows)
            device.setTotalCount(data.count)
        }).finally(() => setLoading(false))
    }, [device.page, device.selectedType, device.selectedBrand, device.search])

    return (
        <Container className='mt-2'> 
            <Row>
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList loading={loading}/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
})
 
export default Shop;