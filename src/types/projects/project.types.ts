import { BusinessObject, Entity } from "../../types/admin/default.types"

export enum ProjectStatus {
    open,
    delayed,
    closed,
    completed
}

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