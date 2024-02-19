import { observer } from 'mobx-react-lite';
import React, {useContext} from 'react';
import { Context } from '../';
import { Card, Row } from 'react-bootstrap';

const BrandBar = observer(() => {

    const {device} = useContext(Context)


    return ( 
        <Row className='d-flex flex-row flex-wrap'>
            {device.brands.map(brand => 
                <Card
                    key={brand.id}
                    // md='auto'
                    style={{width: 'fit-content', cursor: 'pointer'}}
                    className='p-3'
                    border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                    onClick={() => {
                        device.setSelectedBrand(brand)
                        console.log(device.selectedBrand)
                    }}
                >
                    {brand.name}
                </Card>
            )}
        </Row>
     );
})
 
export default BrandBar;