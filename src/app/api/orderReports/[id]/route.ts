import { NextRequest, NextResponse } from 'next/server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const data = await prisma.orderReport.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        ingredient: true,
                    },
                },
            },
        })

        if (!data) {
            return NextResponse.json({ error: 'Order report not found' }, { status: 404 })
        }

        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching order report:', error)
        return NextResponse.json({ error: 'Failed to fetch order report' }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const data = await prisma.orderReport.delete({
            where: { id },
        })

        return NextResponse.json(data)
    } catch (error) {
        console.error('Error deleting order report:', error)
        return NextResponse.json({ error: 'Failed to delete order report' }, { status: 500 })
    }
}
