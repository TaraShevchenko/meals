import { DataProvider, RaRecord } from 'react-admin'

import { prisma } from 'shared/lib/prisma'

export const dataProvider: DataProvider = {
    // @ts-expect-error - Prisma типы не соответствуют типам react-admin
    getList: async (resource, params) => {
        const { page = 1, perPage = 10 } = params.pagination || {}
        const offset = (page - 1) * perPage
        const { field, order } = params.sort || { field: 'createdAt', order: 'DESC' }
        const filter = params.filter || {}

        let data: RaRecord[] = []
        let total = 0

        switch (resource) {
            case 'menus':
                data = await prisma.menu.findMany({
                    skip: offset,
                    take: perPage,
                    orderBy: { [field]: order.toLowerCase() },
                    where: filter,
                    include: { meals: true },
                })
                total = await prisma.menu.count({ where: filter })
                break

            case 'meals':
                data = await prisma.meal.findMany({
                    skip: offset,
                    take: perPage,
                    orderBy: { [field]: order.toLowerCase() },
                    where: filter,
                    include: { components: true },
                })
                total = await prisma.meal.count({ where: filter })
                break

            case 'mealComponents':
                data = await prisma.mealComponent.findMany({
                    skip: offset,
                    take: perPage,
                    orderBy: { [field]: order.toLowerCase() },
                    where: filter,
                    include: { ingredients: { include: { ingredient: true } } },
                })
                total = await prisma.mealComponent.count({ where: filter })
                break

            case 'ingredients':
                // Проверяем, есть ли параметр q для поиска по названию ингредиента
                const whereClause: Record<string, unknown> = { ...filter }
                if (filter.q) {
                    whereClause.name = { contains: filter.q, mode: 'insensitive' }
                    delete whereClause.q // Удаляем q из параметров фильтрации, так как Prisma его не поддерживает
                }

                data = await prisma.ingredient.findMany({
                    skip: offset,
                    take: perPage,
                    orderBy: { [field]: order.toLowerCase() },
                    where: whereClause,
                })
                total = await prisma.ingredient.count({ where: whereClause })
                break

            default:
                throw new Error(`Unknown resource: ${resource}`)
        }

        return {
            data,
            total,
        }
    },

    // @ts-expect-error - Prisma типы не соответствуют типам react-admin
    getOne: async (resource, params) => {
        const { id } = params
        let data

        switch (resource) {
            case 'menus':
                data = await prisma.menu.findUnique({
                    where: { id: String(id) },
                    include: { meals: true },
                })
                break

            case 'meals':
                data = await prisma.meal.findUnique({
                    where: { id: String(id) },
                    include: { components: true },
                })
                break

            case 'mealComponents':
                data = await prisma.mealComponent.findUnique({
                    where: { id: String(id) },
                    include: { ingredients: { include: { ingredient: true } } },
                })
                break

            case 'ingredients':
                data = await prisma.ingredient.findUnique({
                    where: { id: String(id) },
                })
                break

            default:
                throw new Error(`Unknown resource: ${resource}`)
        }

        return { data }
    },

    // @ts-expect-error - Prisma типы не соответствуют типам react-admin
    getMany: async (resource, params) => {
        const { ids } = params
        let data

        switch (resource) {
            case 'menus':
                data = await prisma.menu.findMany({
                    where: { id: { in: ids.map(String) } },
                    include: { meals: true },
                })
                break

            case 'meals':
                data = await prisma.meal.findMany({
                    where: { id: { in: ids.map(String) } },
                    include: { components: true },
                })
                break

            case 'mealComponents':
                data = await prisma.mealComponent.findMany({
                    where: { id: { in: ids.map(String) } },
                    include: { ingredients: { include: { ingredient: true } } },
                })
                break

            case 'ingredients':
                data = await prisma.ingredient.findMany({
                    where: { id: { in: ids.map(String) } },
                })
                break

            default:
                throw new Error(`Unknown resource: ${resource}`)
        }

        return { data }
    },

    // @ts-expect-error - Prisma типы не соответствуют типам react-admin
    create: async (resource, params) => {
        const { data } = params
        let result

        switch (resource) {
            case 'menus':
                result = await prisma.menu.create({
                    data: {
                        date: new Date(data.date),
                        meals: {
                            connect: Array.isArray(data.meals)
                                ? data.meals.map((id) => ({ id: String(id) }))
                                : data.meals
                                  ? [{ id: String(data.meals) }]
                                  : [],
                        },
                    },
                    include: { meals: true },
                })
                break

            case 'meals':
                result = await prisma.meal.create({
                    data: {
                        name: data.name,
                        components: {
                            connect: Array.isArray(data.components)
                                ? data.components.map((id) => ({ id: String(id) }))
                                : data.components
                                  ? [{ id: String(data.components) }]
                                  : [],
                        },
                    },
                    include: { components: true },
                })
                break

            case 'mealComponents':
                result = await prisma.mealComponent.create({
                    data: {
                        name: data.name,
                        type: data.type,
                        // Обработка ingredients будет делаться отдельно после создания компонента
                    },
                })
                break

            case 'ingredients':
                result = await prisma.ingredient.create({
                    data: {
                        name: data.name,
                        calories: parseFloat(data.calories),
                        protein: data.protein ? parseFloat(data.protein) : null,
                        carbs: data.carbs ? parseFloat(data.carbs) : null,
                        fat: data.fat ? parseFloat(data.fat) : null,
                    },
                })
                break

            default:
                throw new Error(`Unknown resource: ${resource}`)
        }

        return { data: result }
    },

    // @ts-expect-error - Prisma типы не соответствуют типам react-admin
    update: async (resource, params) => {
        const { id, data } = params
        let result

        switch (resource) {
            case 'menus':
                result = await prisma.menu.update({
                    where: { id: String(id) },
                    data: {
                        date: data.date ? new Date(data.date) : undefined,
                        meals: data.meals
                            ? {
                                  set: [],
                                  connect: Array.isArray(data.meals)
                                      ? data.meals.map((mealId) => ({ id: String(mealId) }))
                                      : [{ id: String(data.meals) }],
                              }
                            : undefined,
                    },
                    include: { meals: true },
                })
                break

            case 'meals':
                result = await prisma.meal.update({
                    where: { id: String(id) },
                    data: {
                        name: data.name,
                        components: data.components
                            ? {
                                  set: [],
                                  connect: Array.isArray(data.components)
                                      ? data.components.map((compId) => ({ id: String(compId) }))
                                      : [{ id: String(data.components) }],
                              }
                            : undefined,
                    },
                    include: { components: true },
                })
                break

            case 'mealComponents':
                result = await prisma.mealComponent.update({
                    where: { id: String(id) },
                    data: {
                        name: data.name,
                        type: data.type,
                    },
                    include: { ingredients: { include: { ingredient: true } } },
                })
                break

            case 'ingredients':
                result = await prisma.ingredient.update({
                    where: { id: String(id) },
                    data: {
                        name: data.name,
                        calories: data.calories !== undefined ? parseFloat(data.calories) : undefined,
                        protein: data.protein !== undefined ? parseFloat(data.protein) : undefined,
                        carbs: data.carbs !== undefined ? parseFloat(data.carbs) : undefined,
                        fat: data.fat !== undefined ? parseFloat(data.fat) : undefined,
                    },
                })
                break

            default:
                throw new Error(`Unknown resource: ${resource}`)
        }

        return { data: result }
    },

    // @ts-expect-error - Prisma типы не соответствуют типам react-admin
    delete: async (resource, params) => {
        const { id } = params
        let result

        switch (resource) {
            case 'menus':
                result = await prisma.menu.delete({
                    where: { id: String(id) },
                })
                break

            case 'meals':
                result = await prisma.meal.delete({
                    where: { id: String(id) },
                })
                break

            case 'mealComponents':
                // Удаляем сначала связанные ингредиенты
                await prisma.mealComponentIngredient.deleteMany({
                    where: { componentId: String(id) },
                })
                result = await prisma.mealComponent.delete({
                    where: { id: String(id) },
                })
                break

            case 'ingredients':
                result = await prisma.ingredient.delete({
                    where: { id: String(id) },
                })
                break

            default:
                throw new Error(`Unknown resource: ${resource}`)
        }

        return { data: result }
    },

    deleteMany: async (resource, params) => {
        const { ids } = params

        switch (resource) {
            case 'menus':
                await prisma.menu.deleteMany({
                    where: { id: { in: ids.map(String) } },
                })
                break

            case 'meals':
                await prisma.meal.deleteMany({
                    where: { id: { in: ids.map(String) } },
                })
                break

            case 'mealComponents':
                // Сначала удаляем связанные записи
                await prisma.mealComponentIngredient.deleteMany({
                    where: { componentId: { in: ids.map(String) } },
                })
                await prisma.mealComponent.deleteMany({
                    where: { id: { in: ids.map(String) } },
                })
                break

            case 'ingredients':
                await prisma.ingredient.deleteMany({
                    where: { id: { in: ids.map(String) } },
                })
                break

            default:
                throw new Error(`Unknown resource: ${resource}`)
        }

        return { data: ids }
    },

    updateMany: async (resource, params) => {
        const { ids, data } = params

        switch (resource) {
            case 'menus':
                await prisma.menu.updateMany({
                    where: { id: { in: ids.map(String) } },
                    data: {
                        date: data.date ? new Date(data.date) : undefined,
                    },
                })
                break

            case 'meals':
                await prisma.meal.updateMany({
                    where: { id: { in: ids.map(String) } },
                    data: {
                        name: data.name,
                    },
                })
                break

            case 'mealComponents':
                await prisma.mealComponent.updateMany({
                    where: { id: { in: ids.map(String) } },
                    data: {
                        name: data.name,
                        type: data.type,
                    },
                })
                break

            case 'ingredients':
                await prisma.ingredient.updateMany({
                    where: { id: { in: ids.map(String) } },
                    data: {
                        name: data.name,
                        calories: data.calories !== undefined ? parseFloat(data.calories) : undefined,
                        protein: data.protein !== undefined ? parseFloat(data.protein) : undefined,
                        carbs: data.carbs !== undefined ? parseFloat(data.carbs) : undefined,
                        fat: data.fat !== undefined ? parseFloat(data.fat) : undefined,
                    },
                })
                break

            default:
                throw new Error(`Unknown resource: ${resource}`)
        }

        return { data: ids }
    },

    getManyReference: async <RecordType extends RaRecord = RaRecord>(
        resource: string,
        params: Parameters<DataProvider['getManyReference']>[1],
    ): Promise<{ data: RecordType[]; total: number }> => {
        const {
            target,
            id,
            pagination = { page: 1, perPage: 10 },
            sort = { field: 'id', order: 'ASC' },
            filter = {},
        } = params
        const { page, perPage } = pagination
        const { field, order } = sort

        const offset = (page - 1) * perPage

        let rawData: unknown[] = []
        let total = 0

        switch (resource) {
            case 'meals':
                if (target === 'menus') {
                    rawData =
                        (await prisma.meal.findMany({
                            skip: offset,
                            take: perPage,
                            where: {
                                menus: {
                                    some: { id: String(id) },
                                },
                                ...filter,
                            },
                            orderBy: { [field]: order.toLowerCase() },
                        })) || []
                    total =
                        (await prisma.meal.count({
                            where: {
                                menus: {
                                    some: { id: String(id) },
                                },
                                ...filter,
                            },
                        })) || 0
                }
                break

            case 'mealComponents':
                if (target === 'meals') {
                    rawData =
                        (await prisma.mealComponent.findMany({
                            skip: offset,
                            take: perPage,
                            where: {
                                meals: {
                                    some: { id: String(id) },
                                },
                                ...filter,
                            },
                            orderBy: { [field]: order.toLowerCase() },
                            include: { ingredients: { include: { ingredient: true } } },
                        })) || []
                    total =
                        (await prisma.mealComponent.count({
                            where: {
                                meals: {
                                    some: { id: String(id) },
                                },
                                ...filter,
                            },
                        })) || 0
                }
                break

            default:
                throw new Error(`Unknown resource or target: ${resource}/${target}`)
        }

        // Преобразуем данные к формату, ожидаемому React Admin
        const data = rawData as unknown as RecordType[]

        return { data, total }
    },
}
