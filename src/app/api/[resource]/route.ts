import { NextRequest, NextResponse } from 'next/server'

import { dataProvider } from '../dataProvider'

export async function GET(request: NextRequest, { params }: { params: Promise<{ resource: string }> }) {
    const { resource } = await params
    const searchParams = request.nextUrl.searchParams

    try {
        const page = parseInt(searchParams.get('_page') || '1', 10)
        const perPage = parseInt(searchParams.get('_perPage') || '10', 10)
        const sortField = searchParams.get('_sort') || 'id'
        const sortOrder = (searchParams.get('_order') || 'ASC') as 'ASC' | 'DESC'

        const ids = searchParams.get('ids')

        if (ids) {
            const result = await dataProvider.getMany(resource, {
                ids: ids.split(','),
            })

            return NextResponse.json(result.data)
        }

        const filter: Record<string, unknown> = {}
        searchParams.forEach((value, key) => {
            if (!key.startsWith('_')) {
                filter[key] = value
            }
        })

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
