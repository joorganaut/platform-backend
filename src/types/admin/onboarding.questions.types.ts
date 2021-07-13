import { BusinessObject, Entity } from "./default.types"

export type QuestionDisplayType = 'text' | 'text-multi' | 'select' | 'radio-single' | 'radio-multi' | 'yes-no' | 'true-false' | 'file' | 'complex'
export type QuestionRole = 'Member' | 'Partner'

export interface OnboardingQuestion extends BusinessObject {
    id?: string
    question: string
    role: 'Member' | 'Partner'
    displayType: QuestionDisplayType
    options?: string[]
    page: number
    pageOrder: number
    enabled: boolean
    required?: boolean
}

export interface OnboardingQuestionEntity extends Entity {
    id?: string
    question: string
    role: 'Member' | 'Partner'
    display_type: QuestionDisplayType
    options?: string | string[]
    page: number
    page_order: number
    enabled: boolean
    required?: boolean
}