import React from 'react'
import { LoginForm } from '../../../components/Admin'

export function LoginAdmin() {
    return (
        <div className='flex flex-col justify-center items-center h-screen bg-gray-300 dark:bg-slate-600'>
            <div className={`flex flex-col items-center my-10 md:w-2/6 p-5 px-8 gap-5 rounded-md bg-[#fafbf9]`} >
                <h1>Entrada al Administrador</h1>
                <LoginForm />
            </div>
        </div>
    )
}

