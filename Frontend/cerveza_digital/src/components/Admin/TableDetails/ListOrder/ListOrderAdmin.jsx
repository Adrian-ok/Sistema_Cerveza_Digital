import React from 'react'
import { map } from 'lodash'
import { OrderItemAdmin } from '../'

export function ListOrderAdmin(props) {

    const { orders, onRefresh } = props

    return (
        <div className='flex flex-col items-center' >
            {map(orders, (order) => (
                <OrderItemAdmin key={order.id} order={order} onRefresh={onRefresh} />
            ))}
        </div>
    )
}
