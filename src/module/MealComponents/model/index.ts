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
    GetOneParams,
    UpdateManyParams,
    UpdateParams,
} from 'shared/types/dataProvider'
import type {
    CreateMealComponentData,
    MealComponent,
    MealComponentWithIngredients,
    UpdateMealComponentData,
} from 'shared/types/prisma'

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

    create: async (params: CreateParams<CreateMealComponentData>): Promise<DataProviderResult<MealComponent>> => {
        const { data } = params
        const result = await prisma.mealComponent.create({
            data: {
                name: data.name,
                type: data.type,
            },
        })

        return { data: result }
    },

    update: async (
        params: UpdateParams<UpdateMealComponentData>,
    ): Promise<DataProviderResult<MealComponentWithIngredients>> => {
        const { id, data } = params
        const result = await prisma.mealComponent.update({
            where: { id: String(id) },
            data: {
                name: data.name,
                type: data.type,
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
}
