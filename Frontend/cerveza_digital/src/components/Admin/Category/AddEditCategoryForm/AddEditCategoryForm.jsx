import * as Yup from 'yup'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { FaTag } from 'react-icons/fa'
import { useDropzone } from 'react-dropzone'
import { useCategory } from '../../../../hooks'
import React, { useCallback, useState } from 'react'
import { Button, Label, TextInput } from 'flowbite-react'


export function AddEditCategory(props) {

    const { onClose, onRefresh, category } = props
    const { addCategory, updateCategory } = useCategory()
    const [previewImg, setPreviewImg] = useState(category?.image || null)


    //Funcion para cargar la imagen local
    const onDrop = useCallback(async (acceptedFile) => {
        const file = acceptedFile[0]
        await formik.setFieldValue('image', file)
        setPreviewImg(URL.createObjectURL(file)) //Convierte el obj en una url para poder mostrar la img
    }, [])

    //Objeto de configuracion para dropzone
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png']
        },
        noKeyboard: true,
        multiple: false,
        onDrop
    })

    const formik = useFormik({
        initialValues: initialValues(category),
        validateOnChange: false,
        validationSchema: Yup.object(category ? updateSchema() : newSchema()),
        onSubmit: async (value) => {
            try {
                if (category) {
                    await updateCategory(category.id, value)
                    toast.success('Actualizado!')
                }
                else {
                    await addCategory(value)
                    toast.success('Añadido!')
                }

                onRefresh()
                onClose()
            } catch (error) {
                console.error(error)
            }
        }
    })

    return (
        <form className='space-y-4' onSubmit={formik.handleSubmit} >
            <div>
                <div className='mb-1'>
                    <Label htmlFor='title' value='Categoria' />
                </div>
                <TextInput
                    sizing='sm'
                    id='title'
                    type='text'
                    icon={FaTag}
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    helperText={<span className='text-red-600'>{formik.errors.title}</span>}
                />
            </div>

            <Button size='xs' className='w-full mt-5' color={formik.errors.image ? 'failure' : 'success'} {...getRootProps()}>
                {previewImg ? 'Cambiar Imagen' : 'Subir Imagen'}
            </Button>

            <input {...getInputProps()} />

            <img src={previewImg} className='w-24' />

            <Button size='xs' className='w-full mt-5' type='submit'>{category ? 'Actualizar' : 'Crear'}</Button>
        </form>
    )
}

function initialValues(data) {
    return {
        title: data?.title || '',
        image: ''
    }
}

function newSchema() {
    return {
        title: Yup.string().required('Complete este campo'),
        image: Yup.string().required(true)
    }
}

function updateSchema() {
    return {
        title: Yup.string().required('Complete este campo'),
        image: Yup.string()
    }
}