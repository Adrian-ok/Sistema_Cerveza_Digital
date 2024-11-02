import { useParams } from 'react-router-dom'
import { useOrders, useTable, usePayment } from '../../hooks'
import React, { useEffect, useState } from 'react'
import { Loading } from '../../components/Loading'
import { ModalBasic } from '../../components/Common'
import { HeaderPage, ListOrderAdmin, AddOrderForm, PaymentDetail } from '../../components/Admin'
import { forEach, size } from 'lodash'


export function TableDetailsAdmin() {

    const { id } = useParams()
    const { getTable, table } = useTable()
    const { createPayment, getPaymentByTable } = usePayment()
    const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrders()

    const [show, setShow] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [paymentData, setPaymentData] = useState(null)

    useEffect(() => { getOrdersByTable(id, '', 'ordering=-status,created_at') }, [id, refresh])
    useEffect(() => { getTable(id) }, [id])
    useEffect(() => {
        (async () => {
            const response = await getPaymentByTable(id)
            if (size(response) > 0) setPaymentData(response[0])
        })()
    }, [refresh])

    // console.log(paymentData)

    // console.log(size(orders))

    const onRefresh = () => setRefresh((prev) => !prev)
    const showOrHide = () => setShow((prev) => !prev)

    //CREAR CUENTA DE LA MESA
    const onCreatePayment = async () => {
        const result = window.confirm('¿Desea generar la cuenta para esta mesa?')

        if (result) {

            let totalPayment = 0

            forEach(orders, (order) => {
                totalPayment += Number(order.product_data.price)
            })

            const paymentData = {
                table: id,
                totalPayment: totalPayment.toFixed(2),
                paymentType: 'CASH',
                statusPayment: 'PENDING'
            }

            const payment = await createPayment(paymentData)

            for await (const order of orders) {
                await addPaymentToOrder(order.id, payment.id)
            }

            onRefresh()
        }
    }

    return (
        <main className='flex flex-col w-full px-4 pb-4 rounded-md bg-[#f9fafb] dark:bg-gray-800'>
            <HeaderPage
                title={`Mesa ${table?.number || ''}`}
                btnTitle={paymentData ? 'Ver cuenta' : 'Añadir pedido'}
                btnClick={showOrHide}
                btnTitleTwo={!paymentData & size(orders) > 0 ? 'Generar cuenta' : null}
                btnClickTwo={onCreatePayment}

            />

            {loading ? (
                <Loading />
            ) : (
                <ListOrderAdmin orders={orders} onRefresh={onRefresh} />
            )}

            <ModalBasic
                size='sm'
                show={show}
                showOrHide={showOrHide}
                title={paymentData ? 'Detalle de cuenta' : 'Generar pedido'}
            >
                {paymentData ? (
                    <PaymentDetail payment={paymentData} orders={orders} onClose={showOrHide} onRefresh={onRefresh} />
                ) : (
                    <AddOrderForm idTable={id} onClose={showOrHide} onRefresh={onRefresh} />
                )}
            </ModalBasic>
        </main>
    )
}
