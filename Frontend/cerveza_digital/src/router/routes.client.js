import { ClientLayout } from '../layout'
import { HomeClient } from '../pages/Client'
import { Error404 } from '../pages'

const routesClient = [
    {
        path: '/',
        layout: ClientLayout,
        component: HomeClient,
        exact: true
    },
]

export default routesClient