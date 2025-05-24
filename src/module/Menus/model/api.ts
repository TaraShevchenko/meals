import { Prisma } from '@prisma/client'

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
            include: {
                menuMeals: {
                    include: { meal: true },
                    orderBy: { order: 'asc' },
                },
            },
        })

        const total = await prisma.menu.count({ where: filter as Prisma.MenuWhereInput })

        return {
            data,
            total,
        }
    },

    getByDate: async (date: Date | string): Promise<DataProviderResult<MenuWithBasicMeals | null>> => {
        const menuDate = new Date(date)
        const startOfDay = new Date(menuDate.getFullYear(), menuDate.getMonth(), menuDate.getDate())
        const endOfDay = new Date(menuDate.getFullYear(), menuDate.getMonth(), menuDate.getDate() + 1)

        const data = await prisma.menu.findFirst({
            where: {
                date: {
                    gte: startOfDay,
                    lt: endOfDay,
                },
            },
            include: {
                menuMeals: {
                    include: { meal: true },
                    orderBy: { order: 'asc' },
                },
            },
        })

        return { data }
    },

    getOne: async (params: GetOneParams): Promise<DataProviderResult<MenuWithBasicMeals | null>> => {
        const { id } = params
        const data = await prisma.menu.findUnique({
            where: { id: String(id) },
            include: {
                menuMeals: {
                    include: { meal: true },
                    orderBy: { order: 'asc' },
                },
            },
        })

        return { data }
    },

    getMany: async (params: GetManyParams): Promise<DataProviderResult<MenuWithBasicMeals[]>> => {
        const { ids } = params
        const data = await prisma.menu.findMany({
            where: { id: { in: ids.map(String) } },
            include: {
                menuMeals: {
                    include: { meal: true },
                    orderBy: { order: 'asc' },
                },
            },
        })

        return { data }
    },

    create: async (params: CreateParams<CreateMenuData>): Promise<DataProviderResult<MenuWithBasicMeals>> => {
        const { data } = params
        const menuDate = new Date(data.date)

        const startOfDay = new Date(menuDate.getFullYear(), menuDate.getMonth(), menuDate.getDate())
        const endOfDay = new Date(menuDate.getFullYear(), menuDate.getMonth(), menuDate.getDate() + 1)

        const existingMenu = await prisma.menu.findFirst({
            where: {
                date: {
                    gte: startOfDay,
                    lt: endOfDay,
                },
            },
        })

        if (existingMenu) {
            throw new Error(`Меню на дату ${menuDate.toLocaleDateString('ru-RU')} уже существует`)
        }

        try {
            const result = await prisma.menu.create({
                data: {
                    date: startOfDay,
                    menuMeals: data.menuMeals
                        ? {
                              create: data.menuMeals.map((menuMeal, index) => ({
                                  mealId: menuMeal.mealId,
                                  mealType: menuMeal.mealType,
                                  order: menuMeal.order ?? index,
                              })),
                          }
                        : undefined,
                },
                include: {
                    menuMeals: {
                        include: { meal: true },
                        orderBy: { order: 'asc' },
                    },
                },
            })

            return { data: result }
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new Error(`Меню на дату ${menuDate.toLocaleDateString('ru-RU')} уже существует`)
            }
            throw error
        }
    },

    update: async (params: UpdateParams<UpdateMenuData>): Promise<DataProviderResult<MenuWithBasicMeals>> => {
        const { id, data } = params

        if (data.date) {
            const menuDate = new Date(data.date as string | Date)
            const startOfDay = new Date(menuDate.getFullYear(), menuDate.getMonth(), menuDate.getDate())
            const endOfDay = new Date(menuDate.getFullYear(), menuDate.getMonth(), menuDate.getDate() + 1)

            const existingMenu = await prisma.menu.findFirst({
                where: {
                    date: {
                        gte: startOfDay,
                        lt: endOfDay,
                    },
                    NOT: {
                        id: String(id),
                    },
                },
            })

            if (existingMenu) {
                throw new Error(`Меню на дату ${menuDate.toLocaleDateString('ru-RU')} уже существует`)
            }
        }

        if (data.menuMeals) {
            await prisma.menuMeal.deleteMany({
                where: { menuId: String(id) },
            })
        }

        try {
            const result = await prisma.menu.update({
                where: { id: String(id) },
                data: {
                    date: data.date ? new Date(data.date as string | Date) : undefined,
                    menuMeals: data.menuMeals
                        ? {
                              create: data.menuMeals.map((menuMeal, index) => ({
                                  mealId: menuMeal.mealId,
                                  mealType: menuMeal.mealType,
                                  order: menuMeal.order ?? index,
                              })),
                          }
                        : undefined,
                },
                include: {
                    menuMeals: {
                        include: { meal: true },
                        orderBy: { order: 'asc' },
                    },
                },
            })

            return { data: result }
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                const menuDate = new Date(data.date as string | Date)
                throw new Error(`Меню на дату ${menuDate.toLocaleDateString('ru-RU')} уже существует`)
            }
            throw error
        }
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
