import React from 'react'
import { Table } from 'flowbite-react';
import { map } from 'lodash'

export function TableCategory(props) {

    const { categories } = props

    return (
        <div className='flex flex-col h-full overflow-x-auto '>
            <Table>
                <Table.Head className='text-center'>
                    <Table.HeadCell>Imagen</Table.HeadCell>
                    <Table.HeadCell>Categoria</Table.HeadCell>
                    <Table.HeadCell>Acciones</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y text-center">
                    {map(categories, (item, index) => (
                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className='flex justify-center' >
                                <img src={item.image} className='w-14' />
                            </Table.Cell>
                            <Table.Cell >{item.title}</Table.Cell>
                            <Actions category={item} />
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
}

function Actions(props) {
    const { category } = props

    return (
        <Table.Cell>
            <div className='flex justify-center gap-8'>
                <button onClick={() => console.log(category)}>✏️</button>
                <button onClick={() => console.log(category)}>🗑️</button>
            </div>
        </Table.Cell>
    )
}
