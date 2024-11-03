import { map } from 'lodash'
import Select from 'react-select'
import React, { useState } from 'react'
import { Table, Pagination, TextInput, Button } from 'flowbite-react'
import { FcClearFilters } from 'react-icons/fc'

export function TableProduct(props) {

    const { products, categories, updateProduct, deleteProduct } = props

    const [filtro, setFiltro] = useState({ product: '', category: '' })
    const [pagActual, setPagActual] = useState(1)
    const itemsPorPag = 4

    // Filtros
    const filtroProduct = products
        ?.filter(product => !filtro.product || product.title.toLowerCase().includes(filtro.product.toLowerCase()))
        ?.filter(product => !filtro.category || product.category_data.title.toLowerCase().includes(filtro.category.toLowerCase()))

    // Calcular el índice de los items a mostrar en la página actual
    const indexOfLastItem = pagActual * itemsPorPag
    const indexOfFirstItem = indexOfLastItem - itemsPorPag
    const currentProducts = filtroProduct?.slice(indexOfFirstItem, indexOfLastItem)

    // Cambiar la página cuando el usuario interactúa con el componente Pagination
    const onPageChange = (page) => {
        setPagActual(page)
    }

    // Manejar el cambio en el filtro de búsqueda
    const handleFilterChange = (filterName, value) => {
        setPagActual(1)
        setFiltro((prevFilters) => ({
            ...prevFilters,
            [filterName]: value,
        }))
    }

    return (
        <div className='flex flex-col h-full overflow-auto'>

            <div className='flex flex-col md:flex-row md:items-center gap-4 mb-4 '>
                <Select
                    className='w-full md:w-52'
                    options={categories}
                    value={filtro.category}
                    onChange={(val) => handleFilterChange('category', val.label)}
                />

                <TextInput
                    placeholder='Filtrar producto'
                    value={filtro.product}
                    onChange={(val) => handleFilterChange('product', val.target.value)}
                />

                <button onClick={() => setFiltro({ product: '', category: '' })} title='Limpiar filtros'>
                    <FcClearFilters size={20} />
                </button>
            </div>


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
                    {map(currentProducts, (item, index) => (
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

            <div className="flex justify-center">
                <Pagination
                    layout="navigation"
                    currentPage={pagActual}
                    totalPages={Math.ceil(filtroProduct?.length / itemsPorPag)}
                    onPageChange={onPageChange}
                    showIcons
                    previousLabel="Anterior"
                    nextLabel="Siguiente"
                />
            </div>
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