import { Context } from 'koa'
import { Project } from '../../types'
import * as service from '../../services/projects/projects.service'


export const getAllProjects = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    const result = await service.fetchAllProjects(institutioncode as string)
    ctx.body = result
}


export const getProject = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    const { id } = ctx.params
    const result = await service.fetchProject(id, institutioncode as string)
    ctx.body = result
}

export const saveProject = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    const client = ctx.request.body
    const result: Project = await service.saveProject(client, institutioncode as string)
    ctx.body = result
}
export const updateProject = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    const client = ctx.request.body
    const { id } = ctx.params
    const result: Project = await service.updateProject(id, client, institutioncode as string)
    ctx.body = result
}
export const deleteProject = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    const { id } = ctx.params
    const result: Project = await service.deleteProject(id, institutioncode as string)
    ctx.body = result
}

// export const getProjects = async (ctx: Context) => {
//     const { key, source } = ctx.params
//     const result: Project[] = await getProjectsBySource(source, key)
//     ctx.body = result
// }
