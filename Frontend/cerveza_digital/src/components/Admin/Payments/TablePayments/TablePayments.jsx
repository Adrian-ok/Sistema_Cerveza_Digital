import { map } from 'lodash'
import { format } from '@formkit/tempo'
import React, { useState } from 'react'
import { ModalBasic } from '../../../Common'
import { Button, Table } from 'flowbite-react'
import { MdPayment, MdPayments, MdRemoveRedEye } from 'react-icons/md'
import { PaymentProductList } from '../../../Admin'

export function TablePayments(props) {

    const [show, setShow] = useState(false)
    const [title, setTitle] = useState(null)
    // const [refresh, setRefresh] = useState(false)
    const [component, setComponent] = useState(null)

    const { payments } = props

    const showOrHide = () => setShow((prev) => !prev)
    // const onRefresh = () => setRefresh((prev) => !prev)

    const showDetails = (payment) => {
        setTitle(`Detalle de mesa: ${payment.table_data.number}`)
        setComponent(<PaymentProductList payment={payment} />)
        showOrHide()
    }

    return (
        <div className='flex flex-col h-full overflow-auto'>
            <Table className='text-center'>
                <Table.Head>
                    <Table.HeadCell>Id pago</Table.HeadCell>
                    <Table.HeadCell>Mesa</Table.HeadCell>
                    <Table.HeadCell>Total</Table.HeadCell>
                    <Table.HeadCell>Tipo de pago</Table.HeadCell>
                    <Table.HeadCell>Fecha</Table.HeadCell>
                    <Table.HeadCell>Ver detalle</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {map(payments, (payment, index) => (
                        <Table.Row key={index} >
                            <Table.Cell># {payment.id}</Table.Cell>
                            <Table.Cell>{payment.table_data.number}</Table.Cell>
                            <Table.Cell>$ {payment.totalPayment}</Table.Cell>
                            <Table.Cell className='flex justify-center'>{payment.paymentType === 'CASH' ? <MdPayments size={20} /> : <MdPayment size={20} />}</Table.Cell>
                            <Table.Cell>{format(payment.created_at, 'DD/MM/YYYY HH:mm')}</Table.Cell>
                            <Table.Cell>
                                <button onClick={() => showDetails(payment)} >
                                    <MdRemoveRedEye size={20} />
                                </button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            <ModalBasic title={title} children={component} show={show} showOrHide={showOrHide} />
        </div>
    )
}
