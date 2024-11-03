import { useAuth } from '../../../hooks'
import {
    Avatar,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand,
    DarkThemeToggle,
} from "flowbite-react";

export function TopMenu(props) {

    const { logout, auth } = useAuth()
    const { menu, openMenu } = props

    const renderName = () => {
        if (auth.me?.first_name && auth.me?.last_name) {
            return `${auth.me.first_name} ${auth.me.last_name}`
        } else {
            return 'Usuario'
        }
    }

    return (
        <Navbar fluid className='bg-[#f9fafb] rounded-md'>
            <NavbarBrand onClick={() => openMenu(!menu)} className="cursor-pointer" >
                <img src="/logo_two.png" className="mr-3 w-10 sm:h-9" alt="Flowbite React Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Cerveza Digital</span>
            </NavbarBrand>
            <div className="flex md:order-2 gap-5">
                <DarkThemeToggle />
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" img="/avatar.png" rounded />
                    }
                >
                    <DropdownHeader>
                        <span className="block text-sm">{renderName()}</span>
                        <span className="block truncate text-sm font-medium">{auth.me?.email}</span>
                    </DropdownHeader>
                    <DropdownItem>-</DropdownItem>
                    <DropdownItem>-</DropdownItem>
                    <DropdownItem>-</DropdownItem>
                    <DropdownDivider />
                    <DropdownItem onClick={logout} >Cerrar sesion</DropdownItem>
                </Dropdown>
            </div>
        </Navbar>
    );
}
