import { BASE_URL } from '../libs/constants'

//INICIAR SESION
export async function loginApi(formData) {
    try {
        const url = `${BASE_URL}/api/auth/login/`
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }

        const response = await fetch(url, params)

        if (response.status !== 200) {
            throw new Error('¡Acceso denegado! Verifique los datos ingresados.')
        }

        const result = await response.json()
        return result

    } catch (error) {
        throw error
    }
}

//OBTENER DATOS DE USUARIO LOGEADO
export async function getMeApi(token) {
    try {
        const url = `${BASE_URL}/api/auth/me/`
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

//OBTENER LA LISTA DE USUARIOS
export async function getUsersApi(token) {
    try {
        const url = `${BASE_URL}/api/users/`
        const params = {
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: 'GET'
        }

        const response = await fetch(url, params)
        const result = await response.json()
        return result

    } catch (error) {
        throw error
    }
}

//CREAR UN NUEVO USUARIO
export async function addUserApi(data, token) {
    try {
        const url = `${BASE_URL}/api/users/`
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

//ACTUALIZAR UN USUARIO
export async function updateUserApi(id, data, token) {
    try {
        const url = `${BASE_URL}/api/users/${id}/`
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify(data)
        }
        const response = await fetch(url, params)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}

//ELIMINAR UN USUARIO  
export async function deleteUserApi(id, token) {
    try {
        const url = `${BASE_URL}/api/users/${id}/`
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
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