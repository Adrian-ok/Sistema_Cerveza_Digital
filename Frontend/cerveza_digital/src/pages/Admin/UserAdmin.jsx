import { useEffect, useState } from 'react'
import { useUser } from '../../hooks'
import { HeaderPage, TableUsers, AddEditUserForm } from '../../components/Admin'
import { Loading } from '../../components/Loading'
import { ModalBasic, showConfirmToast } from '../../components/Common'
import { toast } from 'react-toastify'

export function UserAdmin() {

    const { loading, users, getUsers, deleteUser } = useUser()
    const [show, setShow] = useState(false)
    const [title, setTitle] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const [component, setComponent] = useState(null)

    useEffect(() => {
        getUsers()
    }, [refresh])

    const showOrHide = () => setShow((prev) => !prev) //Abrir o cerrar el modal
    const onRefresh = () => setRefresh((prev) => !prev)

    const addUser = () => {
        setTitle('Añadir Usuario')
        setComponent(<AddEditUserForm onClose={showOrHide} onRefresh={onRefresh} />)
        showOrHide()
    }

    const updateUser = (data) => {
        setTitle('Editar Usuario')
        setComponent(<AddEditUserForm user={data} onClose={showOrHide} onRefresh={onRefresh} />)
        showOrHide()
    }

    const deleteUsuario = async (data) => {
        // const result = window.confirm(`¿ Realmente desea eliminar este usuario: ${data.username} ?`)
        // if (result) {
        //     try {
        //         await deleteUser(data.id)
        //     } catch (error) {
        //         console.log(error)
        //     }
        //     onRefresh()
        // }
        showConfirmToast({
            message: `¿Realmente desea eliminar este usuario: ${data.username}?`,
            onConfirm: async () => {
                await deleteUser(data.id)
                onRefresh()
                toast.success('¡Eliminado!')
            }
        })
    }

    return (
        <main className='flex flex-col w-full px-4 pb-4 rounded-md bg-[#f9fafb] dark:bg-gray-800'>
            <HeaderPage title='Usuarios' btnTitle='Añadir' btnClick={addUser} />
            {loading ? (
                <Loading />
            ) : (
                <TableUsers users={users} updateUser={updateUser} deleteUser={deleteUsuario} />
            )}

            <ModalBasic title={title} children={component} show={show} showOrHide={showOrHide} />
        </main>
    )
}
