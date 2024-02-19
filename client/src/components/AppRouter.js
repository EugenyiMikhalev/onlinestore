import React, { useContext } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import { authRoutes, publickRoutes } from '../routes';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {
    const {user} = useContext(Context)

    return ( 
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            {publickRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )} 
            {/* <Redirect to={SHOP_ROUTE} /> */}
            <Route path="*" element={<Navigate to={SHOP_ROUTE} replace />}/>
        </Routes>
     ); 
})
 
export default AppRouter;