import React, { useState } from 'react'
import { createPaymentApi, getPaymentByTableApi, closePaymentApi, getPaymentsApi } from '../api/payment'

export function usePayment() {

    const [loading, setLoading] = useState(false)
    const [payments, setPayments] = useState(null)

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

    const getPayments = async () => {
        try {
            setLoading(true)
            const response = await getPaymentsApi()
            setPayments(response)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            throw error
        }
    }

    return {
        loading,
        payments,
        createPayment,
        getPaymentByTable,
        closePayment,
        getPayments,
        getPayments
    }
}
