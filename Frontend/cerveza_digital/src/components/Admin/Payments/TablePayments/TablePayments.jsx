import { map, values } from 'lodash'
import { format } from '@formkit/tempo'
import { useState } from 'react'
import { ModalBasic } from '../../../Common'
import { Datepicker, Table, Pagination, Button } from 'flowbite-react'
import { MdPayment, MdPayments, MdRemoveRedEye } from 'react-icons/md'
import { PaymentProductList } from '../../../Admin'
import { FcClearFilters } from 'react-icons/fc'
import Select from 'react-select'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import { PDF } from '../../DownloadPdf'

export function TablePayments(props) {

    const [show, setShow] = useState(false)
    const [title, setTitle] = useState(null)
    // const [refresh, setRefresh] = useState(false)
    const [component, setComponent] = useState(null)
    const { payments } = props

    const showOrHide = () => setShow((prev) => !prev)
    // const onRefresh = () => setRefresh((prev) => !prev)

    const showDetails = (payment) => {
        setTitle(`Detalle de mesa: ${payment.table_data.number}`)
        setComponent(<PaymentProductList payment={payment} />)
        showOrHide()
    }

    const [filtro, setFiltro] = useState({ created_at: '', table: '', paymentType: '' })
    const [pagActual, setPagActual] = useState(1)
    const itemsPorPag = 4

    const filtroPayments = payments
        ?.filter(payment => !filtro.table || payment.table.toLowerCase().includes(filtro.table.toLowerCase()))
        ?.filter(payment => !filtro.created_at || format(payment.created_at, 'YYYY-MM-DD') === filtro.created_at)
        ?.filter(payment => !filtro.paymentType || payment.paymentType.toLowerCase() === filtro.paymentType.toLocaleLowerCase())

    const indexOfLastItem = pagActual * itemsPorPag
    const indexOfFirstItem = indexOfLastItem - itemsPorPag
    const currentPayments = filtroPayments?.slice(indexOfFirstItem, indexOfLastItem)

    const onPageChange = (page) => {
        setPagActual(page)
    }

    const handleFilterChange = (filterName, value) => {
        setPagActual(1)
        setFiltro((prevFilters) => ({
            ...prevFilters,
            [filterName]: value,
        }))
    }

    return (
        <div className='flex flex-col h-full overflow-auto'>

            <div className='flex flex-col md:flex-row md:items-center gap-4 mb-4 '>
                <Select
                    className='w-full md:w-52'
                    options={[{ value: 'CASH', label: 'Efectivo' }, { value: 'CARD', label: 'Tarjeta' }]}
                    value={filtro.paymentType}
                    onChange={(val) => handleFilterChange('paymentType', val.value)}
                />

                <Datepicker
                    onSelectedDateChanged={(val) => handleFilterChange('created_at', format(val, 'YYYY-MM-DD'))}
                />

                <button onClick={() => setFiltro({ created_at: '', table: '' })} title='Limpiar filtros'>
                    <FcClearFilters size={20} />
                </button>
            </div>

            <Table className='text-center'>
                <Table.Head>
                    <Table.HeadCell>Id pago</Table.HeadCell>
                    <Table.HeadCell>Mesa</Table.HeadCell>
                    <Table.HeadCell>Total</Table.HeadCell>
                    <Table.HeadCell>Tipo de pago</Table.HeadCell>
                    <Table.HeadCell>Fecha</Table.HeadCell>
                    <Table.HeadCell>Ver detalle</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {map(currentPayments, (payment, index) => (
                        <Table.Row key={index} >
                            <Table.Cell># {payment.id}</Table.Cell>
                            <Table.Cell>{payment.table_data.number}</Table.Cell>
                            <Table.Cell>$ {payment.totalPayment}</Table.Cell>
                            <Table.Cell className='flex justify-center'>
                                {payment.paymentType === 'CASH' ? <MdPayments size={20} title='Efectivo' /> : <MdPayment size={20} title='Tarjeta' />}
                            </Table.Cell>
                            <Table.Cell>{format(payment.created_at, 'DD/MM/YYYY HH:mm')}</Table.Cell>
                            <Table.Cell className='flex justify-center gap-6'>
                                <button onClick={() => showDetails(payment)} >
                                    <MdRemoveRedEye size={20} />
                                </button>
                                <PDFDownloadLink document={<PDF data={payment} />} fileName={`Pedido(${payment.id}).pdf`} >
                                    {({ loading, url, error }) =>
                                        loading ? (
                                            <Button size={'small'}>Loading Document...</Button>
                                        ) : (
                                            <Button size={'small'} color={'red'}>PDF</Button>
                                        )
                                    }
                                </PDFDownloadLink>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            <div className="flex justify-center">
                <Pagination
                    layout="navigation"
                    currentPage={pagActual}
                    totalPages={Math.ceil(filtroPayments?.length / itemsPorPag)}
                    onPageChange={onPageChange}
                    showIcons
                    previousLabel="Anterior"
                    nextLabel="Siguiente"
                />
            </div>


            <ModalBasic title={title} children={component} show={show} showOrHide={showOrHide} />
            {/* <PDFViewer width={'100%'} height={1000} >
                <PDF />
            </PDFViewer> */}

        </div>
    )
}
