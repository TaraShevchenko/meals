import { NextRequest, NextResponse } from 'next/server'

import { dataProvider } from '../data-provider'

export async function GET(request: NextRequest, { params }: { params: Promise<{ resource: string }> }) {
    const { resource } = await params
    const searchParams = request.nextUrl.searchParams

    try {
        // Получение параметров запроса
        const page = parseInt(searchParams.get('_page') || '1', 10)
        const perPage = parseInt(searchParams.get('_perPage') || '10', 10)
        const sortField = searchParams.get('_sort') || 'id'
        const sortOrder = (searchParams.get('_order') || 'ASC') as 'ASC' | 'DESC'

        // Проверяем, запрашивается ли список или множество элементов по id
        const ids = searchParams.get('ids')

        if (ids) {
            // Запрос на получение множества записей по id
            const result = await dataProvider.getMany(resource, {
                ids: ids.split(','),
            })

            return NextResponse.json(result.data)
        }

        // Создаем фильтр из остальных query параметров
        const filter: Record<string, unknown> = {}
        searchParams.forEach((value, key) => {
            if (!key.startsWith('_')) {
                filter[key] = value
            }
        })

        // Получение списка записей
        const result = await dataProvider.getList(resource, {
            pagination: { page, perPage },
            sort: { field: sortField, order: sortOrder },
            filter,
        })

        return NextResponse.json(result)
    } catch (error) {
        console.error(`Error processing GET request for ${resource}:`, error)
        return NextResponse.json({ message: `Error: ${(error as Error).message}` }, { status: 500 })
    }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ resource: string }> }) {
    const { resource } = await params

    try {
        const data = await request.json()
        const result = await dataProvider.create(resource, { data })

        return NextResponse.json(result.data, { status: 201 })
    } catch (error) {
        console.error(`Error processing POST request for ${resource}:`, error)
        return NextResponse.json({ message: `Error: ${(error as Error).message}` }, { status: 500 })
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ resource: string }> }) {
    const { resource } = await params

    try {
        const { ids, data } = await request.json()

        const result = await dataProvider.updateMany(resource, { ids, data })
        return NextResponse.json(result.data)
    } catch (error) {
        console.error(`Error processing PUT request for ${resource}:`, error)
        return NextResponse.json({ message: `Error: ${(error as Error).message}` }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ resource: string }> }) {
    const { resource } = await params

    try {
        const { ids } = await request.json()

        const result = await dataProvider.deleteMany(resource, { ids })
        return NextResponse.json(result.data)
    } catch (error) {
        console.error(`Error processing DELETE request for ${resource}:`, error)
        return NextResponse.json({ message: `Error: ${(error as Error).message}` }, { status: 500 })
    }
}
