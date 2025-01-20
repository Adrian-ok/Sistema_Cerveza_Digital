import React, { useState } from 'react'
import { Table, Pagination } from 'flowbite-react'
import { ModalBasic } from '../../../Common'
import { map } from 'lodash'

export function TableTables(props) {

    const { tables, updateTable, deleteTable } = props

    const [pagActual, setPagActual] = useState(1)
    const itemsPorPag = 6

    // Calcular el índice de los items a mostrar en la página actual
    const indexOfLastItem = pagActual * itemsPorPag
    const indexOfFirstItem = indexOfLastItem - itemsPorPag
    const currentTables = tables?.slice(indexOfFirstItem, indexOfLastItem)

    // Cambiar la página cuando el usuario interactúa con el componente Pagination
    const onPageChange = (page) => {
        setPagActual(page)
    }

    return (
        <div className='flex flex-col h-full overflow-auto'>
            <Table>
                <Table.Head className='text-center'>
                    <Table.HeadCell>Numero de mesa</Table.HeadCell>
                    <Table.HeadCell>Acciones</Table.HeadCell>
                </Table.Head>
                <Table.Body className='divide-y text-center'>
                    {map(currentTables, (item, index) => (
                        <Table.Row key={index} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                            <Table.Cell>Mesa: {item.number}</Table.Cell>
                            <Actions table={item} updateTable={updateTable} deleteTable={deleteTable} />
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            {/* <ModalBasic show={ } showOrHide={ } /> */}

            <div className="flex justify-center">
                <Pagination
                    layout="navigation"
                    currentPage={pagActual}
                    totalPages={Math.ceil(tables?.length / itemsPorPag)}
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
    const { table, updateTable, deleteTable } = props

    return (
        <Table.Cell>
            <div className='flex justify-center gap-8'>
                <button onClick={() => console.log(table)}>qr</button>
                <button onClick={() => updateTable(table)}>✏️</button>
                <button onClick={() => deleteTable(table)}>🗑️</button>
            </div>
        </Table.Cell>
    )
}