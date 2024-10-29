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

export const ORDER_STATUS = {
    PENDING: 'PENDING',
    DELIVERED: 'DELIVERED'
}

export function tiempoTranscurrido(fechaInicio, fechaFin) {
    // Asegurarse de que sean objetos Date
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    // Calcular la diferencia en milisegundos
    const diferencia = fin - inicio;

    // Convertir la diferencia en días, horas, minutos y segundos
    const segundos = Math.floor(diferencia / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    // Restar para obtener los valores restantes
    const restoHoras = horas % 24;
    const restoMinutos = minutos % 60;
    const restoSegundos = segundos % 60;

    // Retornar en formato legible
    // return `${restoHoras} hs, ${restoMinutos} min, ${restoSegundos} seg`;
    return `Solicitado hace: ${restoHoras}:${restoMinutos}:${restoSegundos}`;
}