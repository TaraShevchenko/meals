import { NextRequest, NextResponse } from 'next/server'

import { Ingredient, PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const createOrderReportSchema = z.object({
    name: z.string().min(1),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, startDate, endDate } = createOrderReportSchema.parse(body)

        const start = new Date(startDate)
        const end = new Date(endDate)

        const menus = await prisma.menu.findMany({
            where: {
                date: {
                    gte: start,
                    lte: end,
                },
            },
            include: {
                menuMeals: {
                    include: {
                        meal: {
                            include: {
                                components: {
                                    include: {
                                        ingredients: {
                                            include: {
                                                ingredient: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })

        const ingredientMap = new Map<string, { ingredient: Ingredient; quantity: number; path: string }>()

        menus.forEach((menu) => {
            menu.menuMeals.forEach((menuMeal) => {
                menuMeal.meal.components.forEach((component) => {
                    component.ingredients.forEach((mealIngredient) => {
                        const key = mealIngredient.ingredient.id
                        const path = `${component.type}/${menuMeal.mealType}`

                        if (ingredientMap.has(key)) {
                            const existing = ingredientMap.get(key)!
                            existing.quantity += mealIngredient.quantity
                        } else {
                            ingredientMap.set(key, {
                                ingredient: mealIngredient.ingredient,
                                quantity: mealIngredient.quantity,
                                path,
                            })
                        }
                    })
                })
            })
        })

        const report = await prisma.orderReport.create({
            data: {
                name,
                startDate: start,
                endDate: end,
                items: {
                    create: Array.from(ingredientMap.values()).map((item) => ({
                        ingredientId: item.ingredient.id,
                        quantity: item.quantity,
                        path: item.path,
                    })),
                },
            },
            include: {
                items: {
                    include: {
                        ingredient: true,
                    },
                },
            },
        })

        return NextResponse.json(report)
    } catch (error) {
        console.error('Error creating order report:', error)
        return NextResponse.json({ error: 'Failed to create order report' }, { status: 500 })
    }
}

export async function GET() {
    try {
        const reports = await prisma.orderReport.findMany({
            include: {
                items: {
                    include: {
                        ingredient: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        return NextResponse.json(reports)
    } catch (error) {
        console.error('Error fetching order reports:', error)
        return NextResponse.json({ error: 'Failed to fetch order reports' }, { status: 500 })
    }
}
