import { map } from 'lodash'
import React, { useState } from 'react'
import { Table, Pagination, TextInput } from 'flowbite-react'

export function TableCategory(props) {
    const { categories, updateCategory, deleteCategory } = props

    const [filtro, setFiltro] = useState({ categoria: '', activo: '' })
    const [pagActual, setPagActual] = useState(1)
    const itemsPorPag = 4

    // Filtros
    const filtroCategoria = categories
        ?.filter(category => !filtro.categoria || category.title.toLowerCase().includes(filtro.categoria.toLowerCase()))

    // Calcular el índice de los items a mostrar en la página actual
    const indexOfLastItem = pagActual * itemsPorPag
    const indexOfFirstItem = indexOfLastItem - itemsPorPag
    const currentCategories = filtroCategoria?.slice(indexOfFirstItem, indexOfLastItem)

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
            {/* Campo de entrada para el filtro */}
            <TextInput
                sizing='sm'
                className='mb-4 w-full md:w-52'
                placeholder='Filtrar categoria'
                value={filtro.categoria}
                onChange={(val) => handleFilterChange('categoria', val.target.value)}
            />

            <Table>
                <Table.Head className='text-center'>
                    <Table.HeadCell>Imagen</Table.HeadCell>
                    <Table.HeadCell>Categoria</Table.HeadCell>
                    <Table.HeadCell>Acciones</Table.HeadCell>
                </Table.Head>
                <Table.Body className='divide-y text-center'>
                    {currentCategories?.map((item, index) => (
                        <Table.Row key={index} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                            <Table.Cell className='flex justify-center'>
                                <img src={item.image} className='w-12' alt={item.title} />
                            </Table.Cell>
                            <Table.Cell>{item.title}</Table.Cell>
                            <Actions category={item} updateCategory={updateCategory} deleteCategory={deleteCategory} />
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            <div className="flex justify-center">
                <Pagination
                    layout="navigation"
                    currentPage={pagActual}
                    totalPages={Math.ceil(filtroCategoria?.length / itemsPorPag)}
                    onPageChange={onPageChange}
                    showIcons
                    previousLabel="Anterior"
                    nextLabel="Siguiente"
                />
            </div>
        </div>
    );
}



function Actions(props) {
    const { category, updateCategory, deleteCategory } = props

    return (
        <Table.Cell>
            <div className='flex justify-center gap-8'>
                <button onClick={() => updateCategory(category)}>✏️</button>
                <button onClick={() => deleteCategory(category)}>🗑️</button>
            </div>
        </Table.Cell>
    )
}
