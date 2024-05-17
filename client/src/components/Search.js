import React, { useContext, useState } from 'react'
import { Form, FormControl, Row } from 'react-bootstrap'
import { Context } from '..'
import { observer } from 'mobx-react-lite'

const Search = observer (() => {

    // const [input, setInput] = useState('')
    const {device} = useContext(Context)
    
  return (
    <Row className=''>
        <img />
        <Form className='shop-search'>
        <FormControl 
            placeholder='Search...'
            value={device.search}
            onChange={e => device.setSearch(e.target.value)}
            /> </Form>
    </Row>
  ) 
})

export default Search;