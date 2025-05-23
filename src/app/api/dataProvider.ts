import { DataProvider, RaRecord } from 'react-admin'

import { ingredientsDataProvider } from 'module/Ingredients/model'
import { mealComponentsDataProvider } from 'module/MealComponents/model'
import { mealsDataProvider } from 'module/Meals/model'
import { menusDataProvider } from 'module/Menus/model'

import type {
    CreateIngredientData,
    CreateMealComponentFormData,
    CreateMealData,
    CreateMenuData,
    UpdateMealComponentFormData,
} from 'shared/types/prisma.types'

export const dataProvider: DataProvider = {
    getList: async <RecordType extends RaRecord = RaRecord>(
        resource: string,
        params: Parameters<DataProvider['getList']>[1],
    ): Promise<{ data: RecordType[]; total: number }> => {
        const { page = 1, perPage = 10 } = params.pagination || {}
        const { field, order } = params.sort || { field: 'createdAt', order: 'DESC' }
        const filter = params.filter || {}

        switch (resource) {
            case 'menus':
                return (await menusDataProvider.getList({
                    pagination: { page, perPage },
                    sort: { field, order },
                    filter,
                })) as unknown as { data: RecordType[]; total: number }

            case 'meals':
                return (await mealsDataProvider.getList({
                    pagination: { page, perPage },
                    sort: { field, order },
                    filter,
                })) as unknown as { data: RecordType[]; total: number }

            case 'mealComponents':
                return (await mealComponentsDataProvider.getList({
                    pagination: { page, perPage },
                    sort: { field, order },
                    filter,
                })) as unknown as { data: RecordType[]; total: number }

            case 'ingredients':
                return (await ingredientsDataProvider.getList({
                    pagination: { page, perPage },
                    sort: { field, order },
                    filter,
                })) as unknown as { data: RecordType[]; total: number }

            default:
                throw new Error(`Unknown resource: ${resource}`)
        }
    },

    getOne: async <RecordType extends RaRecord = RaRecord>(
        resource: string,
        params: Parameters<DataProvider['getOne']>[1],
    ): Promise<{ data: RecordType }> => {
        const { id } = params

        switch (resource) {
            case 'menus':
                return (await menusDataProvider.getOne({ id: String(id) })) as unknown as { data: RecordType }

            case 'meals':
                return (await mealsDataProvider.getOne({ id: String(id) })) as unknown as { data: RecordType }

            case 'mealComponents':
                return (await mealComponentsDataProvider.getOne({ id: String(id) })) as unknown as { data: RecordType }

            case 'ingredients':
                return (await ingredientsDataProvider.getOne({ id: String(id) })) as unknown as { data: RecordType }

            default:
                throw new Error(`Unknown resource: ${resource}`)
        }
    },

    getMany: async <RecordType extends RaRecord = RaRecord>(
        resource: string,
        params: Parameters<DataProvider['getMany']>[1],
    ): Promise<{ data: RecordType[] }> => {
        const { ids } = params

        switch (resource) {
            case 'menus':
                return (await menusDataProvider.getMany({ ids: ids.map(String) })) as unknown as { data: RecordType[] }

            case 'meals':
                return (await mealsDataProvider.getMany({ ids: ids.map(String) })) as unknown as { data: RecordType[] }

            case 'mealComponents':
                return (await mealComponentsDataProvider.getMany({ ids: ids.map(String) })) as unknown as {
                    data: RecordType[]
                }

            case 'ingredients':
                return (await ingredientsDataProvider.getMany({ ids: ids.map(String) })) as unknown as {
                    data: RecordType[]
                }

            default:
                throw new Error(`Unknown resource: ${resource}`)
        }
    },

    create: async <
        RecordType extends Omit<RaRecord, 'id'> = RaRecord,
        ResultRecordType extends RaRecord = RecordType & { id: string },
    >(
        resource: string,
        params: { data: RecordType },
    ): Promise<{ data: ResultRecordType }> => {
        const { data } = params

        switch (resource) {
            case 'menus':
                return (await menusDataProvider.create({ data: data as unknown as CreateMenuData })) as unknown as {
                    data: ResultRecordType
                }

            case 'meals':
                return (await mealsDataProvider.create({ data: data as unknown as CreateMealData })) as unknown as {
                    data: ResultRecordType
                }

            case 'mealComponents':
                return (await mealComponentsDataProvider.create({
                    data: data as unknown as CreateMealComponentFormData,
                })) as unknown as { data: ResultRecordType }

            case 'ingredients':
                return (await ingredientsDataProvider.create({
                    data: data as unknown as CreateIngredientData,
                })) as unknown as { data: ResultRecordType }

            default:
                throw new Error(`Unknown resource: ${resource}`)
        }
    },

    update: async <RecordType extends RaRecord = RaRecord>(
        resource: string,
        params: { id: string; data: Partial<RecordType> },
    ): Promise<{ data: RecordType }> => {
        const { id, data } = params

        switch (resource) {
            case 'menus':
                return (await menusDataProvider.update({
                    id: String(id),
                    data: data as unknown as CreateMenuData,
                })) as unknown as { data: RecordType }

            case 'meals':
                return (await mealsDataProvider.update({
                    id: String(id),
                    data: data as unknown as CreateMealData,
                })) as unknown as { data: RecordType }

            case 'mealComponents':
                return (await mealComponentsDataProvider.update({
                    id: String(id),
                    data: data as unknown as UpdateMealComponentFormData,
                })) as unknown as { data: RecordType }

            case 'ingredients':
                return (await ingredientsDataProvider.update({
                    id: String(id),
                    data: data as unknown as CreateIngredientData,
                })) as unknown as { data: RecordType }

            default:
                throw new Error(`Unknown resource: ${resource}`)
        }
    },

    delete: async <RecordType extends RaRecord = RaRecord>(
        resource: string,
        params: Parameters<DataProvider['delete']>[1],
    ): Promise<{ data: RecordType }> => {
        const { id } = params

        switch (resource) {
            case 'menus':
                return (await menusDataProvider.delete({ id: String(id) })) as unknown as { data: RecordType }

            case 'meals':
                return (await mealsDataProvider.delete({ id: String(id) })) as unknown as { data: RecordType }

            case 'mealComponents':
                return (await mealComponentsDataProvider.delete({ id: String(id) })) as unknown as { data: RecordType }

            case 'ingredients':
                return (await ingredientsDataProvider.delete({ id: String(id) })) as unknown as { data: RecordType }

            default:
                throw new Error(`Unknown resource: ${resource}`)
        }
    },

    deleteMany: async <RecordType extends RaRecord = RaRecord>(
        resource: string,
        params: Parameters<DataProvider['deleteMany']>[1],
    ): Promise<{ data: RecordType['id'][] }> => {
        const { ids } = params

        switch (resource) {
            case 'menus':
                return (await menusDataProvider.deleteMany({ ids: ids.map(String) })) as unknown as {
                    data: RecordType['id'][]
                }

            case 'meals':
                return (await mealsDataProvider.deleteMany({ ids: ids.map(String) })) as unknown as {
                    data: RecordType['id'][]
                }

            case 'mealComponents':
                return (await mealComponentsDataProvider.deleteMany({ ids: ids.map(String) })) as unknown as {
                    data: RecordType['id'][]
                }

            case 'ingredients':
                return (await ingredientsDataProvider.deleteMany({ ids: ids.map(String) })) as unknown as {
                    data: RecordType['id'][]
                }

            default:
                throw new Error(`Unknown resource: ${resource}`)
        }
    },

    updateMany: async <RecordType extends RaRecord = RaRecord>(
        resource: string,
        params: Parameters<DataProvider['updateMany']>[1],
    ): Promise<{ data: RecordType['id'][] }> => {
        const { ids, data } = params

        switch (resource) {
            case 'menus':
                return (await menusDataProvider.updateMany({ ids: ids.map(String), data })) as unknown as {
                    data: RecordType['id'][]
                }

            case 'meals':
                return (await mealsDataProvider.updateMany({ ids: ids.map(String), data })) as unknown as {
                    data: RecordType['id'][]
                }

            case 'mealComponents':
                return (await mealComponentsDataProvider.updateMany({ ids: ids.map(String), data })) as unknown as {
                    data: RecordType['id'][]
                }

            case 'ingredients':
                return (await ingredientsDataProvider.updateMany({ ids: ids.map(String), data })) as unknown as {
                    data: RecordType['id'][]
                }

            default:
                throw new Error(`Unknown resource: ${resource}`)
        }
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

        switch (resource) {
            case 'meals':
                if (target === 'menus') {
                    return (await mealsDataProvider.getManyReference({
                        target,
                        id: String(id),
                        pagination,
                        sort,
                        filter,
                    })) as unknown as Promise<{ data: RecordType[]; total: number }>
                }
                break

            case 'mealComponents':
                if (target === 'meals') {
                    return (await mealComponentsDataProvider.getManyReference({
                        target,
                        id: String(id),
                        pagination,
                        sort,
                        filter,
                    })) as unknown as Promise<{ data: RecordType[]; total: number }>
                }
                break

            default:
                throw new Error(`Unknown resource or target: ${resource}/${target}`)
        }

        throw new Error(`Unknown resource or target: ${resource}/${target}`)
    },
}
