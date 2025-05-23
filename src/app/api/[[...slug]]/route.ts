import { NextRequest, NextResponse } from 'next/server'

import { dataProvider } from '../dataProvider'

export async function GET(request: NextRequest) {
    const url = new URL(request.url)
    const path = url.pathname.replace('/api/', '')
    const parts = path.split('/')

    const resource = parts[0]
    const id = parts[1]

    try {
        if (id) {
            const response = await dataProvider.getOne(resource, { id })
            return NextResponse.json(response.data)
        } else {
            const page = Number(url.searchParams.get('_page') || '1')
            const perPage = Number(url.searchParams.get('_perPage') || '10')

            const response = await dataProvider.getList(resource, {
                pagination: { page, perPage },
                sort: { field: 'id', order: 'ASC' },
                filter: {},
            })

            return NextResponse.json(response.data, {
                headers: {
                    'X-Total-Count': String(response.total),
                    'Access-Control-Expose-Headers': 'X-Total-Count',
                },
            })
        }
    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    const url = new URL(request.url)
    const path = url.pathname.replace('/api/', '')
    const resource = path.split('/')[0]

    try {
        const body = await request.json()
        const response = await dataProvider.create(resource, { data: body })
        return NextResponse.json(response.data, { status: 201 })
    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function PUT(request: NextRequest) {
    const url = new URL(request.url)
    const path = url.pathname.replace('/api/', '')
    const parts = path.split('/')

    const resource = parts[0]
    const id = parts[1]

    if (!id) {
        return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
    }

    try {
        const body = await request.json()
        const response = await dataProvider.update(resource, { id, data: body, previousData: {} })
        return NextResponse.json(response.data)
    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    const url = new URL(request.url)
    const path = url.pathname.replace('/api/', '')
    const parts = path.split('/')

    const resource = parts[0]
    const id = parts[1]

    if (!id) {
        return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
    }

    try {
        const response = await dataProvider.delete(resource, { id })
        return NextResponse.json(response.data)
    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
