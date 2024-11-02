import React, { useState } from 'react'
import { getOrdersByTableApi, checkDeliveredOrderApi, addOrderToTableApi, addPaymentToOrderApi, closeOrderApi, getOrdersByPaymentApi } from '../api/orders'

export function useOrders() {

    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState(null)

    const getOrdersByTable = async (idTable, status, ordering) => {
        try {
            setLoading(true)
            const response = await getOrdersByTableApi(idTable, status, ordering)
            setOrders(response)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    const checkDeliveredOrder = async (id) => {
        try {
            setLoading(true)
            await checkDeliveredOrderApi(id)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    const addOrderToTable = async (idTable, idProduct) => {
        try {
            await addOrderToTableApi(idTable, idProduct)
        } catch (error) {
            throw error
        }
    }

    const addPaymentToOrder = async (idOrder, idPayment) => {
        try {
            await addPaymentToOrderApi(idOrder, idPayment)
        } catch (error) {
            throw error
        }
    }

    const closeOrder = async (idOrder) => {
        try {
            await closeOrderApi(idOrder)
        } catch (error) {
            throw error
        }
    }

    const getOrdersByPayment = async (idPayment) => {
        try {
            return await getOrdersByPaymentApi(idPayment)
        } catch (error) {
            setLoading(false)
        }
    }

    return {
        loading,
        orders,
        getOrdersByTable,
        checkDeliveredOrder,
        addOrderToTable,
        addPaymentToOrder,
        closeOrder,
        getOrdersByPayment
    }
}
