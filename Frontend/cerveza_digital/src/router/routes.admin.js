import { AdminLayout } from '../layout'
import { LoginAdmin, HomeAdmin, UserAdmin } from '../pages/Admin'

const routesAdmin = [
    {
        path: '/admin',
        layout: AdminLayout,
        component: HomeAdmin,
        exact: true
    },
    {
        path: '/admin/users',
        layout: AdminLayout,
        component: UserAdmin,
        exact: true
    },
]

export default routesAdmin