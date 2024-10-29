import { useTable } from '../../hooks'
import React, { useEffect } from 'react'
import { Loading } from '../../components/Loading'
import { HeaderPage, TablesList } from '../../components/Admin'

export function OrdersAdmin() {

    const { loading, tables, getTables } = useTable()

    useEffect(() => getTables, [])

    return (
        <main className='flex flex-col w-full px-4 pb-4 rounded-md bg-[#f9fafb] dark:bg-gray-800'>
            <HeaderPage title='Ordenes' />

            {loading ? (
                <Loading />
            ) : (
                <TablesList tables={tables} />
            )}

        </main>
    )
}
