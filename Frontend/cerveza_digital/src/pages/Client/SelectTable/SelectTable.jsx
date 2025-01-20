import * as Yup from 'yup'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import React, { useState } from 'react'
import { useTable } from '../../../hooks'
import { useNavigate } from 'react-router-dom'
import { Button, TextInput } from 'flowbite-react'

export function SelectTable() {
    const { isExistTable } = useTable()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: { tableNum: '' },
        validationSchema: Yup.object().shape({ tableNum: Yup.number().required('Campo requerido') }),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            const exist = await isExistTable(formValue.tableNum)
            if (exist) {
                navigate(`/client/${formValue.tableNum}`)
            } else {
                toast.error('Esta mesa no existe!')
            }
        }
    })

    return (
        <div className='flex flex-col justify-center items-center h-screen bg-gray-300 dark:bg-slate-600'>

            <img src='/logo_two.png' className='w-16' />

            <div className={`flex flex-col items-center w-4/5 md:w-2/6 my-4 p-4 gap-5 rounded-md bg-[#fafbf9] dark:bg-gray-800`} >
                <div className='flex flex-col items-center w-full dark:text-white' >
                    <h1 className='text-lg font-bold'>Cerveza Digital</h1>
                    <p className='text-xs' >Introduzca su número de mesa</p>
                </div>

                <form className='flex flex-col gap-2 w-full' onSubmit={formik.handleSubmit} >
                    <TextInput
                        id="tableNum"
                        placeholder='Ejemplo 1, 10, 12, 4'
                        type='number'
                        autoFocus
                        value={formik.values.tableNum}
                        onChange={formik.handleChange}
                        helperText={<span className='text-red-600'>{formik.errors.tableNum}</span>}
                    />

                    <Button size='xs' type='submit' >Ingresar</Button>
                </form>
            </div>
        </div>
    )
}
