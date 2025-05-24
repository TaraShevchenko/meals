import type { ComponentType, MealType, MenuMeal, Prisma, Menu as PrismaMenu } from '@prisma/client'

export { ComponentType, MealType }

export type Menu = PrismaMenu & {
    menuMeals?: MenuMeal[]
}

export type CreateMenuData = {
    date: Date | string
    menuMeals?: Array<{
        mealId: string
        mealType: MealType
        order?: number
    }>
}

export type UpdateMenuData = {
    date?: Date | string
    menuMeals?: Array<{
        mealId: string
        mealType: MealType
        order?: number
    }>
}

export type MenuMealWithMeal = Prisma.MenuMealGetPayload<{
    include: {
        meal: {
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
        menuMeals: {
            include: {
                meal: {
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
        }
    }
}>

export type MenuWithBasicMeals = Prisma.MenuGetPayload<{
    include: {
        menuMeals: {
            include: { meal: true }
        }
    }
}>
