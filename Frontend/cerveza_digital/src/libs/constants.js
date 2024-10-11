import { HiHome, HiTag, HiShoppingBag, HiViewGrid } from 'react-icons/hi'
import { LuHistory } from "react-icons/lu"

export const BASE_URL = 'http://127.0.0.1:8000'

export const TOKEN = 'token'

export const MENUS = [
    { name: 'Ordenes', link: '/admin', icon: HiHome, index: 1 },
    { name: 'Mesas', link: '/admin/tables', icon: HiViewGrid, index: 2 },
    { name: 'Productos', link: '/admin/products', icon: HiShoppingBag, index: 3 },
    { name: 'Categorias', link: '/admin/categories', icon: HiTag, index: 4 },
    { name: 'Historial pagos', link: '/admin/history-payments', icon: LuHistory, index: 5 },
]