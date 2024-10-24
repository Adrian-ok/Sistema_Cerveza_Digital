import React from 'react'
import { Table } from 'flowbite-react'
import { map } from 'lodash'

export function TableTables(props) {

    const { tables, updateTable, deleteTable } = props

    return (
        <div className='flex flex-col h-full overflow-auto'>
            <Table>
                <Table.Head className='text-center'>
                    <Table.HeadCell>Numero de mesa</Table.HeadCell>
                    <Table.HeadCell>Acciones</Table.HeadCell>
                </Table.Head>
                <Table.Body className='divide-y text-center'>
                    {map(tables, (item, index) => (
                        <Table.Row key={index} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                            <Table.Cell>Mesa: {item.number}</Table.Cell>
                            <Actions table={item} updateTable={updateTable} deleteTable={deleteTable} />
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
}

function Actions(props) {
    const { table, updateTable, deleteTable } = props

    return (
        <Table.Cell>
            <div className='flex justify-center gap-8'>
                <button onClick={() => updateTable(table)}>✏️</button>
                <button onClick={() => deleteTable(table)}>🗑️</button>
            </div>
        </Table.Cell>
    )
}