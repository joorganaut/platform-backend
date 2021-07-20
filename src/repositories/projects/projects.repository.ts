import { db } from '../../server/db'
import { ProjectEntity, PagingParams } from '../../types'

const TABLE_NAME = 'projects'

const columns = [
    'id',
    'name',
    'start_date',
    'end_date',
    'description',
    'status'


]

export const fetchProjects = async (institutionCode: string, params?: PagingParams): Promise<ProjectEntity[] | any> => {
    if (params) {
        const offSet = ((params.page as number < 1 ? 1 : params.page) - 1) * params.pageSize
        const [count] = await db<ProjectEntity>(TABLE_NAME).count('id').whereNull('deleted_at').where('institution_code', institutionCode)
        params.totalCount = count['count'] as number
        const result = await db<ProjectEntity>(TABLE_NAME).whereNull('deleted_at').where('institution_code', institutionCode).offset(offSet).limit(params.pageSize).select(columns).orderBy(params.sort, params.dir)
        params.data = result
        return params
    }
    return await db<ProjectEntity>(TABLE_NAME).whereNull('deleted_at').where('institution_code', institutionCode).select(columns)
}

export const fetchProjectById = async (ProjectId: string, institutionCode: string): Promise<ProjectEntity> => await db<ProjectEntity>(TABLE_NAME).whereNull('deleted_at').where('id', ProjectId).where('institution_code', institutionCode).first(columns)

export const fetchProjectByName = async (name: string, institutionCode: string): Promise<ProjectEntity> => await db<ProjectEntity>(TABLE_NAME).whereNull('deleted_at').where('name', name).where('institution_code', institutionCode).first(columns)

export const createProject = async (Project: ProjectEntity): Promise<ProjectEntity[]> => await db<ProjectEntity>(TABLE_NAME).insert({ ...Project, updated_at: db.raw('now()'), created_at: db.raw('now()') }, columns)

export const updateProject = async (ProjectId: string, Project: ProjectEntity, institutionCode: string): Promise<ProjectEntity[]> => await db<ProjectEntity>(TABLE_NAME)
    .where('id', ProjectId)
    .where('institution_code', institutionCode)
    .whereNull('deleted_at')
    .update({ ...Project, updated_at: db.raw('now()') }, columns)

export const deleteProject = async (ProjectId: string, institutionCode: string): Promise<ProjectEntity[]> => await db<ProjectEntity>(TABLE_NAME)
    .where('id', ProjectId)
    .where('institution_code', institutionCode)
    .update({ updated_at: db.raw('now()'), deleted_at: db.raw('now()') }, columns)