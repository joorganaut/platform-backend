import { Project, ProjectEntity } from '../../types'
import * as repository from '../../repositories/Projects/Projects.repository'
import { mapProjectFromProjectEntity, mapProjectEntityFromProject } from '../../dataMappers/Projects/Projects.mappers'


export const fetchAllProjects = async (institutionCode: string): Promise<Project[]> => {
    const ProjectEntities: ProjectEntity[] = await repository.fetchProjects(institutionCode)
    const result = ProjectEntities.map(entity => mapProjectFromProjectEntity(entity))
    return result
}

export const fetchProject = async (projectId: string, institutionCode: string): Promise<Project> => {
    const entity: ProjectEntity = await repository.fetchProjectById(projectId, institutionCode)
    const result = mapProjectFromProjectEntity(entity)
    return result
}

export const saveProject = async (Project: Project, institutionCode: string) => {
    const ProjectEntity: ProjectEntity = mapProjectEntityFromProject(Project, institutionCode)
    const [response] = await repository.createProject(ProjectEntity)
    return mapProjectFromProjectEntity(response)
}

export const updateProject = async (ProjectId: string, Project: Project, institutionCode: string) => {
    const ProjectEntity: ProjectEntity = mapProjectEntityFromProject(Project, institutionCode)
    const [db_response] = await repository.updateProject(ProjectId, ProjectEntity, institutionCode)
    const response = mapProjectFromProjectEntity(db_response)
    return response
}

export const deleteProject = async (ProjectId: string, institutionCode: string) => {
    const [db_response] = await repository.deleteProject(ProjectId, institutionCode)
    const response = mapProjectFromProjectEntity(db_response)
    return response
}