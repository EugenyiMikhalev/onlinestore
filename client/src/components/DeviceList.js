import { observer } from 'mobx-react-lite';
import React, {useContext} from 'react';
import { Row } from 'react-bootstrap';
import DeviceItem from './DeviceItem';
import { Context } from '../index';

const DeviceList = observer( () => {

    const {device} = useContext(Context)
        
    return ( 
        <Row className='d-flex'>
            {device.devices.length !== 0 ? 
            device.devices.map(item => 
               <DeviceItem key={item.id} device={item} brands={device.brands}/>   
            )
            :
            'По вашему запросу не найдено устройств...'
            }
        </Row>
     );
})
 
export default DeviceList; 