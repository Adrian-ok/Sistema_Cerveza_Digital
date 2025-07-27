import { useEffect, useState } from 'react'
import { useCategory } from '../../hooks'
import { Loading } from '../../components/Loading'
import { ModalBasic, showConfirmToast } from '../../components/Common'
import { HeaderPage, TableCategory, AddEditCategory } from '../../components/Admin'
import { toast } from 'react-toastify'

export function CategoriesAdmin() {

    const { getCategories, loading, categories, deleteCategory } = useCategory()
    const [show, setShow] = useState(false)
    const [title, setTitle] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const [component, setComponent] = useState(null)

    useEffect(() => {
        getCategories()
    }, [refresh])
    const showOrHide = () => setShow((prev) => !prev) //Abrir o cerrar el modal
    const onRefresh = () => setRefresh((prev) => !prev)

    const addCategory = () => {
        setTitle('Añadir Categoria')
        setComponent(<AddEditCategory onClose={showOrHide} onRefresh={onRefresh} />)
        showOrHide()
    }

    const updateCategory = (data) => {
        setTitle('Actualizar Categoria')
        setComponent(<AddEditCategory onClose={showOrHide} onRefresh={onRefresh} category={data} />)
        showOrHide()
    }

    const deleteCategoryFunction = (data) => {
        showConfirmToast({
            message: `¿Realmente desea eliminar la categoría: ${data.title}?`,
            onConfirm: async () => {
                await deleteCategory(data.id)
                onRefresh()
                toast.success('¡Eliminado!')
            }
        })
    }

    return (
        <main className='flex flex-col w-full px-4 pb-4 rounded-md bg-[#f9fafb] dark:bg-gray-800'>
            <HeaderPage title='Categorias' btnTitle='Añadir' btnClick={addCategory} />
            {loading ? (
                <Loading />
            ) : (
                <TableCategory categories={categories} updateCategory={updateCategory} deleteCategory={deleteCategoryFunction} />
            )}

            <ModalBasic title={title} children={component} show={show} showOrHide={showOrHide} />
        </main>
    )
}

// const result = window.confirm(`¿ Realmente desea eliminar esta categoria: ${data.title}?`)
// if (result) {
//     deleteCategory(data.id)
//     toast.success('!Eliminado!')
//     onRefresh()
// }