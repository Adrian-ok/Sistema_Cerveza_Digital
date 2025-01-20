import { BasicLayout, ClientLayout } from '../layout'
import { Cart, CategoriesClient, OrdersHistory, ProductsClient, SelectTable } from '../pages/Client'
import { Error404 } from '../pages'

const routesClient = [
    {
        path: '/',
        layout: BasicLayout,
        component: SelectTable,
        exact: true
    },
    {
        path: '/client/:tableNum',
        layout: ClientLayout,
        component: CategoriesClient,
        exact: true
    },
    {
        path: '/client/:tableNum/cart',
        layout: ClientLayout,
        component: Cart,
        exact: true
    },
    {
        path: '/client/:tableNum/orders',
        layout: ClientLayout,
        component: OrdersHistory,
        exact: true
    },
    {
        path: '/client/:tableNum/:idCategory',
        layout: ClientLayout,
        component: ProductsClient,
        exact: true
    },
]

export default routesClient