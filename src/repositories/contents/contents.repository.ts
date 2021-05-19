import { db } from '../../server/db'

import { ContentEntity, PagingParams } from '../../types'

const TABLE_NAME = 'contents'

const columns = [
    'id',
    'status',
    'type',
    'title',
    'content',
    'media',
    'deleted_at',
    'created_at',
    'updated_at',
    'flagged',
    'reports'
]

export const fetchContents = async (params?: PagingParams): Promise<ContentEntity[] | any> => {
    if (params) {
        const offSet = ((params.page as number < 1 ? 1 : params.page) - 1) * params.pageSize
        const [count] = await db<ContentEntity>(TABLE_NAME).count('id')
        params.totalCount = count['count'] as number
        const result = await db<ContentEntity>(TABLE_NAME).whereNull('deleted_at').offset(offSet).limit(params.pageSize).select(columns).orderBy(params.sort, params.dir)
        params.data = result
        return params
    }
    return await db<ContentEntity>(TABLE_NAME).whereNull('deleted_at').select(columns)
}

export const fetchContentById = async (contentId: string): Promise<ContentEntity> => await db<ContentEntity>(TABLE_NAME).whereNull('deleted_at').where('id', contentId).first(columns)

export const createContent = async (content: ContentEntity): Promise<ContentEntity[]> => await db<ContentEntity>(TABLE_NAME).insert({ ...content, updated_at: db.raw('now()'), created_at: db.raw('now()') }, columns)

export const updateContent = async (contentId: string, content: ContentEntity): Promise<ContentEntity[]> => await db<ContentEntity>(TABLE_NAME)
    .where('id', contentId)
    .whereNull('deleted_at')
    .update({ ...content, updated_at: db.raw('now()') }, columns)

export const deleteContent = async (contentId: string): Promise<ContentEntity[]> => await db<ContentEntity>(TABLE_NAME)
    .where('id', contentId)
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)