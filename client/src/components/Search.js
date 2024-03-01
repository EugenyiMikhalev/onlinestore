import React, { useContext, useState } from 'react'
import { FormControl, Row } from 'react-bootstrap'
import { Context } from '..'
import { observer } from 'mobx-react-lite'

const Search = observer (() => {

    // const [input, setInput] = useState('')
    const {device} = useContext(Context)
    
  return (
    <Row className='w-100 mx-auto mb-2'>
        <img />
        <FormControl 
            placeholder='Search...'
            value={device.search}
            onChange={e => device.setSearch(e.target.value)}
            />
    </Row>
  ) 
})

export default Search;