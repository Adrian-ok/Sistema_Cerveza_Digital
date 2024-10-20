import React from 'react'
import { map } from 'lodash'
import { Table } from 'flowbite-react'

export function TableProduct(props) {

    const { products, updateProduct, deleteProduct } = props

    return (
        <div className='flex flex-col h-full overflow-auto'>
            <Table>
                <Table.Head className='text-center'>
                    <Table.HeadCell>Imagen</Table.HeadCell>
                    <Table.HeadCell>Producto</Table.HeadCell>
                    <Table.HeadCell>Precio</Table.HeadCell>
                    <Table.HeadCell>Categoria</Table.HeadCell>
                    <Table.HeadCell>Activo</Table.HeadCell>
                    <Table.HeadCell>Acciones</Table.HeadCell>
                </Table.Head>
                <Table.Body className='divide-y text-center'>
                    {map(products, (item, index) => (
                        <Table.Row key={index} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                            <Table.Cell className='flex justify-center'>
                                <img src={item.image} className='w-12' alt={item.title} />
                            </Table.Cell>
                            <Table.Cell>{item.title}</Table.Cell>
                            <Table.Cell>{parseFloat(item.price).toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 })}</Table.Cell>
                            <Table.Cell>{item.category_data.title}</Table.Cell>
                            <Table.Cell>{item.active ? '🟢' : '🔴'}</Table.Cell>
                            <Actions product={item} updateProduct={updateProduct} deleteProduct={deleteProduct} />
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
}

function Actions(props) {
    const { product, updateProduct, deleteProduct } = props

    return (
        <Table.Cell>
            <div className='flex justify-center gap-8'>
                <button onClick={() => updateProduct(product)}>✏️</button>
                <button onClick={() => deleteProduct(product)}>🗑️</button>
            </div>
        </Table.Cell>
    )
}