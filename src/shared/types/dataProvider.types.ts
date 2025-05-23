export interface Pagination {
    page?: number
    perPage?: number
}

export interface Sort {
    field?: string
    order?: 'ASC' | 'DESC'
}

export interface Filter {
    [key: string]: unknown
    q?: string
}

export interface GetListParams {
    pagination?: Pagination
    sort?: Sort
    filter?: Filter
}

export interface GetOneParams {
    id: string
}

export interface GetManyParams {
    ids: string[]
}

export interface CreateParams<T = Record<string, unknown>> {
    data: T
}

export interface UpdateParams<T = Record<string, unknown>> {
    id: string
    data: T
}

export interface DeleteParams {
    id: string
}

export interface DeleteManyParams {
    ids: string[]
}

export interface UpdateManyParams<T = Record<string, unknown>> {
    ids: string[]
    data: T
}

export interface DataProviderResult<T = unknown> {
    data: T
}

export interface GetListResult<T = unknown> {
    data: T[]
    total: number
}
