import { FcLeft } from 'react-icons/fc'
import React, { useEffect } from 'react'
import { useProduct } from '../../hooks'
import { Loading } from '../../components/Loading'
import { useParams, Link } from 'react-router-dom'
import { ListProducts } from '../../components/Client'

export function ProductsClient() {

    const { tableNum, idCategory } = useParams()
    const { loading, products, getProductsByCategory } = useProduct()

    useEffect(() => { getProductsByCategory(idCategory) }, [idCategory])

    return (
        <div className='flex flex-col w-full h-full p-3 rounded-md bg-[#f9fafb] dark:bg-gray-800'>
            <Link to={`/client/${tableNum}`} className='flex gap-3 mb-4 dark:text-white' ><FcLeft size={28} /> Volver</Link>

            {loading ? (
                <Loading />
            ) : (
                <ListProducts products={products} />
            )}
        </div>
    )
}
