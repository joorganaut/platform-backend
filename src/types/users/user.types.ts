import { Profile } from "types";
import { Entity, BusinessObject } from "../admin/default.types"
import { QuestionAnswer } from "./questions.types"

export interface User extends BusinessObject {
    id?: string
    username: string
    firstName: string
    lastName: string
    authType: string
    password?: string
    cognitoId: string
    enabled: boolean
    role: string
    isOnBoarded: boolean
    image?: string
    profile?: Profile
    welcomed: boolean
    onboardingQuestions?: QuestionAnswer[]
    ssoType: string
    verificationLink: string
    accessToken: string
}


export interface UserEntity extends Entity {
    id?: string
    username: string
    first_name: string
    last_name: string
    password?: string
    auth_type: string
    cognito_id: string
    enabled: boolean
    role: string
    is_onboarded: boolean
    image?: string
    welcomed: boolean
    onboarding_questions?: string | QuestionAnswer[]
    sso_type: string
    verification_link: string
    access_token: string
}