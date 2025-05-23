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
} from 'shared/types/dataProvider.types'
import type { CreateIngredientData, Ingredient, UpdateIngredientData } from 'shared/types/prisma.types'

export const ingredientsDataProvider = {
    getList: async (params: GetListParams): Promise<GetListResult<Ingredient>> => {
        const { page = 1, perPage = 10 } = params.pagination || {}
        const offset = (page - 1) * perPage
        const { field = 'createdAt', order = 'DESC' } = params.sort || {}
        const filter = params.filter || {}

        const whereClause: Record<string, unknown> = { ...filter }
        if (filter.q) {
            whereClause.name = { contains: filter.q, mode: 'insensitive' }
            delete whereClause.q
        }

        const orderBy = { [field]: order.toLowerCase() as 'asc' | 'desc' }

        const data = await prisma.ingredient.findMany({
            skip: offset,
            take: perPage,
            orderBy,
            where: whereClause,
        })

        const total = await prisma.ingredient.count({ where: whereClause })

        return {
            data,
            total,
        }
    },

    getOne: async (params: GetOneParams): Promise<DataProviderResult<Ingredient | null>> => {
        const { id } = params
        const data = await prisma.ingredient.findUnique({
            where: { id: String(id) },
        })

        return { data }
    },

    getMany: async (params: GetManyParams): Promise<DataProviderResult<Ingredient[]>> => {
        const { ids } = params
        const data = await prisma.ingredient.findMany({
            where: { id: { in: ids.map(String) } },
        })

        return { data }
    },

    create: async (params: CreateParams<CreateIngredientData>): Promise<DataProviderResult<Ingredient>> => {
        const { data } = params
        const result = await prisma.ingredient.create({
            data: {
                name: data.name,
                calories: parseFloat(String(data.calories)),
                protein: data.protein ? parseFloat(String(data.protein)) : null,
                carbs: data.carbs ? parseFloat(String(data.carbs)) : null,
                fat: data.fat ? parseFloat(String(data.fat)) : null,
                silpoLink: data.silpoLink || null,
                atbLink: data.atbLink || null,
            },
        })

        return { data: result }
    },

    update: async (params: UpdateParams<UpdateIngredientData>): Promise<DataProviderResult<Ingredient>> => {
        const { id, data } = params
        const result = await prisma.ingredient.update({
            where: { id: String(id) },
            data: {
                name: data.name,
                calories: data.calories !== undefined ? parseFloat(String(data.calories)) : undefined,
                protein: data.protein !== undefined ? parseFloat(String(data.protein)) : undefined,
                carbs: data.carbs !== undefined ? parseFloat(String(data.carbs)) : undefined,
                fat: data.fat !== undefined ? parseFloat(String(data.fat)) : undefined,
                silpoLink: data.silpoLink !== undefined ? data.silpoLink : undefined,
                atbLink: data.atbLink !== undefined ? data.atbLink : undefined,
            },
        })

        return { data: result }
    },

    delete: async (params: DeleteParams): Promise<DataProviderResult<Ingredient>> => {
        const { id } = params
        const result = await prisma.ingredient.delete({
            where: { id: String(id) },
        })

        return { data: result }
    },

    deleteMany: async (params: DeleteManyParams): Promise<DataProviderResult<string[]>> => {
        const { ids } = params
        await prisma.ingredient.deleteMany({
            where: { id: { in: ids.map(String) } },
        })

        return { data: ids }
    },

    updateMany: async (params: UpdateManyParams<UpdateIngredientData>): Promise<DataProviderResult<string[]>> => {
        const { ids, data } = params
        await prisma.ingredient.updateMany({
            where: { id: { in: ids.map(String) } },
            data: {
                name: data.name,
                calories: data.calories !== undefined ? parseFloat(String(data.calories)) : undefined,
                protein: data.protein !== undefined ? parseFloat(String(data.protein)) : undefined,
                carbs: data.carbs !== undefined ? parseFloat(String(data.carbs)) : undefined,
                fat: data.fat !== undefined ? parseFloat(String(data.fat)) : undefined,
                silpoLink: data.silpoLink !== undefined ? data.silpoLink : undefined,
                atbLink: data.atbLink !== undefined ? data.atbLink : undefined,
            },
        })

        return { data: ids }
    },
}
