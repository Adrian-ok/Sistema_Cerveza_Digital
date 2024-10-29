import { BASE_URL } from '../libs/constants'

//OBTENER LISTADO DE MESAS
export async function getTablesApi(token) {
    try {
        const url = `${BASE_URL}/api/tables/`
        const params = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const response = await fetch(url, params)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}

//OBTENER UNA MESA POR ID
export async function getTableApi(idTable) {
    try {
        const url = `${BASE_URL}/api/tables/${idTable}/`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}

//AÑADIR UNA NUEVA MESA
export async function addTableApi(data, token) {
    try {
        const url = `${BASE_URL}/api/tables/`
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        }
        const response = await fetch(url, params)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}

//ACTUALIZAR UNA MESA
export async function updateTableApi(id, data, token) {
    try {
        const formData = new FormData()
        formData.append('number', data.number)

        const url = `${BASE_URL}/api/tables/${id}/`
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

//ELIMINAR UNA MESA
export async function deleteTableApi(id, token) {
    try {
        const url = `${BASE_URL}/api/tables/${id}/`
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