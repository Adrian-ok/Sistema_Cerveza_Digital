import React from 'react'
import { map } from 'lodash'
import { useNavigate, useLocation } from 'react-router-dom'

export function ListCategories(props) {

    const { categories } = props
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <div className='flex flex-col gap-4' >
            {map(categories, (category) => (
                <button
                    onClick={() => navigate(`${location.pathname}/${category.id}`)}
                    key={category.id}
                    className='flex items-center gap-5 p-2 hover:cursor-pointer hover:opacity-5 border-2 border-black dark:border-white rounded-lg'
                >
                    <img src={category.image} className='w-10' />
                    <span className='dark:text-white text-lg font-bold' >{category.title}</span>
                </button>
            ))}
        </div>
    )
}
