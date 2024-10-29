import { AdminLayout } from '../layout'
import { LoginAdmin, OrdersAdmin, UserAdmin, CategoriesAdmin, ProductsAdmin, TablesAdmin, TableDetailsAdmin } from '../pages/Admin'

const routesAdmin = [
    {
        path: '/admin',
        layout: AdminLayout,
        component: OrdersAdmin,
        exact: true
    },
    {
        path: '/admin/users',
        layout: AdminLayout,
        component: UserAdmin,
        exact: true
    },
    {
        path: '/admin/categories',
        layout: AdminLayout,
        component: CategoriesAdmin,
        exact: true
    },
    {
        path: '/admin/products',
        layout: AdminLayout,
        component: ProductsAdmin,
        exact: true
    },
    {
        path: '/admin/tables',
        layout: AdminLayout,
        component: TablesAdmin,
        exact: true
    },
    {
        path: '/admin/table/:id',
        layout: AdminLayout,
        component: TableDetailsAdmin,
        exact: true
    },
]

export default routesAdmin