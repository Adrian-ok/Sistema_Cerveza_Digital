import React from 'react'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { HiMail, HiKey } from "react-icons/hi";
import { loginApi } from '../../../api/user'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../../../hooks'

export function LoginForm() {

    const { login } = useAuth()

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema,
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const response = await loginApi(formValue)
                const { access } = response
                login(access)
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    })

    return (
        <form className="flex flex-col w-full gap-3" onSubmit={formik.handleSubmit} >
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email1" value="Correo" />
                </div>
                <TextInput
                    id="email"
                    type="email"
                    icon={HiMail}
                    placeholder="correo@gmail.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    helperText={<span className='text-red-600'>{formik.errors.email}</span>}
                />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password1" value="Contraseña" />
                </div>
                <TextInput
                    id="password"
                    type="password"
                    icon={HiKey}
                    placeholder='*******'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    helperText={<span className='text-red-600'>{formik.errors.password}</span>}
                />
            </div>

            <Button size='sm' type="submit">Ingresar</Button>
        </form>
    )
}

function initialValues() {
    return {
        email: '',
        password: ''
    }
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email(true).required('Campo requerido'),
    password: Yup.string().required('Campo requerido').min(5, 'Minimo 5 caracteres'),
})
