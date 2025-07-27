import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import { useEffect, useState } from 'react';
import { useOrders } from '../../../hooks';
import { format } from '@formkit/tempo';
import { map } from 'lodash'

const styles = StyleSheet.create({
    page: {
        padding: 10,
        fontSize: 9, // reducido
        fontFamily: 'Courier',
        width: '100%',
    },
    center: {
        textAlign: 'center',
        marginBottom: 5,
    },
    bold: {
        fontWeight: 'bold',
    },
    line: {
        borderBottom: '1 solid black',
        marginVertical: 5,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottom: '1 solid #000',
        marginTop: 4,
        marginBottom: 2,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 6, // más espacio entre columnas
        marginBottom: 1,
    },
    footer: {
        textAlign: 'center',
        marginTop: 10,
    },
});


export function PDF({ data }) {
    const [orders, setOrders] = useState([])
    const { getOrdersByPayment } = useOrders()

    useEffect(() => {
        (async () => {
            const response = await getOrdersByPayment(data.id)
            // console.log('-- 💲 Pago -- :', data)
            // console.log('-- 📝 Detalle -- :', typeof (response), response)
            setOrders(response)
        })()
    }, [])

    return (
        <Document>
            <Page size={[200, 1000]} style={styles.page}>
                <View style={styles.center}>
                    <Text style={styles.bold}>CERVEZA DIGITAL</Text>
                    <Text>Av. Direccion 999</Text>
                    <Text>Tel: 3755-481381</Text>
                    <Text>Pedido Nro: #{data.id}</Text>
                    <Text>{format(data.created_at, 'DD/MM/YYYY')}</Text>
                    <Text>Mesa: {data.table_data.number.toString().padStart(3, '0')}</Text>
                </View>

                <View style={styles.line} />

                <View style={{ flexDirection: 'row', borderBottom: '1 solid black', paddingBottom: 2, marginBottom: 2 }}>
                    <Text style={{ width: '50%', fontWeight: 'bold', fontSize: 8 }}>Descripción</Text>
                    <Text style={{ width: '50%', fontWeight: 'bold', textAlign: 'right', fontSize: 8 }}>Precio</Text>
                </View>

                {map(orders, (item, i) => (
                    <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1 }}>
                        <Text style={{ fontSize: 7 }}>{item.product_data.title}</Text>
                        <Text style={{ fontSize: 7 }}>$ {item.product_data.price}</Text>
                    </View>
                ))}

                <View style={styles.line} />
                <Text style={{ textAlign: 'right', fontWeight: 'bold' }}>
                    Total Factura: $ {data.totalPayment}
                </Text>
                <View style={styles.footer}>
                    <Text>Gracias por su visita</Text>
                    <Text>Factura simplificada</Text>
                </View>
            </Page>
        </Document>
    )
}
