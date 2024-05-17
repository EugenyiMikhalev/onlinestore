import React from 'react';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import filterIcon from '../assets/shop/filter.png'

function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log('totally custom!'),
    );
    return ( <button
        type="button"
        // style={{ backgroundColor: '#F9F1E7', border: 'none'}}
        onClick={decoratedOnClick}
        className='shop-filter'
      >
        <img src={filterIcon} className='me-2'/>
        {children}
      </button> );
}

export default CustomToggle;
