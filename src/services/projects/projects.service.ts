import { Project, ProjectEntity } from '../../types'
import * as repository from '../../repositories/projects/projects.repository'
import { mapProjectFromProjectEntity, mapProjectEntityFromProject } from '../../dataMappers/projects/projects.mappers'
import * as NoteService from '../notes/notes.service'
import { mapNoteFromProjectItem } from '../../dataMappers/notes/notes.mappers'


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
    await Promise.all(Project.items?.map(async (item, index) => {
        const params = { name: Project.name, description: Project.description, institution_code: institutionCode }
        const entity = mapNoteFromProjectItem(item, params)
        const db_response = await NoteService.saveNote(entity, institutionCode, (e) => { item.id = e })
        item.id = db_response.id
    }))

    const ProjectEntity: ProjectEntity = mapProjectEntityFromProject(Project, institutionCode)
    const [response] = await repository.createProject(ProjectEntity)
    return mapProjectFromProjectEntity(response)
}

export const updateProject = async (ProjectId: string, Project: Project, institutionCode: string) => {
    const existingProject = await fetchProject(ProjectId, institutionCode)
    //TODO: check if project has deleted Project items

    const existingTasks = Project?.items?.filter(x => (existingProject.items?.find(y => y.id === x.id) !== undefined) && (Project.items?.find(z => z.id === x.id) !== undefined))
    const deletedTasks = existingProject?.items?.filter(x => {
        if (!existingTasks?.find(y => y.id === x.id)) {
            return x
        }
    })
    if (deletedTasks && deletedTasks.length > 0) {
        await Promise.all(deletedTasks?.map(async x => {
            await NoteService.deleteNote(x?.id as string, institutionCode)
        }))
    }

    const newTasks = Project.items?.filter(x => {
        if (!existingTasks?.includes(x))
            return x
    })

    await Promise.all(existingTasks?.map(async item => {
        const params = { name: Project.name, description: Project.description, institution_code: institutionCode }
        const entity = mapNoteFromProjectItem(item, params)
        const db_response = await NoteService.updateNote(item?.id as string, entity, institutionCode)
    }))

    await Promise.all(newTasks?.map(async (item) => {
        const params = { name: Project.name, description: Project.description, institution_code: institutionCode }
        const entity = mapNoteFromProjectItem(item, params)
        const db_response = await NoteService.saveNote(entity, institutionCode, (e) => {
            Project.items[Project.items.indexOf(item)].id = e
        })
    }))


    const ProjectEntity: ProjectEntity = mapProjectEntityFromProject(Project, institutionCode)
    const [db_response] = await repository.updateProject(ProjectId, ProjectEntity, institutionCode)
    const response = mapProjectFromProjectEntity(db_response)
    return response
}

export const deleteProject = async (ProjectId: string, institutionCode: string) => {
    const existingProject = await fetchProject(ProjectId, institutionCode)
    await Promise.all(existingProject?.items?.map(async x => {
        await NoteService.deleteNote(x?.id as string, institutionCode)
    }))
    const [db_response] = await repository.deleteProject(ProjectId, institutionCode)
    const response = mapProjectFromProjectEntity(db_response)
    return response
}