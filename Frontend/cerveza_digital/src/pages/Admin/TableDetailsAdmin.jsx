import { forEach, size } from 'lodash'
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Loading } from '../../components/Loading'
import { ModalBasic, showConfirmToast } from '../../components/Common'
import { useOrders, useTable, usePayment } from '../../hooks'
import { HeaderPage, ListOrderAdmin, AddOrderForm, PaymentDetail } from '../../components/Admin'
import { toast } from 'react-toastify'

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

    const onRefresh = () => setRefresh((prev) => !prev)
    const showOrHide = () => setShow((prev) => !prev)

    //CREAR CUENTA DE LA MESA
    const onCreatePayment = async () => {
        const result = window.confirm('¿Desea generar la cuenta para esta mesa?')
        // const result = await confirmWithToast()

        if (result) {

            let totalPayment = 0

            forEach(orders, (order) => {
                totalPayment += Number(order.product_data.price)
            })

            const resultTypePayment = window.confirm('¡Pago con efectivo pulsa ACEPTAR con tarjeta pulsa CANCELAR!');
            // const resultTypePayment = await generateAccount()

            const paymentData = {
                table: id,
                totalPayment: totalPayment.toFixed(2),
                paymentType: resultTypePayment ? 'CASH' : 'CARD',
                statusPayment: 'PENDING'
            }

            const payment = await createPayment(paymentData)

            for await (const order of orders) {
                await addPaymentToOrder(order.id, payment.id)
            }

            onRefresh()
            setPaymentData(null)
        }
    }

    return (
        <main className='flex flex-col w-full px-4 pb-4 rounded-md bg-[#f9fafb] dark:bg-gray-800'>
            <HeaderPage
                title={`Mesa ${table?.number || ''}`}
                btnTitle={size(paymentData) > 0 & size(orders) > 0 ? "Ver cuenta" : "Añadir pedido"}
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

// function confirmWithToast() {
//     return new Promise((resolve) => {
//         toast(() => (
//             <div className='bg-white p-4 rounded shadow w-72 flex flex-col gap-2'>
//                 <p className='text-sm'>¿Desea generar la cuenta para esta mesa?</p>
//                 <div className='flex justify-end gap-2'>
//                     <button
//                         onClick={() => { resolve(false) }}
//                         className='px-3 py-1 text-sm bg-gray-300 rounded hover:bg-gray-400'
//                     >
//                         No
//                     </button>
//                     <button
//                         onClick={() => { resolve(true) }}
//                         className='px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700'
//                     >
//                         Sí
//                     </button>
//                 </div>
//             </div>
//         ))
//     })
// }

// function generateAccount() {
//     return new Promise((resolve) => {
//         toast(() => (
//             <div className='bg-white p-4 rounded shadow w-72 flex flex-col gap-2'>
//                 <p className='text-sm'>Seleccione el metodo de pago</p>
//                 <div className='flex justify-end gap-2'>
//                     <button
//                         onClick={() => { resolve(false) }}
//                         className='px-3 py-1 text-sm bg-gray-300 rounded hover:bg-gray-400'
//                     >
//                         Tarjeta
//                     </button>
//                     <button
//                         onClick={() => { resolve(true) }}
//                         className='px-3 py-1 text-sm bg-emerald-700 text-white rounded hover:bg-emerald-800'
//                     >
//                         Efectivo
//                     </button>
//                 </div>
//             </div>
//         ))
//     })
// }