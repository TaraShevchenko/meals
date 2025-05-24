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
        const reportId = searchParams.get('reportId')

        const skip = (page - 1) * perPage
        const orderBy = { [sort]: order.toLowerCase() }

        const where = reportId ? { reportId } : {}

        const [data, total] = await Promise.all([
            prisma.orderReportItem.findMany({
                where,
                skip,
                take: perPage,
                orderBy,
                include: {
                    ingredient: true,
                    report: true,
                },
            }),
            prisma.orderReportItem.count({ where }),
        ])

        return NextResponse.json({ data, total })
    } catch (error) {
        console.error('Error fetching order report items:', error)
        return NextResponse.json({ error: 'Failed to fetch order report items' }, { status: 500 })
    }
}
