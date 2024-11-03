import { BASE_URL, PAYMENT_STATUS } from '../libs/constants'

//CREAR PAGO DE UN PEDIDO/ORDEN
export async function createPaymentApi(paymentData) {
    try {
        const url = `${BASE_URL}/api/payments/`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData),
        }
        const response = await fetch(url, params)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}

//OBTENER DATOS PARA SABER SI LA MESA ESTA PAGADA
export async function getPaymentByTableApi(idTable) {
    try {
        const tableFilter = `table=${idTable}`
        const statusFilter = `statusPayment=${PAYMENT_STATUS.PENDING}`

        const url = `${BASE_URL}/api/payments/?${tableFilter}&${statusFilter}`;
        const params = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error
    }
}

//CERRAR MESA 
export async function closePaymentApi(idPayment) {
    try {
        const url = `${BASE_URL}/api/payments/${idPayment}/`;
        const params = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                statusPayment: PAYMENT_STATUS.PAID,
            }),
        };
        await fetch(url, params);
    } catch (error) {
        throw error;
    }
}

//OBTENER TODOS LOS PAGOS DE MESAS CERRADAS
export async function getPaymentsApi() {
    try {
        const paymentFilter = `statusPayment=${PAYMENT_STATUS.PAID}`
        const orderingFilter = 'ordering=created_at'

        const url = `${BASE_URL}/api/payments/?${paymentFilter}&${orderingFilter}`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}