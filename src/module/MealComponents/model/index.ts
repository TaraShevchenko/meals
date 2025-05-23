import type { Prisma } from '@prisma/client'

import { prisma } from 'shared/lib/prisma'
import type {
    CreateParams,
    DataProviderResult,
    DeleteManyParams,
    DeleteParams,
    GetListParams,
    GetListResult,
    GetManyParams,
    GetManyReferenceParams,
    GetOneParams,
    UpdateManyParams,
    UpdateParams,
} from 'shared/types/dataProvider.types'
import type {
    CreateMealComponentFormData,
    MealComponent,
    MealComponentWithIngredients,
    UpdateMealComponentData,
    UpdateMealComponentFormData,
} from 'shared/types/prisma.types'

export const mealComponentsDataProvider = {
    getList: async (params: GetListParams): Promise<GetListResult<MealComponentWithIngredients>> => {
        const { page = 1, perPage = 10 } = params.pagination || {}
        const offset = (page - 1) * perPage
        const { field = 'createdAt', order = 'DESC' } = params.sort || {}
        const filter = params.filter || {}

        const orderBy = { [field]: order.toLowerCase() as 'asc' | 'desc' }

        const data = await prisma.mealComponent.findMany({
            skip: offset,
            take: perPage,
            orderBy,
            where: filter as Prisma.MealComponentWhereInput,
            include: { ingredients: { include: { ingredient: true } } },
        })

        const total = await prisma.mealComponent.count({ where: filter as Prisma.MealComponentWhereInput })

        return {
            data,
            total,
        }
    },

    getOne: async (params: GetOneParams): Promise<DataProviderResult<MealComponentWithIngredients | null>> => {
        const { id } = params
        const data = await prisma.mealComponent.findUnique({
            where: { id: String(id) },
            include: { ingredients: { include: { ingredient: true } } },
        })

        return { data }
    },

    getMany: async (params: GetManyParams): Promise<DataProviderResult<MealComponentWithIngredients[]>> => {
        const { ids } = params
        const data = await prisma.mealComponent.findMany({
            where: { id: { in: ids.map(String) } },
            include: { ingredients: { include: { ingredient: true } } },
        })

        return { data }
    },

    create: async (
        params: CreateParams<CreateMealComponentFormData>,
    ): Promise<DataProviderResult<MealComponentWithIngredients>> => {
        const { data } = params
        const result = await prisma.mealComponent.create({
            data: {
                name: data.name,
                type: data.type,
                ingredients: data.ingredients
                    ? {
                          create: data.ingredients.map((ingredient) => ({
                              quantity: ingredient.quantity,
                              ingredientId: ingredient.ingredientId,
                          })),
                      }
                    : undefined,
            },
            include: { ingredients: { include: { ingredient: true } } },
        })

        return { data: result }
    },

    update: async (
        params: UpdateParams<UpdateMealComponentFormData>,
    ): Promise<DataProviderResult<MealComponentWithIngredients>> => {
        const { id, data } = params

        await prisma.mealComponentIngredient.deleteMany({
            where: { componentId: String(id) },
        })

        const result = await prisma.mealComponent.update({
            where: { id: String(id) },
            data: {
                name: data.name,
                type: data.type,
                ingredients: data.ingredients
                    ? {
                          create: data.ingredients.map((ingredient) => ({
                              quantity: ingredient.quantity,
                              ingredientId: ingredient.ingredientId,
                          })),
                      }
                    : undefined,
            },
            include: { ingredients: { include: { ingredient: true } } },
        })

        return { data: result }
    },

    delete: async (params: DeleteParams): Promise<DataProviderResult<MealComponent>> => {
        const { id } = params
        await prisma.mealComponentIngredient.deleteMany({
            where: { componentId: String(id) },
        })
        const result = await prisma.mealComponent.delete({
            where: { id: String(id) },
        })

        return { data: result }
    },

    deleteMany: async (params: DeleteManyParams): Promise<DataProviderResult<string[]>> => {
        const { ids } = params
        await prisma.mealComponentIngredient.deleteMany({
            where: { componentId: { in: ids.map(String) } },
        })
        await prisma.mealComponent.deleteMany({
            where: { id: { in: ids.map(String) } },
        })

        return { data: ids }
    },

    updateMany: async (params: UpdateManyParams<UpdateMealComponentData>): Promise<DataProviderResult<string[]>> => {
        const { ids, data } = params
        await prisma.mealComponent.updateMany({
            where: { id: { in: ids.map(String) } },
            data: {
                name: data.name,
                type: data.type,
            },
        })

        return { data: ids }
    },

    getManyReference: async (params: GetManyReferenceParams): Promise<GetListResult<MealComponentWithIngredients>> => {
        const {
            target,
            id,
            pagination = { page: 1, perPage: 10 },
            sort = { field: 'createdAt', order: 'DESC' },
            filter = {},
        } = params
        const { page = 1, perPage = 10 } = pagination
        const { field = 'createdAt', order = 'DESC' } = sort
        const offset = (page - 1) * perPage

        if (target === 'meals') {
            const data = await prisma.mealComponent.findMany({
                skip: offset,
                take: perPage,
                where: {
                    meals: {
                        some: { id: String(id) },
                    },
                    ...filter,
                },
                orderBy: { [field]: order.toLowerCase() as 'asc' | 'desc' },
                include: { ingredients: { include: { ingredient: true } } },
            })

            const total = await prisma.mealComponent.count({
                where: {
                    meals: {
                        some: { id: String(id) },
                    },
                    ...filter,
                },
            })

            return { data, total }
        }

        throw new Error(`Unknown target: ${target} for mealComponents`)
    },
}
