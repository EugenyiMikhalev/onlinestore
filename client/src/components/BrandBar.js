import { observer } from 'mobx-react-lite';
import React, {useContext} from 'react';
import { Context } from '../';
import { Button, Card, Row } from 'react-bootstrap';

const BrandBar = observer(() => {

    const {device} = useContext(Context)

    return ( 
        <Row className='d-flex flex-row flex-wrap align-items-center'>
            {device.brands.map(brand => 
                <Card
                    key={brand.id}
                    // md='auto'
                    style={{width: 'fit-content', cursor: 'pointer'}}
                    className='px-2 py-1 me-2'
                    border={brand.id === device.selectedBrand.id ? 'primary' : 'gray'}
                    onClick={() => {
                        device.setSelectedBrand(brand)
                        console.log(device.selectedBrand)
                    }}
                >
                    {brand.name}
                </Card>
            )}
            {(device.selectedBrand.id || device.selectedType.id) &&
            <Button 
                variant='danger'
                className='py-1 w-25'
                onClick={() =>  {
                    device.setSelectedBrand({})
                    device.setSelectedType({})
                }}
            >
                Сбросить фильтры

            </Button>}
        </Row>
     );
})
 
export default BrandBar;