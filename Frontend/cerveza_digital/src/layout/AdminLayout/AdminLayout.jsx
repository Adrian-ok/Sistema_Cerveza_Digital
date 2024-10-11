import React, { useState } from 'react'
import { LoginAdmin } from '../../pages/Admin'
import { useAuth } from '../../hooks'
import { TopMenu, SideMenu } from '../../components/Admin'

export function AdminLayout(props) {
    const [menu, setMenu] = useState(true)
    const { children } = props
    const { auth } = useAuth()

    if (!auth) return <LoginAdmin />

    return (
        <div className="h-screen flex flex-col p-2 gap-2 bg-stone-300 dark:bg-slate-700">
            {/* El TopMenu tiene una altura fija o relativa */}
            <TopMenu menu={menu} openMenu={setMenu} />

            {/* Este div usa flex-grow para ocupar el espacio restante */}
            <div className="flex flex-grow gap-2">
                {menu && <SideMenu />}
                {children}
            </div>
        </div>
    )
}

// export function AdminLayout(props) {

//     const { children } = props
//     const { auth } = useAuth()

//     if (!auth) return <LoginAdmin />

//     return (
//         <div className='h-screen border-4 border-blue-600 bg-[#fafbf9] dark:bg-slate-700'>
//             <TopMenu />
//             <div className='flex border-2 border-red-700'>
//                 <SideMenu />
//                 {children}
//             </div>
//         </div>
//     )
// }
