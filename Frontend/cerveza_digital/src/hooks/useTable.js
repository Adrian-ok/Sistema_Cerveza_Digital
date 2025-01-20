import { useAuth } from '../hooks'
import React, { useState } from 'react'
import { getTablesApi, addTableApi, updateTableApi, deleteTableApi, getTableApi, getTableByNumberApi } from '../api/table'
import { size } from 'lodash'

export function useTable() {

    const [tables, setTables] = useState(null)
    const [loading, setLoading] = useState(false)
    const [table, setTable] = useState(null)
    const { auth } = useAuth()

    const getTables = async () => {
        try {
            setLoading(true)
            const result = await getTablesApi(auth.token)
            setLoading(false)
            setTables(result)
        } catch (error) {
            setLoading(false)
        }
    }

    const getTable = async (idTable) => {
        try {
            setLoading(true)
            const result = await getTableApi(idTable)
            setLoading(false)
            setTable(result)
        } catch (error) {
            setLoading(false)
        }
    }

    const addTable = async (data) => {
        try {
            setLoading(true)
            await addTableApi(data, auth.token)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    const updateTable = async (id, data) => {
        try {
            setLoading(false)
            await updateTableApi(id, data, auth.token)
            setLoading(true)
        } catch (error) {
            setLoading(false)
        }
    }

    const deleteTable = async (id) => {
        try {
            setLoading(false)
            await deleteTableApi(id, auth.token)
            setLoading(true)
        } catch (error) {
            setLoading(false)
        }
    }

    const isExistTable = async (tableNum) => {
        try {
            const response = await getTableByNumberApi(tableNum)
            if (size(response) > 0) {
                return true
            } else {
                return false
            }
        } catch (error) {
            throw error
        }
    }

    const getTableByNumber = async (tableNum) => {
        try {
            const response = await getTableByNumberApi(tableNum)
            return response
        } catch (error) {
            throw error
        }
    }

    return {
        loading,
        tables,
        table,
        getTables,
        addTable,
        updateTable,
        deleteTable,
        getTable,
        isExistTable,
        getTableByNumber
    }
}
