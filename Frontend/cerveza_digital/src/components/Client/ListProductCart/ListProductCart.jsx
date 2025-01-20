import { forEach, map } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FcCancel } from "react-icons/fc"
import { Button } from 'flowbite-react'
import { removeProductCart, cleanProductCart } from '../../../api/cart'
import { useOrders, useTable } from '../../../hooks'

export function ListProductCart(props) {

    const { products, onRefresh } = props
    const [total, setTotal] = useState(0)
    const { tableNum } = useParams()
    const navigate = useNavigate()
    const { addOrderToTable } = useOrders()
    const { getTableByNumber } = useTable()

    useEffect(() => {
        let totalTemp = 0
        forEach(products, (product) => {
            totalTemp += Number(product.price)
        })

        setTotal(totalTemp.toFixed(2))
    }, [products])

    const removeProduct = (index) => {
        removeProductCart(index)
        onRefresh()
    }

    const createOrder = async () => {
        const tableData = await getTableByNumber(tableNum)
        const idTable = tableData[0].id

        for await (const product of products) {
            await addOrderToTable(idTable, product.id)
        }

        cleanProductCart()
        navigate(`/client/${tableNum}/orders`)
    }

    return (
        <div className='flex flex-col gap-4'>
            {map(products, (product, index) => (
                <div
                    key={index}
                    className='flex items-center justify-between gap-5 p-2 hover:cursor-pointer hover:opacity-5 border-2 border-black dark:border-white rounded-lg'
                >
                    <div className='flex items-center gap-2' >
                        <img src={product.image} className='w-8' />
                        <span className='dark:text-white text-xs font-bold' >{product.title.substring(0, 15)}</span>
                    </div>
                    <span className='dark:text-white text-xs' >$ {product.price}</span>
                    <FcCancel size={25} onClick={() => removeProduct(index)} />
                </div>
            ))}

            <Button onClick={() => createOrder()} size='xs' >Realizar pedido ($ {total})</Button>
        </div>
    )
}
