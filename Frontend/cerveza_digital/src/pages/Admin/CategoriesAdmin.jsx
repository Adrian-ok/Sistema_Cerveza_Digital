import React, { useEffect, useState } from 'react'
import { useCategory } from '../../hooks'
import { Loading } from '../../components/Loading'
import { ModalBasic } from '../../components/Common'
import { HeaderPage, TableCategory } from '../../components/Admin'

export function CategoriesAdmin() {

    const { getCategories, loading, categories } = useCategory()
    const [show, setShow] = useState(false)
    const [title, setTitle] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const [component, setComponent] = useState(null)

    useEffect(() => getCategories, [])
    const showOrHide = () => setShow((prev) => !prev) //Abrir o cerrar el modal
    const onRefresh = () => setRefresh((prev) => !prev)

    return (
        <main className='flex flex-col w-full px-4 pb-4 rounded-md bg-[#f9fafb] dark:bg-gray-800'>
            <HeaderPage title='Categorias' btnTitle='Añadir' btnClick={showOrHide} />

            {loading ? (
                <Loading />
            ) : (
                <TableCategory categories={categories} />
            )}

            <ModalBasic title={'Categorias'} children={<h1>Categorias</h1>} show={show} showOrHide={showOrHide} />

        </main>
    )
}
