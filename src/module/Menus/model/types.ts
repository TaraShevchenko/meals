import type { ComponentType, Meal, Prisma, Menu as PrismaMenu } from '@prisma/client'

export { ComponentType }

export type Menu = PrismaMenu & {
    meals?: Meal[]
}

export type CreateMenuData = Prisma.MenuCreateInput
export type UpdateMenuData = Prisma.MenuUpdateInput

export type MealWithComponents = Prisma.MealGetPayload<{
    include: {
        components: {
            include: {
                ingredients: {
                    include: { ingredient: true }
                }
            }
        }
    }
}>

export type MenuWithMeals = Prisma.MenuGetPayload<{
    include: {
        meals: {
            include: {
                components: {
                    include: {
                        ingredients: {
                            include: { ingredient: true }
                        }
                    }
                }
            }
        }
    }
}>

export type MenuWithBasicMeals = Prisma.MenuGetPayload<{
    include: { meals: true }
}>
