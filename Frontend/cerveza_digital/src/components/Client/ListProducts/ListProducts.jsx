import React from 'react'
import { map } from 'lodash'
import { toast } from 'react-toastify'
import { FcPlus } from 'react-icons/fc'
import { addProductCart } from '../../../api/cart'

export function ListProducts(props) {

    const { products } = props

    const addCart = (product) => {
        addProductCart(product.id)
        toast.success(`${product.title} añadido al carrito`)
    }

    return (
        <div className='flex flex-col gap-4'>
            {map(products, (product) => (
                <div
                    key={product.id}
                    className='flex items-center justify-between gap-5 p-2 hover:cursor-pointer hover:opacity-5 border-2 border-black dark:border-white rounded-lg'
                >
                    <div className='flex items-center gap-2' >
                        <img src={product.image} className='w-8' />
                        <span className='dark:text-white text-xs font-bold' >{product.title.substring(0, 18)}</span>
                    </div>
                    <span className='dark:text-white text-xs' >$ {product.price}</span>
                    <FcPlus size={25} onClick={() => addCart(product)} />
                </div>
            ))}
        </div>
    )
}
