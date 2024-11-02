import { size } from 'lodash'
import { Badge } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { MdPaid } from 'react-icons/md'
import { usePayment } from '../../../../hooks'
import React, { useEffect, useState } from 'react'
import { ORDER_STATUS } from '../../../../libs/constants'
import { MesaSvg } from '../../../../assets/image/MesaSvg'
import { getOrdersByTableApi } from '../../../../api/orders'

export function Table(props) {

    const { table, refresh } = props
    const [orders, setOrders] = useState([])
    const [tableBusy, setTableBusy] = useState(false)
    const [pendingPayment, setPendingPayment] = useState(false)

    const { getPaymentByTable } = usePayment()

    useEffect(() => {
        (async () => {
            const response = await getPaymentByTable(table.id)

            if (size(response) > 0) setPendingPayment(true)
            else setPendingPayment(false)
        })()
    }, [refresh])

    useEffect(() => {
        (async () => {
            const response = await getOrdersByTableApi(table.id, ORDER_STATUS.PENDING)
            setOrders(response)
        })()
    }, [refresh])

    useEffect(() => {
        (async () => {
            const response = await getOrdersByTableApi(table.id, ORDER_STATUS.DELIVERED)

            if (size(response) > 0) setTableBusy(response)
            else setTableBusy(false)
        })()
    }, [refresh])

    const setColor = () => {
        if (size(orders) > 0) {
            return 'orange'
        }
        else if (pendingPayment) {
            return 'forestgreen'
        }
        else if (tableBusy) {
            return 'dodgerblue'
        }
    };

    return (
        <Link
            className='flex flex-col items-center justify-center hover:opacity-50 cursor-pointer '
            to={`/admin/table/${table.id}`}
        >

            {size(orders) > 0 ? (
                <Badge color='warning' size='xs' className=''>{size(orders)}</Badge>
            ) : (
                null
            )}

            {pendingPayment && (
                <Badge icon={MdPaid} color='success' >Cuenta</Badge>
            )}

            <MesaSvg
                width={100}
                height={100}
                color={setColor()}
            />
            <p className='dark:text-white' >Mesa: {table.number}</p>
        </Link>
    )
}
