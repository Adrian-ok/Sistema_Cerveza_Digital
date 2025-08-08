import { BASE_URL } from '../libs/constants'

//OBTENER LISTADO DE PRODUCTOS
export async function getProductsApi() {
    try {
        const url = `${BASE_URL}/api/products/`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}

//OBTENER DATOS DE UN PRODUCTO POR ID
export async function getProductByIdApi(id) {
    try {
        const url = `${BASE_URL}/api/products/${id}/`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}

//CREAR UN NUEVO PRODUCTO
export async function addProductsApi(data, token) {
    try {
        const formData = new FormData()
        formData.append('image', data.image)
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('price', data.price)
        formData.append('active', data.active)
        formData.append('category', data.category)

        const url = `${BASE_URL}/api/products/`
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: 'POST',
            body: formData
        }
        const response = await fetch(url, params)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}

//ACTUALIZAR UN PRODUCTO
export async function updateProductsApi(id, data, token) {
    try {
        const formData = new FormData()
        if (data.image) formData.append('image', data.image)
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('price', data.price)
        formData.append('active', data.active)
        formData.append('category', data.category)

        const url = `${BASE_URL}/api/products/${id}/`
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: 'PATCH',
            body: formData
        }
        const response = await fetch(url, params)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}

//ELIMINAR UN PRODUCTO
export async function deleteProductsApi(id, token) {
    try {
        const url = `${BASE_URL}/api/products/${id}/`
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: 'DELETE',
        }
        const response = await fetch(url, params)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}

//OBTENER LOS PRODUCTOS DE UNA CATEGORIA
export async function getProductsByCategoryApi(idCategory) {
    try {
        const url = `${BASE_URL}/api/products/?category=${idCategory}&active=true`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}