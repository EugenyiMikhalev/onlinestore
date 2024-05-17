import React, { useContext } from 'react';
import { Container, ListGroup, Row, Button } from 'react-bootstrap';
import {observer} from 'mobx-react-lite';
import { Context } from '../index';
// import Search from './Search';
import resetIcon from '../assets/shop/reset.png'

const TypeBar = observer(() => {
    const {device} = useContext(Context)
    return ( <Container className=''>
        {/* <Search /> */}
        <div className='d-flex justify-content-start gap-4 align-items-center'>
            Select Type: 
            {device.types.map(type =>
                <div 
                    style={ type.id === device.selectedType.id ? {cursor: 'pointer', border: 'black solid 2px', backgroundColor: '#000', color: '#F9F1E7'} : {cursor: 'pointer', border: 'black solid 2px'}}
                    // active={type.id === device.selectedType.id}
                    onClick={() => {
                        if(type.id === device.selectedType.id)
                            device.setSelectedType({})
                        else
                            device.setSelectedType(type)
                    }}
                    key={type.id}
                    className='px-2 py-1'
                >
                    {type.name}
                </div>
            )}
            {device.selectedType.id &&
            <Button 
                variant='light'
                className='p-1'
                style={{borderRadius: 100, backgroundColor: '#F9F1E7',borderColor: '#F9F1E7'}}
                onClick={() =>  {
                    
                    device.setSelectedType({})
                }}
            >
                <img src={resetIcon} style={{width: 25}}/>

            </Button>}
        </div></Container>
     );
})
 
export default TypeBar;