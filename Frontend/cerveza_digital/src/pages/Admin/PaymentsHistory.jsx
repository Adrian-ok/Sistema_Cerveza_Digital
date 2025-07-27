import React, { useEffect } from 'react'
import { usePayment } from '../../hooks'
import { Loading } from '../../components/Loading'
import { HeaderPage, TablePayments } from '../../components/Admin'

export function PaymentsHistory() {

    const { loading, payments, getPayments } = usePayment()

    useEffect(() => {
        getPayments()
    }, [])

    return (
        <main className='flex flex-col w-full px-4 pb-4 rounded-md bg-[#f9fafb] dark:bg-gray-800'>
            <HeaderPage title='Historial de pagos' />

            {loading ? (
                <Loading />
            ) : (
                <TablePayments payments={payments} />
            )}
        </main>
    )
}
