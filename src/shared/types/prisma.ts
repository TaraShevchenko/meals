import type {
    ComponentType,
    Prisma,
    Ingredient as PrismaIngredient,
    Meal as PrismaMeal,
    MealComponent as PrismaMealComponent,
    MealComponentIngredient as PrismaMealComponentIngredient,
    Menu as PrismaMenu,
} from '@prisma/client'

export { ComponentType }

export type Ingredient = PrismaIngredient

export type MealComponentIngredient = PrismaMealComponentIngredient & {
    ingredient?: Ingredient
}

export type MealComponent = PrismaMealComponent & {
    ingredients?: MealComponentIngredient[]
}

export type Meal = PrismaMeal & {
    components?: MealComponent[]
}

export type Menu = PrismaMenu & {
    meals?: Meal[]
}

export type CreateIngredientData = Prisma.IngredientCreateInput
export type UpdateIngredientData = Prisma.IngredientUpdateInput

export type CreateMealComponentData = Prisma.MealComponentCreateInput
export type UpdateMealComponentData = Prisma.MealComponentUpdateInput

export type CreateMealData = Prisma.MealCreateInput
export type UpdateMealData = Prisma.MealUpdateInput

export type CreateMenuData = Prisma.MenuCreateInput
export type UpdateMenuData = Prisma.MenuUpdateInput

export type MealComponentWithIngredients = Prisma.MealComponentGetPayload<{
    include: { ingredients: { include: { ingredient: true } } }
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
