import { Spinner } from 'flowbite-react'
import React from 'react'

export function Loading() {
    return (
        <div className='text-center' >
            <Spinner color="warning" size="xl" />
        </div>
    )
}
