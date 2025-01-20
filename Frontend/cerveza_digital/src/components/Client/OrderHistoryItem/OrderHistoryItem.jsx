import React from 'react'
import { format } from '@formkit/tempo'
import { FaCheckCircle, FaClock } from 'react-icons/fa'
import { tiempoTranscurrido } from '../../../libs/constants'

export function OrderHistoryItem(props) {

    const { order } = props
    const { title, image } = order.product_data

    return (
        <div className={`
            relative flex my-4 p-4 gap-4 border-2 items-center justify-between w-full
            md:w-2/4
            border-black dark:border-white rounded-lg 
            `}>
            <img src={image} className='w-8 md:w-12' alt={title} />

            <p className='dark:text-white text-xs md:text-base' >{title}</p>

            {order.status === 'PENDING' && (
                <p className='
                absolute top-[-12px] right-[20px] px-4 text-xs border-2
                border-black bg-white dark:text-white dark:border-white dark:bg-gray-800
            '>
                    {format(order.created_at, { time: 'short' })}hs - {tiempoTranscurrido(order.created_at, new Date())}
                </p>
            )}

            {order.status === 'PENDING' ? (
                <FaClock size={20} color='orange' />
            ) : (
                <FaCheckCircle size={20} color='lightgreen' />
            )}
        </div>
    )
}
