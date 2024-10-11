import { useState } from 'react'
import { getCategoriesApi } from '../api/category'
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
            setError(true)
        }
    }

    return {
        getCategories,
        categories,
        loading
    }
}
