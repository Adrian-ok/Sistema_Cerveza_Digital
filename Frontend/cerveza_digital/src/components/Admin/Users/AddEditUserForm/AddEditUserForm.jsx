import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Button, Label, TextInput, Checkbox } from "flowbite-react"
import { HiMail, HiKey, HiUser, HiOutlineUser } from "react-icons/hi"
import { useUser } from '../../../../hooks'
import { toast } from 'react-toastify'

export function AddEditUserForm(props) {

    const { onClose, onRefresh, user } = props
    const { addUser, updateUser } = useUser()

    const formik = useFormik({
        initialValues: initialValues(user),
        validateOnChange: false,
        validationSchema: Yup.object(user ? updateSchema() : newSchema()),
        onSubmit: async (values) => {
            try {
                if (user) {
                    await updateUser(user.id, values)
                    toast.success('Actualizado!')
                } else {
                    await addUser(values)
                    toast.success('Añadido!')
                }
                onRefresh()
                onClose()

            } catch (error) {
                console.log(error)
            }
        }
    })

    return (
        <form className='p-2 flex flex-col gap-2' onSubmit={formik.handleSubmit} >
            <div>
                <div className='mb-1'>
                    <Label htmlFor="username" value="Usuario" />
                </div>
                <TextInput
                    sizing='sm'
                    id="username"
                    type="text"
                    icon={HiUser}
                    placeholder="usuario"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    helperText={<span className='text-red-600'>{formik.errors.username}</span>}
                />
            </div>

            <div>
                <div className='mb-1'>
                    <Label htmlFor="email1" value="Correo" />
                </div>
                <TextInput
                    sizing='sm'
                    id="email"
                    type="email"
                    icon={HiMail}
                    placeholder="correo@gmail.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    helperText={<span className='text-red-600'>{formik.errors.email}</span>}
                />
            </div>

            <div className='flex gap-4' >
                <div>
                    <div className='mb-1'>
                        <Label htmlFor="first_name" value="Nombre" />
                    </div>
                    <TextInput
                        sizing='sm'
                        id="first_name"
                        type="text"
                        icon={HiOutlineUser}
                        placeholder="nombre"
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                        helperText={<span className='text-red-600'>{formik.errors.first_name}</span>}
                    />
                </div>

                <div>
                    <div className='mb-1'>
                        <Label htmlFor="last_name" value="Apellido" />
                    </div>
                    <TextInput
                        sizing='sm'
                        id="last_name"
                        type="text"
                        icon={HiOutlineUser}
                        placeholder="apellido"
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
                        helperText={<span className='text-red-600'>{formik.errors.last_name}</span>}
                    />
                </div>
            </div>

            <div>
                <div className='mb-1'>
                    <Label htmlFor="password" value="Contraseña" />
                </div>
                <TextInput
                    sizing='sm'
                    id="password"
                    type="password"
                    icon={HiKey}
                    placeholder="*******"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    helperText={<span className='text-red-600'>{formik.errors.password}</span>}
                />
            </div>

            <div className="flex justify-around">
                <div className="flex items-center gap-2">
                    <Checkbox
                        checked={formik.values.is_active}
                        onChange={(event) => formik.setFieldValue('is_active', event.target.checked)}

                    />
                    <Label htmlFor="active">Activo</Label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox
                        checked={formik.values.is_staff}
                        onChange={(event) => formik.setFieldValue('is_staff', event.target.checked)}
                    />
                    <Label htmlFor="staff">Staff</Label>
                </div>
            </div>

            <Button size="xs" className='w-full mt-5' type="submit">{user ? 'Actualizar' : 'Crear'}</Button>
        </form>
    )
}

function initialValues(user) {
    return {
        username: user?.username || '',
        email: user?.email || '',
        password: '',
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        is_active: user?.is_active ? true : false,
        is_staff: user?.is_staff ? true : false
    }
}

function newSchema() {
    return {
        username: Yup.string().required('Campo requerido'),
        email: Yup.string().email(true).required('Campo requerido'),
        password: Yup.string().required('Campo requerido'),
        first_name: Yup.string(),
        last_name: Yup.string(),
        is_active: Yup.bool().required(true),
        is_staff: Yup.bool().required(true)
    }
}

function updateSchema() {
    return {
        username: Yup.string().required('Campo requerido'),
        email: Yup.string().email(true).required('Campo requerido'),
        password: Yup.string(),
        first_name: Yup.string(),
        last_name: Yup.string(),
        is_active: Yup.bool().required(true),
        is_staff: Yup.bool().required(true)
    }
}