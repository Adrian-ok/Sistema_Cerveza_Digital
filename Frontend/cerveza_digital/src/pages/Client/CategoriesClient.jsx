import React, { useEffect } from 'react'
import { useCategory } from '../../hooks'
import { Loading } from '../../components/Loading'
import { ListCategories } from '../../components/Client'

export function CategoriesClient() {

    const { loading, categories, getCategories } = useCategory()

    useEffect(() => getCategories, [])

    return (
        <main className='flex flex-col w-full h-full p-3 rounded-md bg-[#f9fafb] dark:bg-gray-800'>
            {loading ? (
                <Loading />
            ) : (
                <ListCategories categories={categories} />
            )}
        </main>
    )
}
