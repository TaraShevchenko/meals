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
} from 'shared/lib/react-admin/types'

import type { CreateMenuData, Menu, MenuWithBasicMeals, UpdateMenuData } from './types'

export const menusDataProvider = {
    getList: async (params: GetListParams): Promise<GetListResult<MenuWithBasicMeals>> => {
        const { page = 1, perPage = 10 } = params.pagination || {}
        const offset = (page - 1) * perPage
        const { field = 'createdAt', order = 'DESC' } = params.sort || {}
        const filter = params.filter || {}

        const orderBy = { [field]: order.toLowerCase() as 'asc' | 'desc' }

        const data = await prisma.menu.findMany({
            skip: offset,
            take: perPage,
            orderBy,
            where: filter as Prisma.MenuWhereInput,
            include: { meals: true },
        })

        const total = await prisma.menu.count({ where: filter as Prisma.MenuWhereInput })

        return {
            data,
            total,
        }
    },

    getOne: async (params: GetOneParams): Promise<DataProviderResult<MenuWithBasicMeals | null>> => {
        const { id } = params
        const data = await prisma.menu.findUnique({
            where: { id: String(id) },
            include: { meals: true },
        })

        return { data }
    },

    getMany: async (params: GetManyParams): Promise<DataProviderResult<MenuWithBasicMeals[]>> => {
        const { ids } = params
        const data = await prisma.menu.findMany({
            where: { id: { in: ids.map(String) } },
            include: { meals: true },
        })

        return { data }
    },

    create: async (params: CreateParams<CreateMenuData>): Promise<DataProviderResult<MenuWithBasicMeals>> => {
        const { data } = params
        const result = await prisma.menu.create({
            data: {
                date: new Date(data.date),
                meals: {
                    connect: Array.isArray(data.meals)
                        ? data.meals.map((id: string) => ({ id: String(id) }))
                        : data.meals
                          ? [{ id: String(data.meals) }]
                          : [],
                },
            },
            include: { meals: true },
        })

        return { data: result }
    },

    update: async (params: UpdateParams<UpdateMenuData>): Promise<DataProviderResult<MenuWithBasicMeals>> => {
        const { id, data } = params
        const result = await prisma.menu.update({
            where: { id: String(id) },
            data: {
                date: data.date ? new Date(data.date as string | Date) : undefined,
                meals: data.meals
                    ? {
                          set: [],
                          connect: Array.isArray(data.meals)
                              ? data.meals.map((mealId: string) => ({ id: String(mealId) }))
                              : [{ id: String(data.meals) }],
                      }
                    : undefined,
            },
            include: { meals: true },
        })

        return { data: result }
    },

    delete: async (params: DeleteParams): Promise<DataProviderResult<Menu>> => {
        const { id } = params
        const result = await prisma.menu.delete({
            where: { id: String(id) },
        })

        return { data: result }
    },

    deleteMany: async (params: DeleteManyParams): Promise<DataProviderResult<string[]>> => {
        const { ids } = params
        await prisma.menu.deleteMany({
            where: { id: { in: ids.map(String) } },
        })

        return { data: ids }
    },

    updateMany: async (params: UpdateManyParams<UpdateMenuData>): Promise<DataProviderResult<string[]>> => {
        const { ids, data } = params
        await prisma.menu.updateMany({
            where: { id: { in: ids.map(String) } },
            data: {
                date: data.date ? new Date(data.date as string | Date) : undefined,
            },
        })

        return { data: ids }
    },
}
