import React from 'react'
import { Table, Button } from 'flowbite-react'
import { MdPayment, MdPayments } from 'react-icons/md'
import { useOrders, usePayment } from '../../../../hooks'

export function PaymentDetail(props) {

    const { payment, orders, onClose, onRefresh } = props
    const { closePayment } = usePayment()
    const { closeOrder } = useOrders()

    //CERRAR MESA (CAMBIAR PAYMENT DE PENDING A PAID)
    const onCloseTable = async () => {
        const result = window.confirm('¿Desea cerrar esta mesa?')
        if (result) {
            await closePayment(payment.id)

            for await (const order of orders) {
                await closeOrder(order.id)
            }

            onRefresh()
            onClose()
        }
    }

    return (
        <div className='flex flex-col gap-4'>
            <Table>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Mesa: </Table.Cell>
                        <Table.Cell className='text-center'>{payment.table_data.number}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Total: </Table.Cell>
                        <Table.Cell className='text-center'>$ {payment.totalPayment}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Forma de pago: </Table.Cell>
                        <Table.Cell className='flex justify-center'>
                            {payment.paymentType === 'CASH' ? <MdPayments size={18} /> : <MdPayment size={18} />}
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>

            <Button size='xs' onClick={onCloseTable} >Cerrar mesa</Button>
        </div>
    )
}
