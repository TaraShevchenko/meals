import { NextRequest, NextResponse } from 'next/server'

import { dataProvider } from '../../dataProvider'

export async function GET(request: NextRequest, { params }: { params: Promise<{ resource: string; id: string }> }) {
    const { resource, id } = await params

    try {
        const result = await dataProvider.getOne(resource, { id })
        return NextResponse.json(result.data)
    } catch (error) {
        console.error(`Error processing GET request for ${resource}/${id}:`, error)
        return NextResponse.json({ message: `Error: ${(error as Error).message}` }, { status: 500 })
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ resource: string; id: string }> }) {
    const { resource, id } = await params

    try {
        const data = await request.json()

        const prevResult = await dataProvider.getOne(resource, { id })
        const previousData = prevResult.data

        const result = await dataProvider.update(resource, {
            id,
            data,
            previousData,
        })

        return NextResponse.json(result.data)
    } catch (error) {
        console.error(`Error processing PUT request for ${resource}/${id}:`, error)
        return NextResponse.json({ message: `Error: ${(error as Error).message}` }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ resource: string; id: string }> }) {
    const { resource, id } = await params

    try {
        const result = await dataProvider.delete(resource, { id })
        return NextResponse.json(result.data)
    } catch (error) {
        console.error(`Error processing DELETE request for ${resource}/${id}:`, error)
        return NextResponse.json({ message: `Error: ${(error as Error).message}` }, { status: 500 })
    }
}
