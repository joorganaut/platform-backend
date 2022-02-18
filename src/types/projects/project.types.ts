import { NoteStatus } from "types";
import { BusinessObject, Entity } from "../../types/admin/default.types"

export enum ProjectStatus {
    open,
    delayed,
    closed,
    completed
}

// export enum ProjectItemStatus {
//     todo,
//     started,
//     completed,
//     cancelled,
//     blocked
// }

export interface ProjectItem {
    id?: string
    name?: string
    user?: string
    userId?: string
    startDate?: Date
    endDate?: Date
    status?: NoteStatus
}

export interface Project extends BusinessObject {
    name: string
    startDate: Date
    endDate: Date
    description: string
    status: ProjectStatus
    items: ProjectItem[]
    budget: number
    clientId: string
    currency: string
}

export interface ProjectEntity extends Entity {
    name: string
    start_date: Date
    end_date: Date
    description: string
    status: ProjectStatus
    items: string | ProjectItem[]
    budget: number
    client_id: string
    currency: string
}