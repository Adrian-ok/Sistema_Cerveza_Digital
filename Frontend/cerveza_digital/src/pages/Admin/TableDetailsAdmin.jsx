import { useParams } from 'react-router-dom'
import { useOrders, useTable } from '../../hooks'
import React, { useEffect, useState } from 'react'
import { Loading } from '../../components/Loading'
import { ModalBasic } from '../../components/Common'
import { HeaderPage, ListOrderAdmin, AddOrderForm } from '../../components/Admin'


export function TableDetailsAdmin() {

    const { id } = useParams()
    const { getTable, table } = useTable()
    const [refresh, setRefresh] = useState(false)
    const { loading, orders, getOrdersByTable } = useOrders()
    const [show, setShow] = useState(false)

    useEffect(() => {
        getOrdersByTable(id, '', 'ordering=-status,created_at')
    }, [id, refresh])

    useEffect(() => { getTable(id) }, [])

    const onRefresh = () => setRefresh((prev) => !prev)
    const showOrHide = () => setShow((prev) => !prev)

    return (
        <main className='flex flex-col w-full px-4 pb-4 rounded-md bg-[#f9fafb] dark:bg-gray-800'>
            <HeaderPage title={`Mesa ${table?.number || ''}`} btnTitle='Añadir pedido' btnClick={showOrHide} />

            {loading ? (
                <Loading />
            ) : (
                <ListOrderAdmin orders={orders} onRefresh={onRefresh} />
            )}

            <ModalBasic
                size='sm'
                show={show}
                showOrHide={showOrHide}
                title={'Generar pedido'}
                children={<AddOrderForm idTable={id} onClose={showOrHide} onRefresh={onRefresh} />}
            />
        </main>
    )
}
