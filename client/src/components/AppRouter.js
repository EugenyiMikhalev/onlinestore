import React, { useContext, useEffect } from 'react';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
import { authRoutes, publickRoutes } from '../routes';
import { HOME_ROUTE} from '../utils/consts';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    //scroll to top on every page change
    const location = useLocation();
    useEffect(() => {
    window.scrollTo(0,0);
    }, [location])

    
    return ( 
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            {publickRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            <Route path="*" element={<Navigate to={HOME_ROUTE} replace />}/>
        </Routes>
     ); 
})
 
export default AppRouter;