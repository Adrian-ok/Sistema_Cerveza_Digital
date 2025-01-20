import React from 'react'
import {
    DarkThemeToggle,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from "flowbite-react"
import { FaCartShopping, FaList } from 'react-icons/fa6'
import { LuLogOut } from "react-icons/lu"
import { Link, useParams } from 'react-router-dom'

export function TopMenuClient() {

    const { tableNum } = useParams()

    return (
        <Navbar fluid rounded>
            <NavbarBrand href="https://flowbite-react.com">
                <img src="/logo_two.png" className="mr-3 w-10 sm:h-9" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-lg font-semibold dark:text-white">Cerveza Digital</span>
            </NavbarBrand>

            <div className="flex md:order-2">
                <DarkThemeToggle />
                <NavbarToggle />
            </div>

            <NavbarCollapse>
                <NavbarLink active>
                    <Link to={`/client/${tableNum}`} >Inicio</Link>
                </NavbarLink>

                <NavbarLink>
                    <Link to={`/client/${tableNum}/cart`} className='flex items-center gap-4'>Carrito <FaCartShopping /></Link>
                </NavbarLink>

                <NavbarLink>
                    <Link to={`/client/${tableNum}/orders`} className='flex items-center gap-4'>Ver Pedidos <FaList /></Link>
                </NavbarLink>

                <NavbarLink >
                    <Link to={`/`} className='flex items-center gap-4'>Salir de Cerveza digital <LuLogOut /></Link>
                </NavbarLink>
            </NavbarCollapse>
        </Navbar>
    )
}
