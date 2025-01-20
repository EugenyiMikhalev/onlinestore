import { $authHost, $host } from "./index";
import {jwtDecode} from "jwt-decode"

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const deleteType = async (id) => {
    const {data} = await $authHost.post('api/type/delete', id)
    return data
}

export const fetchTypes = async () => { 
    const {data} = await $host.get('api/type')
    return data
}

export const fetchOneType = async (id) => {
    const {data} = await $host.get('api/type/' + id)
    return data
}
 
export const createBrand = async (brand) => { 
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const deleteBrand = async (id) => {
    const {data} = await $authHost.post('api/brand/delete', id)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}

export const fetchOneBrand = async (id) => {
    const {data} = await $host.get('api/brand/' + id)
    return data
}

export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)
    return data
}

export const changeDevice = async (id, device) => {
    const {data} = await $authHost.post('api/device/' + id + '/change', device)
    return data
}

export const deleteDevice = async (device) => {
    const {data} = await $authHost.post('api/device/delete', device)
    return data
}

export const fetchDevices = async (typeId, brandId, page, limit = 5, search, order) => {
    const {data} = await $host.get('api/device', {params: {
        typeId, brandId, page, limit, search, order
    }})
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}

export const fetchRatings = async (id) => {
    const {data} = await $host.get('api/rating', {
        params: {id: id}
    })
    return data
}

export const createRating = async (rating) => {
    const {data} = await $host.post('api/rating', rating)
    return data
}



