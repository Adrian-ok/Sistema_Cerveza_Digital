import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { MdTableBar } from 'react-icons/md'
import { Button, Label, TextInput, } from 'flowbite-react'
import { useTable } from '../../../../hooks'

export function AddEditTableForm(props) {

    const { onClose, onRefresh, table } = props
    const { addTable, updateTable } = useTable()

    const formik = useFormik({
        initialValues: initialValues(table),
        validateOnChange: false,
        validationSchema: Yup.object(table ? updateSchema() : newSchema()),
        onSubmit: async (value) => {
            if (table) {
                await updateTable(table.id, value)
            } else {
                await addTable(value)
            }

            onRefresh()
            onClose()
        }
    })

    return (
        <form className='space-y-4' onSubmit={formik.handleSubmit}>
            <div>
                <div className='mb-1'>
                    <Label htmlFor='number' value='Numero de mesa' />
                </div>
                <TextInput
                    id='number'
                    name='number'
                    sizing='sm'
                    type='number'
                    icon={MdTableBar}
                    value={formik.values.number}
                    onChange={formik.handleChange}
                    color={formik.errors.number && 'failure'}
                />
            </div>

            <Button size='xs' className='w-full' type='submit'>{table ? 'Actualizar' : 'Guardar'}</Button>
        </form>
    )
}

function initialValues(data) {
    return {
        number: data?.number || '',
    }
}

function newSchema() {
    return {
        number: Yup.number().required(true),
    }
}

function updateSchema() {
    return {
        number: Yup.number().required(true),
    }
}