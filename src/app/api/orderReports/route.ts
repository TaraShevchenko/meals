import { NextRequest, NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('_page') || '1')
        const perPage = parseInt(searchParams.get('_perPage') || '10')
        const sort = searchParams.get('_sort') || 'createdAt'
        const order = searchParams.get('_order') || 'DESC'

        const skip = (page - 1) * perPage
        const orderBy = { [sort]: order.toLowerCase() }

        const [data, total] = await Promise.all([
            prisma.orderReport.findMany({
                skip,
                take: perPage,
                orderBy,
                include: {
                    items: {
                        include: {
                            ingredient: true,
                        },
                    },
                },
            }),
            prisma.orderReport.count(),
        ])

        return NextResponse.json({ data, total })
    } catch (error) {
        console.error('Error fetching order reports:', error)
        return NextResponse.json({ error: 'Failed to fetch order reports' }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json()
        const { ids } = body

        await prisma.orderReport.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting order reports:', error)
        return NextResponse.json({ error: 'Failed to delete order reports' }, { status: 500 })
    }
}
