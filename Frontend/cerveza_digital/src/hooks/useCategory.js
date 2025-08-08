import { useState } from 'react'
import { getCategoriesApi, addCategoryApi, updateCategoryApi, deleteCategoryApi, getCategoriesClientApi } from '../api/category'
import { useAuth } from '../hooks'

export function useCategory() {

    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState(null)
    const { auth } = useAuth()

    const getCategories = async () => {
        try {
            setLoading(true)
            const response = await getCategoriesApi()
            setCategories(response)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    const addCategory = async (data) => {
        try {
            setLoading(true)
            await addCategoryApi(data, auth.token)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    const updateCategory = async (id, data) => {
        try {
            setLoading(true)
            await updateCategoryApi(id, data, auth.token)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(true)
        }
    }

    const deleteCategory = async (id) => {
        try {
            setLoading(true)
            await deleteCategoryApi(id, auth.token)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(true)
        }
    }

    const getCategoriesClient = async () => {
        try {
            setLoading(true)
            const response = await getCategoriesClientApi()
            setCategories(response)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    return {
        deleteCategory,
        updateCategory,
        getCategories,
        addCategory,
        getCategoriesClient,
        categories,
        loading
    }
}
