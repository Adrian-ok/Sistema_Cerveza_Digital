// import React, { useState } from 'react'
// import { Table, Pagination } from 'flowbite-react';
// import { map } from 'lodash'

// export function TableCategory(props) {

//     const { categories, updateCategory, deleteCategory } = props
//     const [page, setPage] = useState(0)
//     const itemsPage = 4

//     const nextPage = () => {
//         if (categories.length > page + itemsPage) {
//             setPage(page + itemsPage)
//         }
//     }

//     const prevPage = () => {
//         if (page > 0) {
//             setPage(page - itemsPage)
//         }
//     }

//     return (
//         <div className='flex flex-col h-full overflow-auto'>
//             <Table>
//                 <Table.Head className='text-center'>
//                     <Table.HeadCell>Imagen</Table.HeadCell>
//                     <Table.HeadCell>Categoria</Table.HeadCell>
//                     <Table.HeadCell>Acciones</Table.HeadCell>
//                 </Table.Head>
//                 <Table.Body className='divide-y text-center'>
//                     {map(categories?.slice(page, page + itemsPage), (item, index) => (
//                         <Table.Row key={index} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
//                             <Table.Cell className='flex justify-center' >
//                                 <img src={item.image} className='w-12' />
//                             </Table.Cell>
//                             <Table.Cell >{item.title}</Table.Cell>
//                             <Actions category={item} updateCategory={updateCategory} deleteCategory={deleteCategory} />
//                         </Table.Row>
//                     ))}
//                 </Table.Body>
//             </Table>

//             <div className="flex sm:justify-center">
//                 <Pagination
//                     layout="navigation"
//                     // currentPage={currentPage}
//                     // totalPages={100}
//                     // onPageChange={onPageChange}
//                     showIcons
//                     previousLabel="Anterior"
//                     nextLabel="Siguiente"
//                 />
//             </div>
//         </div>
//     )
// }

import React, { useState } from 'react';
import { Table, Pagination } from 'flowbite-react';
import { map } from 'lodash';

export function TableCategory(props) {
    const { categories, updateCategory, deleteCategory } = props;
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('');
    const itemsPerPage = 4;

    // Filtrar categorías por nombre
    const filteredCategories = categories?.filter(category =>
        category.title.toLowerCase().includes(filter.toLowerCase())
    );

    // Total de páginas
    const totalPages = Math.ceil(filteredCategories?.length / itemsPerPage);

    // Manejar el cambio de página
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    // Calcular los índices de inicio y fin para la paginación
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return (
        <div className='flex flex-col h-full overflow-auto'>
            {/* Campo de entrada para el filtro */}
            <input
                type="text"
                placeholder="Filtrar por nombre de categoría"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="mb-4"
            />

            <Table>
                <Table.Head className='text-center'>
                    <Table.HeadCell>Imagen</Table.HeadCell>
                    <Table.HeadCell>Categoria</Table.HeadCell>
                    <Table.HeadCell>Acciones</Table.HeadCell>
                </Table.Head>
                <Table.Body className='divide-y text-center'>
                    {map(filteredCategories?.slice(startIndex, endIndex), (item, index) => (
                        <Table.Row key={index} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                            <Table.Cell className='flex justify-center'>
                                <img src={item.image} className='w-12' alt={item.title} />
                            </Table.Cell>
                            <Table.Cell>{item.title}</Table.Cell>
                            <Actions category={item} updateCategory={updateCategory} deleteCategory={deleteCategory} />
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            <div className="flex sm:justify-center">
                <Pagination
                    layout="navigation"
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    showIcons
                    previousLabel="Anterior"
                    nextLabel="Siguiente"
                />
            </div>
        </div>
    );
}



function Actions(props) {
    const { category, updateCategory, deleteCategory } = props

    return (
        <Table.Cell>
            <div className='flex justify-center gap-8'>
                <button onClick={() => updateCategory(category)}>✏️</button>
                <button onClick={() => deleteCategory(category)}>🗑️</button>
            </div>
        </Table.Cell>
    )
}
