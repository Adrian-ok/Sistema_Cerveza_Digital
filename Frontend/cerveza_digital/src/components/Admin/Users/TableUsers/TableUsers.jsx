import React from 'react'
import { Table } from "flowbite-react"
import { map } from 'lodash'

export function TableUsers(props) {

    const { users, updateUser, deleteUser } = props

    return (
        <div className='flex flex-col h-full overflow-x-auto '>
            <Table>
                <Table.Head className='text-center'>
                    <Table.HeadCell>Usuario</Table.HeadCell>
                    <Table.HeadCell>Correo</Table.HeadCell>
                    <Table.HeadCell>Nombre</Table.HeadCell>
                    <Table.HeadCell>Activo</Table.HeadCell>
                    <Table.HeadCell>Staff</Table.HeadCell>
                    <Table.HeadCell>Acciones</Table.HeadCell>
                </Table.Head>

                <Table.Body className="divide-y text-center">
                    {map(users, (user, index) => (
                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>{user.username}</Table.Cell>
                            <Table.Cell>{user.email}</Table.Cell>
                            <Table.Cell>{`${user.first_name} ${user.last_name}`}</Table.Cell>
                            <Table.Cell>{user.is_active ? '🟢' : '🔴'}</Table.Cell>
                            <Table.Cell>{user.is_staff ? '🟢' : '🔴'}</Table.Cell>
                            <Actions user={user} updateUser={updateUser} deleteUser={deleteUser} />
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
}

function Actions(props) {

    const { user, updateUser, deleteUser } = props

    return (
        <Table.Cell className='flex flex-row gap-8 justify-center' >
            <button onClick={() => updateUser(user)}>✏️</button>
            <button onClick={() => deleteUser(user)}>🗑️</button>
        </Table.Cell>
    )
}
