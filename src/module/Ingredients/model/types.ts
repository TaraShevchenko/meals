import type { Prisma, Ingredient as PrismaIngredient } from '@prisma/client'

export type Ingredient = PrismaIngredient
export type CreateIngredientData = Prisma.IngredientCreateInput
export type UpdateIngredientData = Prisma.IngredientUpdateInput
