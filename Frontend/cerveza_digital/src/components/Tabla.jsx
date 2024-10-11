import React from 'react'
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

export function Tabla(props) {

    const { data, columns } = props

    const ReactTable = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })

    return (
        <table className='border-2 border-violet-600 m-2'>
            <thead className='bg-stone-300' >
                {
                    ReactTable.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} >
                            {
                                headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))
                            }
                        </tr>
                    ))
                }

            </thead>
            <tbody className="divide-y">
                {
                    ReactTable.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {
                                row.getVisibleCells().map(cell => (
                                    <td className='items-center text-center' >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td >
                                ))
                            }
                        </tr>
                    ))
                }
                <tr>
                    <td></td>
                </tr>
            </tbody>
        </table>
    )
}
