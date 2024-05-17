import { $authHost, $host } from "./index";
import {jwtDecode} from "jwt-decode"

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
} 

export const getAndCountAll = async (page, limit = 5, order, search) => {
    const {data} = await $authHost.get('api/user', {params: {
        page, limit, order, search
    }})
    console.log('sending page: ', page)
    return data
}

export const accessAdmin = async () => {
    const {data} = await $authHost.get('api/user/admin')
    return data
} 

export const getItems = async (userId) => {
    const {data} = await $authHost.get('api/basket', {
        params: {userId: userId}
    })
    return data
}

export const addItem = async (item) => {
    const {data} = await $authHost.post('/api/basket', item)
    return data
}

export const removeItem = async (deviceId, basketId) => {
    console.log('in remove item:', deviceId, basketId)
    const {data} = await $authHost.post('/api/basket/removeItem',  {deviceId, basketId})
    return data
}

export const changeQuantity = async (deviceId, basketId, quantity) => {
    const {data} = await $authHost.post('/api/basket/changeQuantity', {deviceId, basketId, quantity})
    return data
}