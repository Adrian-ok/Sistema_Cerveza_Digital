import React from 'react'
import { Sidebar } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import { MENUS } from '../../../libs/constants'
import { useAuth } from '../../../hooks'
import { HiUser } from 'react-icons/hi'


export function SideMenu() {

    const { pathname } = useLocation()
    const { auth } = useAuth()


    return (
        <Sidebar aria-label="Default sidebar example">
            <Sidebar.Items>
                <Sidebar.ItemGroup>

                    {MENUS.map((menu) => (
                        <Link to={menu.link} key={menu.index} >
                            <Sidebar.Item icon={menu.icon} className={pathname === menu.link && 'text-[#4e3c36] font-bold bg-stone-200 dark:bg-slate-900'}>
                                {menu.name}
                            </Sidebar.Item>
                        </Link>
                    ))}
                    {auth.me?.is_staff && (
                        <Link to={'/admin/users'}>
                            <Sidebar.Item icon={HiUser} className={pathname === '/admin/users' && 'text-[#4e3c36] font-bold bg-stone-200 dark:bg-slate-900'} >
                                Usuarios
                            </Sidebar.Item>
                        </Link>
                    )}

                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar >
    )
}
