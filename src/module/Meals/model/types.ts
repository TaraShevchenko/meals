import type { MealComponent, Prisma, Meal as PrismaMeal } from '@prisma/client'

export type MealWithComponents = PrismaMeal & {
    components?: MealComponent[]
}

export type Meal = PrismaMeal & {
    components?: string[]
}

export type CreateMealData = Prisma.MealCreateInput
export type UpdateMealData = Prisma.MealUpdateInput
