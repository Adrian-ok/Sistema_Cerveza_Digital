import React, { useEffect, useState } from 'react'
import { HeaderPage, TableTables, AddEditTableForm } from '../../components/Admin'
import { useTable } from '../../hooks'
import { Loading } from '../../components/Loading'
import { ModalBasic } from '../../components/Common'

export function TablesAdmin() {

    const { loading, tables, getTables, deleteTable } = useTable()
    const [show, setShow] = useState(false)
    const [title, setTitle] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const [component, setComponent] = useState(null)

    useEffect(() => getTables, [refresh])
    const onRefresh = () => setRefresh((prevState) => !prevState)
    const showOrHide = () => setShow((prevState) => !prevState)

    const addTable = () => {
        setTitle('Añadir Mesa')
        setComponent(<AddEditTableForm onClose={showOrHide} onRefresh={onRefresh} />)
        showOrHide()
    }

    const updateTable = (data) => {
        setTitle('Actualizar Mesa')
        setComponent(<AddEditTableForm onClose={showOrHide} onRefresh={onRefresh} table={data} />)
        showOrHide()
    }

    const deleteTables = (data) => {
        const option = window.confirm(`¿ Realmente desea eliminar esta mesa: ${data.number}?`)
        if (option) {
            deleteTable(data.id)
            onRefresh()
        }
    }

    return (
        <main className='flex flex-col w-full px-4 pb-4 rounded-md bg-[#f9fafb] dark:bg-gray-800'>
            <HeaderPage title='Mesas' btnTitle='Añadir' btnClick={addTable} />

            {loading ? (
                <Loading />
            ) : (
                <TableTables tables={tables} updateTable={updateTable} deleteTable={deleteTables} />
            )}

            <ModalBasic show={show} showOrHide={showOrHide} title={title} children={component} />
        </main>
    )
}
