import React, { useEffect } from 'react'
import { useTable } from '../../hooks'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { TopMenuClient } from '../../components/Admin'

export function ClientLayout(props) {

    const { children } = props
    const { isExistTable } = useTable()
    const { tableNum } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const exist = await isExistTable(tableNum)
            if (!exist) navigate('/')
        })()
    }, [tableNum])

    return (
        <div className='h-screen flex flex-col p-2 gap-2 bg-stone-300 dark:bg-slate-700'>
            <TopMenuClient />
            {children}
        </div>
    )
}
