import React from 'react'

export function BasicLayout(props) {

    const { children } = props

    return (
        <div className='h-screen flex flex-col p-2 gap-2 bg-stone-300 dark:bg-slate-700'>
            {children}
        </div>
    )
}
