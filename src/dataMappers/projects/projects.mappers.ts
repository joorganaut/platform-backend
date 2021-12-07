import { Project, ProjectEntity, ProjectItem } from '../../types'

/*
export interface Project extends BusinessObject {
    name: string
    startDate: Date
    endDate: Date
    description: string
    status: ProjectStatus
}

export interface ProjectEntity extends Entity {
    name: string
    start_date: Date
    end_date: Date
    description: string
    status: ProjectStatus
}
*/

export const mapProjectFromProjectEntity = (entity: ProjectEntity): Project => {

    return {
        id: entity.id,
        name: entity.name,
        startDate: entity.start_date,
        endDate: entity.end_date,
        description: entity.description,
        status: entity.status,
        institutionCode: entity.institution_code,
        items: entity.items as ProjectItem[],
        budget: entity.budget,
        clientId: entity.client_id,
        currency: entity.currency,
    }
}

export const mapProjectEntityFromProject = (project: Project, institutionCode: string): ProjectEntity => {

    return {
        name: project.name,
        start_date: project.startDate,
        end_date: project.endDate,
        description: project.description,
        status: project.status,
        institution_code: institutionCode,
        items: JSON.stringify(project.items),
        budget: project.budget,
        client_id: project.clientId,
        currency: project.currency,
    }
}