import React, { useState } from 'react'
import { createPaymentApi, getPaymentByTableApi, closePaymentApi } from '../api/payment'

export function usePayment() {

    const [loading, setLoading] = useState(false)

    const createPayment = async (paymentData) => {
        try {
            return await createPaymentApi(paymentData)
        } catch (error) {
            throw error
        }
    }

    const getPaymentByTable = async (idTable) => {
        try {
            return await getPaymentByTableApi(idTable)
        } catch (error) {
            throw error
        }
    }

    const closePayment = async (idPayment) => {
        try {
            await closePaymentApi(idPayment)
        } catch (error) {
            throw error
        }
    }

    return {
        loading,
        createPayment,
        getPaymentByTable,
        closePayment
    }
}
