import { AdminLayout } from '../layout'
import { LoginAdmin, OrdersAdmin, UserAdmin, CategoriesAdmin, ProductsAdmin, TablesAdmin, TableDetailsAdmin, PaymentsHistory } from '../pages/Admin'

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
    {
        path: '/admin/history-payments',
        layout: AdminLayout,
        component: PaymentsHistory,
        exact: true
    },
]

export default routesAdmin