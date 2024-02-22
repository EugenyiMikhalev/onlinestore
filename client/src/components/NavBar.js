import React, {useContext, useEffect, useState} from 'react';
import { Context } from '../index';
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTE, FAVORITES_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import {Button, Container} from "react-bootstrap"
import {observer} from "mobx-react-lite"
import { useNavigate } from 'react-router-dom';
import { check } from '../http/userAPI';
import navLogo from '../assets/navIcons/navLogo.svg'
import logoutIcon from '../assets/navIcons/logout.svg'
import adminPanelLogo from '../assets/navIcons/adminPanel.svg'
import favIcon from '../assets/navIcons/favorites.svg'
import profileIcon from '../assets/navIcons/profile.svg'
import cartIcon from '../assets/navIcons/cart.svg'


const NavBar = observer( () => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }

    const [isAdmin, setIsAdmin] = useState(false)
    useEffect(() => {
        check().then(
          data => {
            data.role === 'ADMIN' ? setIsAdmin(true) : setIsAdmin(false)
          }, 
          error => console.log(error)
        )
      }, [user.isAuth])

    return ( 
    <Navbar bg="white" variant="white" style={{height: 100}}>
        <Container className='d-flex justify-content-between align-items-center'>
          <NavLink 
            style={{color:'black', textDecoration: 'none'}} 
            to={SHOP_ROUTE} 
            className={'d-flex align-items-center'}
          >
            <img src={navLogo} alt='Furniro'/>
            <h1 style={{fontSize: 24}} className='m-0'>Furniro</h1>
          </NavLink>
          <Nav className='d-flex justify-content-around w-100 ms-2 gap-1' style={{maxWidth: 610}}>
            <NavLink 
              style={{color:'black', textDecoration: 'none'}} 
              to={SHOP_ROUTE} 
              className={'d-flex align-items-center'}
            >
              <h1 style={{fontSize: 16, fontWeight: 500}} className='m-0'>Home</h1>
            </NavLink>
            <NavLink 
              style={{color:'black', textDecoration: 'none'}} 
              to={SHOP_ROUTE} 
              className={'d-flex align-items-center'}
            >
              <h1 style={{fontSize: 16, fontWeight: 500}} className='m-0'>Shop</h1>
            </NavLink>
            <NavLink 
              style={{color:'black', textDecoration: 'none'}} 
              to={SHOP_ROUTE} 
              className={'d-flex align-items-center'}
            >
              <h1 style={{fontSize: 16, fontWeight: 500}} className='m-0'>About</h1>
            </NavLink>
            <NavLink 
              style={{color:'black', textDecoration: 'none'}} 
              to={SHOP_ROUTE} 
              className={'d-flex align-items-center'}
            >
              <h1 style={{fontSize: 16, fontWeight: 500}} className='m-0'>Contact</h1>
            </NavLink>
          </Nav>
          {user.isAuth ?
              <Nav
              className=""
              style={{color:'black'}}
              >
                <Button onClick={() => navigate(FAVORITES_ROUTE)} variant="outline-none">
                  <img src={profileIcon} alt='Profile' style={{width: 23, height: 23}}/>
                </Button>
                <Button onClick={() => navigate(FAVORITES_ROUTE)} variant="outline-none">
                  <img src={favIcon} alt='Favorites' style={{width: 23, height: 23}}/>
                </Button>
                <Button onClick={() => navigate(FAVORITES_ROUTE)} variant="outline-none">
                  <img src={cartIcon} alt='Cart' style={{width: 23, height: 23}}/>
                </Button>
                {isAdmin && <Button onClick={() => navigate(ADMIN_ROUTE)} variant="outline-none">
                  <img src={adminPanelLogo} alt='Admin panel' style={{width: 23, height: 23}}/>
                </Button>}
                <Button
                  onClick={() => logOut()} 
                  variant="outline-none" 
                  // className='ms-2 p-0'
                >
                  <img src={logoutIcon} alt='Log out' style={{width: 23, height: 23}}/>
                </Button>

              </Nav>
              :
              <Nav
              className=""
              style={{color:'black'}}
              >
                  <Button variant="outline-dark" onClick={() => navigate(LOGIN_ROUTE)}>Authorization</Button>
              </Nav>
          }
        </Container>
        
    </Navbar>
     );
} )
 
export default NavBar;