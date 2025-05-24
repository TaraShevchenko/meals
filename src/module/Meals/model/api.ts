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
} from 'shared/lib/react-admin/types'

import type { CreateMealData, Meal, MealWithComponents, UpdateMealData } from './types'
import { generateMealName } from './utils/generateMealName'

export const mealsDataProvider = {
    getList: async (params: GetListParams): Promise<GetListResult<Meal>> => {
        const { page = 1, perPage = 10 } = params.pagination || {}
        const offset = (page - 1) * perPage
        const { field = 'createdAt', order = 'DESC' } = params.sort || {}
        const filter = params.filter || {}

        const orderBy = { [field]: order.toLowerCase() as 'asc' | 'desc' }

        const data: MealWithComponents[] = await prisma.meal.findMany({
            skip: offset,
            take: perPage,
            orderBy,
            where: filter as Prisma.MealWhereInput,
            include: { components: true },
        })

        const transformedData: Meal[] = data.map((meal) => ({
            id: meal.id,
            name: meal.name,
            createdAt: meal.createdAt,
            updatedAt: meal.updatedAt,
            components: meal.components?.map((component) => component.id) || [],
        }))

        const total = await prisma.meal.count({ where: filter as Prisma.MealWhereInput })

        return {
            data: transformedData,
            total,
        }
    },

    getOne: async (params: GetOneParams): Promise<DataProviderResult<Meal | null>> => {
        const { id } = params
        const data: MealWithComponents | null = await prisma.meal.findUnique({
            where: { id: String(id) },
            include: { components: true },
        })

        if (!data) {
            return { data: null }
        }

        const transformedData: Meal = {
            id: data.id,
            name: data.name,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            components: data.components?.map((component) => component.id) || [],
        }

        return { data: transformedData }
    },

    getMany: async (params: GetManyParams): Promise<DataProviderResult<Meal[]>> => {
        const { ids } = params
        const data: MealWithComponents[] = await prisma.meal.findMany({
            where: { id: { in: ids.map(String) } },
            include: { components: true },
        })

        const transformedData: Meal[] = data.map((meal) => ({
            id: meal.id,
            name: meal.name,
            createdAt: meal.createdAt,
            updatedAt: meal.updatedAt,
            components: meal.components?.map((component) => component.id) || [],
        }))

        return { data: transformedData }
    },

    create: async (params: CreateParams<CreateMealData>): Promise<DataProviderResult<Meal>> => {
        const { data } = params

        const componentIds = Array.isArray(data.components)
            ? data.components.map((id: string) => String(id))
            : data.components
              ? [String(data.components)]
              : []

        const mealName = data.name || (await generateMealName(componentIds))

        const result: MealWithComponents = await prisma.meal.create({
            data: {
                name: mealName,
                components: {
                    connect: componentIds.map((id: string) => ({ id })),
                },
            },
            include: { components: true },
        })

        const transformedData: Meal = {
            id: result.id,
            name: result.name,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
            components: result.components?.map((component) => component.id) || [],
        }

        return { data: transformedData }
    },

    update: async (params: UpdateParams<UpdateMealData>): Promise<DataProviderResult<Meal>> => {
        const { id, data } = params

        let mealName = data.name
        if (data.components && !data.name) {
            const componentIds = Array.isArray(data.components)
                ? data.components.map((compId: string) => String(compId))
                : [String(data.components)]
            mealName = await generateMealName(componentIds)
        }

        const result: MealWithComponents = await prisma.meal.update({
            where: { id: String(id) },
            data: {
                name: mealName,
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

        const transformedData: Meal = {
            id: result.id,
            name: result.name,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
            components: result.components?.map((component) => component.id) || [],
        }

        return { data: transformedData }
    },

    delete: async (params: DeleteParams): Promise<DataProviderResult<Meal>> => {
        const { id } = params
        const result = await prisma.meal.delete({
            where: { id: String(id) },
        })

        return { data: result as Meal }
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
            const data: MealWithComponents[] = await prisma.meal.findMany({
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

            const transformedData: Meal[] = data.map((meal) => ({
                id: meal.id,
                name: meal.name,
                createdAt: meal.createdAt,
                updatedAt: meal.updatedAt,
                components: meal.components?.map((component) => component.id) || [],
            }))

            const total = await prisma.meal.count({
                where: {
                    menus: {
                        some: { id: String(id) },
                    },
                    ...filter,
                },
            })

            return { data: transformedData, total }
        }

        throw new Error(`Unknown target: ${target} for meals`)
    },
}
