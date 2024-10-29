import { BASE_URL, ORDER_STATUS } from '../libs/constants'

//OBTENER ORDENES POR MESA
export async function getOrdersByTableApi(idTable, status = '', ordering = '') {
    try {

        const tableFilter = `table=${idTable}`
        const statusFilter = `status=${status}`
        const closeFilter = `close=False`

        const url = `${BASE_URL}/api/orders/?${tableFilter}&${statusFilter}&${closeFilter}&${ordering}`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}

//MARCAR PEDIDO COMO ENTREGADO
export async function checkDeliveredOrderApi(id) {
    try {
        const url = `${BASE_URL}/api/orders/${id}/`
        const params = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: ORDER_STATUS.DELIVERED,
            }),
        }
        const response = await fetch(url, params)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}

//CREAR UNA NUEVA ORDEN A UNA MESA
export async function addOrderToTableApi(idTable, idProduct) {
    try {
        const url = `${BASE_URL}/api/orders/`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: ORDER_STATUS.PENDING,
                table: idTable,
                product: idProduct,
            }),
        };
        await fetch(url, params);
    } catch (error) {
        throw error
    }
}