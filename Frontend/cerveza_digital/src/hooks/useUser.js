import { useState } from 'react'
import { useAuth } from '../hooks'
import { getMeApi, getUsersApi, addUserApi, updateUserApi, deleteUserApi } from '../api/user'

export function useUser() {

    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const { auth } = useAuth()

    const getMe = async (token) => {
        try {
            const response = await getMeApi(token)
            return response
        } catch (error) {
            throw error
        }
    }

    const getUsers = async () => {
        try {
            setLoading(true)
            const response = await getUsersApi(auth.token)
            setLoading(false)
            setUsers(response)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    const addUser = async (data) => {
        try {
            setLoading(true)
            await addUserApi(data, auth.token)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    const updateUser = async (id, data) => {
        try {
            setLoading(true)
            await updateUserApi(id, data, auth.token)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    const deleteUser = async (id) => {
        try {
            setLoading(true)
            await deleteUserApi(id, auth.token)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error)
        }
    }

    return {
        getMe,
        getUsers,
        addUser,
        updateUser,
        deleteUser,
        users,
        loading
    }
}