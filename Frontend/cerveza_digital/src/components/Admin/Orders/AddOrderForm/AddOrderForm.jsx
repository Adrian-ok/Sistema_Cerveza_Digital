import * as Yup from 'yup'
import { map } from 'lodash'
import Select from 'react-select'
import { useFormik } from 'formik'
import { Button } from 'flowbite-react'
import { useProduct, useOrders } from '../../../../hooks'
import React, { useEffect, useState } from 'react'

export function AddOrderForm(props) {

    const { idTable, onClose, onRefresh } = props
    const { products, getProducts, getProductById } = useProduct()
    const [productsData, setProductsData] = useState([])
    const { addOrderToTable } = useOrders()

    useEffect(() => getProducts, [])

    const formik = useFormik({
        initialValues: initialValues(),
        validateOnChange: false,
        validationSchema: Yup.object(newSchema()),
        onSubmit: async (value) => {
            for await (const idProduct of value.products) {
                await addOrderToTable(idTable, idProduct)
            }

            onRefresh()
            onClose()
        }
    })


    //CADA VEZ QUE SE SELECCIONA UN NUEVO ITEM, PASA POR EL "addProductList" QUE REALIZA UNA LLAMADA A LA API Y OBTIENE TODOS LOS DATOS DEL PRODUCTO
    useEffect(() => { addProductList() }, [formik.values])

    const addProductList = async () => {
        try {
            const productsId = formik.values.products

            const arrayTemp = []

            for await (const idProduct of productsId) {
                const response = await getProductById(idProduct)
                arrayTemp.push(response)
            }
            setProductsData(arrayTemp)
        } catch (error) {
            throw error
        }
    }

    //REMOVER UN PRODUCTO DE LA LISTA
    const removeProductList = (index) => {
        const idProducts = [...formik.values.products]

        idProducts.splice(index, 1)
        formik.setFieldValue('products', idProducts)
    }

    return (
        <form className='space-y-4 overflow-hidden' onSubmit={formik.handleSubmit} >
            <Select
                value={null}
                id='products'
                name='products'
                options={formatSelect(products)}
                onChange={(data) => formik.setFieldValue('products', [...formik.values.products, data.value,])}


                menuPortalTarget={document.body}  // Renderiza el menú fuera del modal
                styles={{
                    menuPortal: base => ({ ...base, zIndex: 9999 }) // Asegura que esté encima de todo
                }}
            />

            {map(productsData, (item, index) => (
                <div key={index} className='flex justify-between items-center'>
                    <div className='flex gap-5 items-center'>
                        <img src={item.image} className='w-10' />
                        <span className='dark:text-white' >{item.title}</span>
                    </div>
                    <button type='button' className='p-[2px] bg-red-500 rounded-xl' onClick={() => removeProductList(index)} >❌</button>
                </div>
            ))}

            <Button className='w-full' size='xs' type='submit' >Generar</Button>
        </form>
    )
}

function formatSelect(data) {
    return map(data, (item) => ({
        value: item.id,
        label: item.title
    }))
}

function initialValues() {
    return {
        products: [],
    }
}

function newSchema() {
    return {
        products: Yup.array().required(true),
    }
}
