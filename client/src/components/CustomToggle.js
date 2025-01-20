import React from 'react';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { ReactComponent as SvgIcon } from '../assets/shop/filter.svg'

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
        <SvgIcon className='me-2' style={{width: 20, height: 20}} />
        {children}
      </button> );
}

export default CustomToggle;
