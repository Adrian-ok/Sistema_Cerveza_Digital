import { useState } from 'react'
import { useAuth } from '../hooks'
import { getProductsApi, addProductsApi, updateProductsApi, deleteProductsApi, getProductByIdApi, getProductsByCategoryApi } from '../api/product'


export function useProduct() {

    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState(null)
    const { auth } = useAuth()

    const getProducts = async () => {
        try {
            setLoading(true)
            const result = await getProductsApi()
            setLoading(false)
            setProducts(result)
        } catch (error) {
            setLoading(false)
        }
    }

    const getProductById = async (id) => {
        try {
            const result = await getProductByIdApi(id)
            return result
        } catch (error) {
            setLoading(false)
        }
    }

    const addProducts = async (data) => {
        try {
            setLoading(false)
            await addProductsApi(data, auth.token)
            setLoading(true)
        } catch (error) {
            setLoading(false)
        }
    }

    const updateProducts = async (id, data) => {
        try {
            setLoading(false)
            await updateProductsApi(id, data, auth.token)
            setLoading(true)
        } catch (error) {
            setLoading(false)
        }
    }

    const deleteProducts = async (id) => {
        try {
            setLoading(false)
            await deleteProductsApi(id, auth.token)
            setLoading(true)
        } catch (error) {
            setLoading(false)
        }
    }

    const getProductsByCategory = async (id) => {
        try {
            setLoading(true)
            const result = await getProductsByCategoryApi(id)
            setProducts(result)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    return {
        getProducts,
        addProducts,
        updateProducts,
        deleteProducts,
        getProductById,
        getProductsByCategory,
        loading,
        products
    }
}
