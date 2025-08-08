import { BASE_URL } from '../libs/constants'

//OBTENER TODAS LAS CATEGORIAS
export async function getCategoriesApi() {
    try {
        const url = `${BASE_URL}/api/categories/`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}

//CREAR UNA NUEVA CATEGORIA
export async function addCategoryApi(data, token) {
    try {
        const formData = new FormData()
        formData.append('image', data.image)
        formData.append('active', data.active)
        formData.append('title', data.title)

        const url = `${BASE_URL}/api/categories/`
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: 'POST',
            body: formData //Cuando se trabaja con imagenes se necesita formData
        }
        const response = await fetch(url, params)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}

//ACTUALIZAR UNA CATEGORIA
export async function updateCategoryApi(id, data, token) {
    try {
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('active', data.active)
        if (data.image) formData.append('image', data.image)

        const url = `${BASE_URL}/api/categories/${id}/`
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

//ELIMINAR UNA CATEGORIA
export async function deleteCategoryApi(id, token) {
    try {
        const url = `${BASE_URL}/api/categories/${id}/`
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

//OBTENER CATEGORIAS PARA DISPONIBLES CLIENTE
export async function getCategoriesClientApi() {
    try {
        const url = `${BASE_URL}/api/categories/?active=true`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}