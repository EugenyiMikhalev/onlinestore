import React, { useContext } from 'react';
import {Dropdown} from 'react-bootstrap'
import { Context } from '..';
import { observer } from 'mobx-react-lite';




const SortDevices = observer(() => {

    const {device} = useContext(Context)

    return ( 
        <Dropdown >
            <Dropdown.Toggle variant="light" id="dropdown-basic" className='dropdown-light'>
                Sort by
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item 
                    onClick={() => 
                        device.setSortOrder('id')

                    }
                >default</Dropdown.Item>
                <Dropdown.Item 
                onClick={() => 
                    device.setSortOrder('name')

                }
                >name</Dropdown.Item>
                <Dropdown.Item 
                onClick={() => 
                    device.setSortOrder('price')

                }
                >{'price (high to low)'}</Dropdown.Item>
                <Dropdown.Item 
                onClick={() => 
                    device.setSortOrder('createdAt')

                }
                >{'new to old'}</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown> );
})

export default SortDevices;