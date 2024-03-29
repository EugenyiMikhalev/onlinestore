import { observer } from 'mobx-react-lite';
import React, {useContext} from 'react';
import { Row, Spinner } from 'react-bootstrap';
import DeviceItem from './DeviceItem';
import { Context } from '../index';

const DeviceList = observer( ({loading}) => {

    const {device} = useContext(Context)

    if(loading) {
        return <Spinner animation='grow'/>
      }
        
    return ( 
        <Row className='d-flex'>
            {device.devices.length !== 0 ? 
            device.devices.map(item => 
               <DeviceItem key={item.id} device={item} brands={device.brands}/>   
            )
            :
            <p style={{fontSize: 20, marginTop: 50}}>По вашему запросу не найдено устройств...</p>
            }
        </Row>
     );
})
 
export default DeviceList; 