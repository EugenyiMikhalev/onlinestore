import { observer } from 'mobx-react-lite';
import React, {useContext} from 'react';
import { Context } from '../';
import { Button, Card, Row, Container } from 'react-bootstrap';
import resetIcon from '../assets/shop/reset.png'

const BrandBar = observer(() => {

    const {device} = useContext(Context)

    return ( 
        // <Row className='d-flex flex-row flex-wrap align-items-center'>
        //     {device.brands.map(brand => 
        //         <Card
        //             key={brand.id}
        //             // md='auto'
        //             style={{width: 'fit-content', cursor: 'pointer'}}
        //             className='px-2 py-1 me-2'
        //             border={brand.id === device.selectedBrand.id ? 'primary' : 'gray'}
        //             onClick={() => {
        //                 device.setSelectedBrand(brand)
        //                 console.log(device.selectedBrand)
        //             }}
        //         >
        //             {brand.name}
        //         </Card>
        //     )}
        //     {device.selectedBrand.id &&
        //     <Button 
        //         variant='danger'
        //         className='py-1'
        //         onClick={() =>  {
        //             device.setSelectedBrand({})
                   
        //         }}
        //     >
        //         Remove filters

        //     </Button>}
        // </Row>
        <Container className=''>
         <div className='d-flex justify-content-start gap-4 align-items-center'>
         Select brand: 
         {device.brands.map(brand =>
             <div 
                 style={ brand.id === device.selectedBrand.id ? {cursor: 'pointer', border: 'black solid 2px', backgroundColor: '#000', color: '#F9F1E7'} : {cursor: 'pointer', border: 'black solid 2px'}}
                //  active={brand.id === device.selectedBrand.id}
                 onClick={() => {
                    if(brand.id === device.selectedBrand.id)
                        device.setSelectedBrand({})
                    else
                        device.setSelectedBrand(brand)
                    }}
                 key={brand.id}
                 className='px-2 py-1'
             >
                 {brand.name}
             </div>
         )}
         {device.selectedBrand.id &&
         <Button 
             variant='light'
             className='p-1'
             style={{borderRadius: 100, backgroundColor: '#F9F1E7',borderColor: '#F9F1E7'}}
             onClick={() =>  {
                 
                 device.setSelectedBrand({})
             }}
         >
             <img src={resetIcon} style={{width: 25}}/>

         </Button>}
     </div></Container>
     );
})
 
export default BrandBar;