import { size } from 'lodash'
import { useProduct } from '../../hooks'
import { getProductsCart } from '../../api/cart'
import React, { useEffect, useState } from 'react'
import { Loading } from '../../components/Loading'
import { Link, useParams } from 'react-router-dom'
import { ListProductCart } from '../../components/Client'

export function Cart() {

    const [products, setProducts] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const { tableNum } = useParams()
    const { getProductById } = useProduct()

    const onRefresh = () => setRefresh((prev) => !prev)

    useEffect(() => {
        (async () => {
            const idProductsCart = getProductsCart()

            const productArray = []
            for await (const idProduct of idProductsCart) {
                const response = await getProductById(idProduct)
                productArray.push(response)
            }

            setProducts(productArray)
        })()
    }, [refresh])

    return (
        <div className='flex flex-col w-full h-full p-3 rounded-md bg-[#f9fafb] dark:bg-gray-800'>
            {!products ? (
                <Loading />
            ) : size(products) === 0 ? (
                <div className='flex flex-col items-center mt-52'>
                    <p className='dark:text-white' >No hay productos en el carrito</p>
                    <Link to={`/client/${tableNum}/orders`} className='text-blue-600 underline decoration-1'>Ir a pedidos</Link>
                </div>
            ) : (
                <ListProductCart products={products} onRefresh={onRefresh} />
            )}
        </div>
    )
}
