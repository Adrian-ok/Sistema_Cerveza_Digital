import { Button } from 'flowbite-react'
import React from 'react'

export function HeaderPage(props) {

    const { title, btnTitle, btnClick, btnTitleTwo, btnClickTwo } = props

    return (
        <div className='flex justify-between items-center py-3' >
            <h2 className='text-xl font-mono dark:text-white' >{title}</h2>

            <div className='flex gap-10' >
                {btnTitle && (
                    <Button onClick={btnClick} size='xs' pill color='success' >{btnTitle}</Button>
                )}
                {btnTitleTwo && (
                    <Button onClick={btnClickTwo} size='xs' pill color='failure' >{btnTitleTwo}</Button>
                )}
            </div>
        </div>
    )
}
