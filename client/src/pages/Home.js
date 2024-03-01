import React from 'react'
import { Button, Container } from 'react-bootstrap'
import homeBackground from '../assets/home/homeBackground.png'
import { useNavigate } from 'react-router-dom'
import { SHOP_ROUTE } from '../utils/consts'

export default function Home() {

    const navigate = useNavigate()


  return (
    <Container 
        fluid 
        className='p-0 d-flex align-items-center justify-content-center'
        style={{maxWidth: 1440, position: 'relative', height: '90vh', overflow: 'hidden', backgroundColor: '#fff'}} 
        // style={{backgroundImage: `url(${homeBackground})`, backgroundRepeat: 'no-repeat', backgroundSize: 'fit',height: 1000}}
    >
        <img src={homeBackground} style={{width: '100%'}}/>
        <div style={{position: 'absolute', backgroundColor: '#FFF3E3', padding: '50px 40px', maxWidth: '43%', right: 58, top: '15%', borderRadius: 10}}>
            <h2 
                style={{fontSize: 16, fontWeight: 500, letterSpacing: 3}}
            >New Arrival</h2>
            <h1
                style={{fontSize: 52, fontWeight: 800, letterSpacing: 0, lineHeight: '65px', color: '#B88E2F'}}
            >Discover Our <br/>New Collection</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
            <Button
                onClick={() => navigate(SHOP_ROUTE)}
                style={{textTransform: 'uppercase', borderRadius: 0, backgroundColor: '#B88E2F', border: 'none', fontSize: 16, fontWeight: 800, padding: "25px 72px"}}
            >
                buy now
            </Button>
        </div>
    </Container>
  )
}
