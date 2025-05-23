import type { MealComponent, Prisma, Meal as PrismaMeal } from '@prisma/client'

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
} from 'shared/lib/react-admin/types'

type Meal = PrismaMeal & {
    components?: MealComponent[]
}
export type CreateMealData = Prisma.MealCreateInput
export type UpdateMealData = Prisma.MealUpdateInput

export const mealsDataProvider = {
    getList: async (params: GetListParams): Promise<GetListResult<Meal>> => {
        const { page = 1, perPage = 10 } = params.pagination || {}
        const offset = (page - 1) * perPage
        const { field = 'createdAt', order = 'DESC' } = params.sort || {}
        const filter = params.filter || {}

        const orderBy = { [field]: order.toLowerCase() as 'asc' | 'desc' }

        const data = await prisma.meal.findMany({
            skip: offset,
            take: perPage,
            orderBy,
            where: filter as Prisma.MealWhereInput,
            include: { components: true },
        })

        const total = await prisma.meal.count({ where: filter as Prisma.MealWhereInput })

        return {
            data,
            total,
        }
    },

    getOne: async (params: GetOneParams): Promise<DataProviderResult<Meal | null>> => {
        const { id } = params
        const data = await prisma.meal.findUnique({
            where: { id: String(id) },
            include: { components: true },
        })

        return { data }
    },

    getMany: async (params: GetManyParams): Promise<DataProviderResult<Meal[]>> => {
        const { ids } = params
        const data = await prisma.meal.findMany({
            where: { id: { in: ids.map(String) } },
            include: { components: true },
        })

        return { data }
    },

    create: async (params: CreateParams<CreateMealData>): Promise<DataProviderResult<Meal>> => {
        const { data } = params
        const result = await prisma.meal.create({
            data: {
                name: data.name,
                components: {
                    connect: Array.isArray(data.components)
                        ? data.components.map((id: string) => ({ id: String(id) }))
                        : data.components
                          ? [{ id: String(data.components) }]
                          : [],
                },
            },
            include: { components: true },
        })

        return { data: result }
    },

    update: async (params: UpdateParams<UpdateMealData>): Promise<DataProviderResult<Meal>> => {
        const { id, data } = params
        const result = await prisma.meal.update({
            where: { id: String(id) },
            data: {
                name: data.name,
                components: data.components
                    ? {
                          set: [],
                          connect: Array.isArray(data.components)
                              ? data.components.map((compId: string) => ({ id: String(compId) }))
                              : [{ id: String(data.components) }],
                      }
                    : undefined,
            },
            include: { components: true },
        })

        return { data: result }
    },

    delete: async (params: DeleteParams): Promise<DataProviderResult<Meal>> => {
        const { id } = params
        const result = await prisma.meal.delete({
            where: { id: String(id) },
        })

        return { data: result }
    },

    deleteMany: async (params: DeleteManyParams): Promise<DataProviderResult<string[]>> => {
        const { ids } = params
        await prisma.meal.deleteMany({
            where: { id: { in: ids.map(String) } },
        })

        return { data: ids }
    },

    updateMany: async (params: UpdateManyParams<UpdateMealData>): Promise<DataProviderResult<string[]>> => {
        const { ids, data } = params
        await prisma.meal.updateMany({
            where: { id: { in: ids.map(String) } },
            data: {
                name: data.name,
            },
        })

        return { data: ids }
    },

    getManyReference: async (params: GetManyReferenceParams): Promise<GetListResult<Meal>> => {
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

        if (target === 'menus') {
            const data = await prisma.meal.findMany({
                skip: offset,
                take: perPage,
                where: {
                    menus: {
                        some: { id: String(id) },
                    },
                    ...filter,
                },
                orderBy: { [field]: order.toLowerCase() as 'asc' | 'desc' },
                include: { components: true },
            })

            const total = await prisma.meal.count({
                where: {
                    menus: {
                        some: { id: String(id) },
                    },
                    ...filter,
                },
            })

            return { data, total }
        }

        throw new Error(`Unknown target: ${target} for meals`)
    },
}
