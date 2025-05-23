import type {
    ComponentType,
    Ingredient,
    Prisma,
    MealComponent as PrismaMealComponent,
    MealComponentIngredient as PrismaMealComponentIngredient,
} from '@prisma/client'

export type MealComponentIngredient = PrismaMealComponentIngredient & {
    ingredient?: Ingredient
}

export type MealComponent = PrismaMealComponent & {
    ingredients?: MealComponentIngredient[]
}

export type MealComponentWithIngredients = Prisma.MealComponentGetPayload<{
    include: { ingredients: { include: { ingredient: true } } }
}>
export type CreateMealComponentData = Prisma.MealComponentCreateInput
export type UpdateMealComponentData = Prisma.MealComponentUpdateInput

export type MealComponentIngredientFormData = {
    ingredientId: string
    quantity: number
}
export type CreateMealComponentFormData = {
    name: string
    type: ComponentType
    ingredients?: MealComponentIngredientFormData[]
}
export type UpdateMealComponentFormData = {
    name: string
    type: ComponentType
    ingredients?: MealComponentIngredientFormData[]
}
