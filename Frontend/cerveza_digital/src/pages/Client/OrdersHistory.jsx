import { Button } from 'flowbite-react'
import { map, size, forEach } from 'lodash'
import { useParams } from 'react-router-dom'
import { useOrders, useTable, usePayment } from '../../hooks'
import React, { useEffect, useState } from 'react'
import { Loading } from '../../components/Loading'
import { OrderHistoryItem } from '../../components/Client'
import { ModalClient } from '../../components/Common'

export function OrdersHistory() {

    const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrders()
    const { createPayment, getPaymentByTable } = usePayment()
    const [isRequestAccount, setIsRequestAccount] = useState(false)
    const [idTable, setIdTable] = useState(null)
    const [show, setShow] = useState(false)
    const { getTableByNumber } = useTable()
    const { tableNum } = useParams()


    useEffect(() => {
        (async () => {
            const table = await getTableByNumber(tableNum)
            const idTableTemp = table[0].id
            setIdTable(idTableTemp)

            getOrdersByTable(idTableTemp, '', 'ordering=-status,-created_at')
        })()
    }, [])

    useEffect(() => {
        (async () => {
            if (idTable) {
                const response = await getPaymentByTable(idTable)
                setIsRequestAccount(response)
            }
        })()
    }, [idTable])

    const onCreatePayment = async (paymentType) => {
        setShow(false)

        let totalPayment = 0
        forEach(orders, (order) => {
            totalPayment += Number(order.product_data.price)
        })

        const paymentData = {
            table: idTable,
            totalPayment: totalPayment.toFixed(2),
            paymentType,
            statusPayment: 'PENDING'
        }

        const payment = await createPayment(paymentData)

        for await (const order of orders) {
            await addPaymentToOrder(order.id, payment.id)
        }

        window.location.reload()
    }

    return (
        <div className='flex flex-col w-full h-full p-3 rounded-md bg-[#f9fafb] dark:bg-gray-800'>
            {loading ? (
                <Loading />
            ) : (
                <>
                    {size(orders) > 0 && (
                        <Button size='xs' className='mb-6' color='success' onClick={() => size(isRequestAccount) === 0 && setShow(!show)}>
                            {size(isRequestAccount) > 0 ? 'Cuenta ya esta pedida...' : 'Pedir la cuenta'}
                        </Button>
                    )}

                    {map(orders, (order) => (
                        <OrderHistoryItem key={order.id} order={order} />
                    ))}
                </>
            )}

            <ModalClient
                title='Medio de pago'
                show={show}
                onCloseText='Efectivo'
                onClose={() => onCreatePayment('CASH')}
                onConfirmText='Tarjeta'
                onConfirm={() => onCreatePayment('CARD')}
            />
        </div>
    )
}
