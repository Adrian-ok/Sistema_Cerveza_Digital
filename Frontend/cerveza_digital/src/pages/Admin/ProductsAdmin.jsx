import React, { useEffect, useState } from 'react'
import { useCategory, useProduct } from '../../hooks'
import { Loading } from '../../components/Loading'
import { ModalBasic } from '../../components/Common'
import { HeaderPage, TableProduct, AddEditProductForm } from '../../components/Admin'
import { size } from 'lodash'

export function ProductsAdmin() {

    const { loading, products, getProducts, deleteProducts } = useProduct()
    const { categories, getCategories } = useCategory()
    const [show, setShow] = useState(false)
    const [title, setTitle] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const [component, setComponent] = useState(null)

    useEffect(() => {
        getProducts()
        getCategories()
    }, [refresh])
    const showOrHide = () => setShow((prev) => !prev)
    const onRefresh = () => setRefresh((prevState) => !prevState)

    const addProduct = () => {
        setTitle('Añadir Producto')
        setComponent(<AddEditProductForm onClose={showOrHide} onRefresh={onRefresh} />)
        showOrHide()
    }

    const updateProduct = (data) => {
        setTitle('Actualizar Producto')
        setComponent(<AddEditProductForm onClose={showOrHide} onRefresh={onRefresh} product={data} />)
        showOrHide()
    }

    const deleteProduct = (data) => {
        const option = window.confirm(`¿ Realmente desea eliminar esta producto: ${data.title}?`)
        if (option) {
            deleteProducts(data.id)
            onRefresh()
        }
    }

    return (
        <main className='flex flex-col w-full px-4 pb-4 rounded-md bg-[#f9fafb] dark:bg-gray-800'>
            <HeaderPage title={'Productos'} btnTitle={'Añadir'} btnClick={addProduct} />

            {loading ? (
                <Loading />
            ) : (
                <TableProduct products={products} categories={categorySelect(categories)} updateProduct={updateProduct} deleteProduct={deleteProduct} />
            )}

            <ModalBasic show={show} showOrHide={showOrHide} title={title} children={component} />
        </main>
    )
}

function categorySelect(categories) {
    const result = categories?.map((item) => ({
        value: item.id,
        label: item.title
    }))

    return result
}