import { observer } from 'mobx-react-lite';
import React, {useContext} from 'react';
import { Context } from '../';
import { Button, Card, Row, Container } from 'react-bootstrap';
import resetIcon from '../assets/shop/reset.png'

const BrandBar = observer(() => {

    const {device} = useContext(Context)

    return ( 
        <Container className=''>
         <div className='d-flex justify-content-start gap-4 align-items-center flex-wrap'>
         Select brand: 
         {device.brands.map(brand =>
             <div 
                 style={ brand.id === device.selectedBrand.id ? {cursor: 'pointer', border: 'black solid 2px', backgroundColor: '#000', color: '#F9F1E7', fontWeight: '600'} : {cursor: 'pointer', border: 'black solid 2px', fontWeight: '600'}}
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