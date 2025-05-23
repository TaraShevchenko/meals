'use client'

import { DataProvider } from 'react-admin'

// Вспомогательная функция для fetch запросов
const fetchJson = async (url: string, options: RequestInit = {}) => {
    const response = await fetch(url, options)
    const json = await response.json()

    if (!response.ok) {
        throw new Error(json.message || 'Произошла ошибка при обращении к API')
    }

    return json
}

// Создаем базовый URL для API запросов, учитывая что window доступен только на клиенте
const getApiBaseUrl = () => {
    if (typeof window !== 'undefined') {
        return window.location.origin
    }
    return ''
}

// Этот провайдер использует fetch для обращения к нашему API
export const adminApiProvider: DataProvider = {
    getList: async (resource, params) => {
        const { page, perPage } = params.pagination || { page: 1, perPage: 10 }
        const { field, order } = params.sort || { field: 'id', order: 'ASC' }

        const url = new URL(`/api/${resource}`, getApiBaseUrl())
        url.searchParams.append('_page', page.toString())
        url.searchParams.append('_perPage', perPage.toString())
        url.searchParams.append('_sort', field)
        url.searchParams.append('_order', order)

        // Добавляем фильтры
        if (params.filter) {
            Object.entries(params.filter).forEach(([key, value]) => {
                url.searchParams.append(key, value as string)
            })
        }

        const { data, total } = await fetchJson(url.toString())
        return { data, total }
    },

    getOne: async (resource, params) => {
        const url = `${getApiBaseUrl()}/api/${resource}/${params.id}`
        const data = await fetchJson(url)
        return { data }
    },

    getMany: async (resource, params) => {
        const { ids } = params
        const url = new URL(`/api/${resource}`, getApiBaseUrl())
        url.searchParams.append('ids', ids.join(','))

        const data = await fetchJson(url.toString())
        return { data }
    },

    getManyReference: async (resource, params) => {
        const {
            target,
            id,
            pagination = { page: 1, perPage: 10 },
            sort = { field: 'id', order: 'ASC' },
            filter = {},
        } = params

        const url = new URL(`/api/${resource}`, getApiBaseUrl())
        url.searchParams.append('_page', pagination.page.toString())
        url.searchParams.append('_perPage', pagination.perPage.toString())
        url.searchParams.append('_sort', sort.field)
        url.searchParams.append('_order', sort.order)
        url.searchParams.append(target, id.toString())

        // Добавляем фильтры
        Object.entries(filter).forEach(([key, value]) => {
            url.searchParams.append(key, value as string)
        })

        const { data, total } = await fetchJson(url.toString())
        return { data, total }
    },

    create: async (resource, params) => {
        const url = `${getApiBaseUrl()}/api/${resource}`
        const data = await fetchJson(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params.data),
        })

        return { data }
    },

    update: async (resource, params) => {
        const url = `${getApiBaseUrl()}/api/${resource}/${params.id}`
        const data = await fetchJson(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params.data),
        })

        return { data }
    },

    delete: async (resource, params) => {
        const url = `${getApiBaseUrl()}/api/${resource}/${params.id}`
        const data = await fetchJson(url, { method: 'DELETE' })

        return { data }
    },

    deleteMany: async (resource, params) => {
        const { ids } = params
        const url = `${getApiBaseUrl()}/api/${resource}`

        await fetchJson(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids }),
        })

        return { data: ids }
    },

    updateMany: async (resource, params) => {
        const { ids, data: updateData } = params
        const url = `${getApiBaseUrl()}/api/${resource}`
        await fetchJson(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids, data: updateData }),
        })

        return { data: ids }
    },
}
