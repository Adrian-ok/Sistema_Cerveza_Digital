import React, { useState, useEffect } from 'react'
import { Table } from '../'
import { map } from 'lodash'
import { HeaderPage } from '../../HeaderPage'
import { IoReloadCircleSharp } from 'react-icons/io5'
import { Button, ToggleSwitch } from 'flowbite-react'

export function TablesList(props) {

    const { tables } = props
    const [refresh, setRefresh] = useState(false)
    const [autoRefresh, setAutoRefresh] = useState(false)

    const onRefresh = () => setRefresh((prev) => !prev)

    useEffect(() => {
        if (autoRefresh) {
            const autoRefreshAction = () => {
                onRefresh()
                setTimeout(() => {
                    autoRefreshAction()
                }, 5000)
            }
            autoRefreshAction()
        }
    }, [autoRefresh])

    const onCheckAutoRefresh = (check) => {
        console.log(check)
        if (check) {
            setAutoRefresh(check)
        } else {
            window.location.reload()
        }
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 h-full justify-center items-center overflow-x-auto'>

            <div className="fixed top-[90px] right-4 flex items-center gap-5">
                <ToggleSwitch label="Automatico" sizing="sm" checked={autoRefresh} onChange={(data) => onCheckAutoRefresh(data)} />
                <button size="xs" onClick={onRefresh}>
                    <IoReloadCircleSharp size={25} color="white" />
                </button>
            </div>

            {map(tables, (table) => (
                <Table key={table.number} table={table} refresh={refresh} />
            ))}
        </div>
    )
}
