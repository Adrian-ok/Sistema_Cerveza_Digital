import { map } from 'lodash'
// import {  } from 'flowbite-react'
import { useOrders } from '../../../../hooks'
import React, { useEffect, useState } from 'react'

export function PaymentProductList(props) {

    const { payment } = props
    const [orders, setOrders] = useState([])

    const { getOrdersByPayment } = useOrders()

    useEffect(() => {
        (async () => {
            const response = await getOrdersByPayment(payment.id)
            console.log(response)
            setOrders(response)
        })()
    }, [])

    return (
        <div className='space-y-4' >
            {map(orders, (order) => (
                <div key={order.id} className='flex justify-between items-center'>
                    <div className='flex gap-5 items-center'>
                        <img src={order.product_data.image} className='w-10' />
                        <span className='dark:text-white text-xs md:text-base' >{order.product_data.title}</span>
                    </div>
                    <span className='dark:text-white text-xs md:text-base'>$ {order.product_data.price}</span>
                </div>
            ))}
        </div>
    )
}
