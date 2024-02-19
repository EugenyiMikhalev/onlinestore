import React, { useContext, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const click = async () => {

        try {
            let data;
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            user.setUser(data) //user => data
            user.setIsAuth(true)
            console.log('before navigate')
            navigate(SHOP_ROUTE)
            console.log('after navigate')

        } catch (e) {
            alert(e.response.data.message)
        }

        
        
    }

    return ( 
        <Container 
            className='d-flex justify-content-center align-items-center'
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className='p-5'>
                <h2 className='mx-auto'>
                    {isLogin ? 'Авторизация' : 'Регистрация'} 
                </h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите ваш email...'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите ваш пароль...'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type='password'
                    />
                </Form>
                <Row className='d-flex justify-content-between mt-3 '>
                    <Col>
                    {isLogin ?
                        <div>
                            Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink>
                        </div>
                    :
                        <div>
                            Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
                        </div>
                    }
                    </Col>
                    <Col
                        // style={{maxWidth: 75}}
                        md="auto"
                    >
                      
                    <Button 
                        className='align-self-end'
                        variant={"outline-success"}
                        onClick={click}
                    >
                        {isLogin ? 'Войти' : 'Зарегистрироваться'}
                    </Button>
                    </Col>
                  
                </Row>
                
            </Card>
           
        </Container>
     );
})
 
export default Auth;