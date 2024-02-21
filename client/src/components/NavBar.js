import React, {useContext, useEffect, useState} from 'react';
import { Context } from '../index';
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import {Button, Container} from "react-bootstrap"
import {observer} from "mobx-react-lite"
import { useNavigate } from 'react-router-dom';
import { check } from '../http/userAPI';

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
    <Navbar bg="dark" variant="dark">
        <Container className='d-flex justify-content-between align-items-center'>
        <NavLink 
          style={{color:'white', textDecoration: 'none'}} 
          to={SHOP_ROUTE} 
          className={'d-flex align-items-center'}
        >
          <h1 style={{fontSize: 24}} className='m-0'>OnlineStore</h1>
        </NavLink>
        {user.isAuth ? 
            <Nav
            className=""
            style={{color:'white'}}
            >
                {isAdmin && <Button onClick={() => navigate(ADMIN_ROUTE)} variant="outline-light">
                  Админ панель
                </Button>}
                <Button onClick={() => logOut()} variant="outline-light" className='ms-2'>Выйти</Button>

            </Nav>
            :
            <Nav
            className=""
            style={{color:'white'}}
            >
                <Button variant="outline-light" onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
            </Nav>
        }
        </Container>
        
    </Navbar>
     );
} )
 
export default NavBar;