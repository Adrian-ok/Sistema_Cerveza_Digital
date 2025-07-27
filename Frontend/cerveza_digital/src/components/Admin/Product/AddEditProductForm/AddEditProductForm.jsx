import * as Yup from 'yup'
import { map } from 'lodash'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { useEffect, useState, useCallback } from 'react'
import { useCategory, useProduct } from '../../../../hooks'
import { FaTag, FaDollarSign, FaShoppingBag } from 'react-icons/fa'
import { Button, Label, Select, TextInput, ToggleSwitch } from 'flowbite-react'
import { useDropzone } from 'react-dropzone'

export function AddEditProductForm(props) {

    const { onClose, onRefresh, product } = props
    const { addProducts, updateProducts } = useProduct()
    const { categories, getCategories } = useCategory()
    const [previewImage, setPreviewImage] = useState(product ? product?.image : null)


    useEffect(() => getCategories, [])

    //CON DROP SE SELECCIONA LA IMAGEN
    const onDrop = useCallback(async (acceptedFile) => {
        console.log(acceptedFile)
        const file = acceptedFile[0]
        await formik.setFieldValue('image', file)
        setPreviewImage(URL.createObjectURL(file))
    }, [])

    //CONFIG DE DROP
    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
        noKeyboard: true,
        multiple: false,
        onDrop
    })

    const formik = useFormik({
        initialValues: initialValues(product),
        validateOnChange: false,
        validationSchema: Yup.object(product ? updateSchema() : newSchema()),
        onSubmit: async (value) => {
            if (product) {
                await updateProducts(product.id, value)
                toast.success('Actualizado!')
            } else {
                await addProducts(value)
                toast.success('Añadido!')
            }
            onRefresh()
            onClose()
        }
    })

    return (
        <form className='space-y-4' onSubmit={formik.handleSubmit}>
            <div>
                <div className='mb-1'>
                    <Label htmlFor='title' value='Producto' />
                </div>
                <TextInput
                    id='title'
                    name='title'
                    sizing='sm'
                    type='text'
                    icon={FaShoppingBag}
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    color={formik.errors.title && 'failure'}
                    helperText={<span className='text-red-600'>{formik.errors.title}</span>}
                />
            </div>
            <div>
                <div className='mb-1'>
                    <Label htmlFor='description' value='Descripcion' />
                </div>
                <TextInput
                    id='description'
                    name='description'
                    sizing='lg'
                    type='text'
                    icon={FaShoppingBag}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    color={formik.errors.description && 'failure'}
                    helperText={<span className='text-red-600'>{formik.errors.description}</span>}
                />
            </div>
            <div>
                <div className='mb-1'>
                    <Label htmlFor='price' value='Precio' />
                </div>
                <TextInput
                    id='price'
                    name='price'
                    sizing='sm'
                    type='number'
                    icon={FaDollarSign}
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    color={formik.errors.price && 'failure'}
                    helperText={<span className='text-red-600'>{formik.errors.price}</span>}
                />
            </div>
            <div>
                <div className='mb-1'>
                    <Label htmlFor='category' value='Categoria' />
                </div>
                <Select
                    id='category'
                    name='category'
                    icon={FaTag}
                    sizing='sm'
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    color={formik.errors.category && 'failure'}
                >
                    <option>Seccione una categoria</option>
                    {map(categories, (item) => (
                        <option key={item.id} value={item.id} >{item.title}</option>
                    ))}
                </Select>

            </div>

            <ToggleSwitch
                checked={formik.values.active}
                onChange={(data) => formik.setFieldValue('active', data)}
                label='Activo'
                id='active'
                name='active'
            />

            <Button size='xs' className='w-full' color={formik.errors.image ? 'failure' : 'success'} {...getRootProps()}>
                {previewImage ? 'Cambiar Imagen' : 'Subir Imagen'}
            </Button>
            <input {...getInputProps()} />

            <img src={previewImage} className='w-24' />

            <Button size='xs' className='w-full' type='submit'>{product ? 'Actualizar' : 'Guardar'}</Button>
        </form>
    )
}

function initialValues(data) {
    return {
        title: data?.title || '',
        description: data?.description || '',
        price: data?.price || '',
        category: data?.category || '',
        active: data?.active ? true : false,
        image: ''
    }
}

function newSchema() {
    return {
        title: Yup.string().required(true),
        description: Yup.string(),
        price: Yup.number().required(true),
        category: Yup.number().required(true),
        active: Yup.boolean().required(true),
        image: Yup.string().required(true)
    }
}

function updateSchema() {
    return {
        title: Yup.string().required(true),
        description: Yup.string(),
        price: Yup.number().required(true),
        category: Yup.number().required(true),
        active: Yup.boolean().required(true),
        image: Yup.string()
    }
}
