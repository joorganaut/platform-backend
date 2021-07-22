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
    onboardingQuestions?: QuestionAnswer[]
    ssoType: string
    verificationLink: string
    accessToken: string
    signoutRequested?: boolean
    transactionPin: string,
    isAuthenticated: boolean,
    forcePasswordChange: boolean,
    forcePinChange: boolean,
    lastLoginDate: Date,
    numberOfFailedAttempts: number,
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
    onboarding_questions?: string | QuestionAnswer[]
    sso_type: string
    verification_link: string
    access_token: string
    signout_requested?: boolean
    transaction_pin: string,
    is_authenticated: boolean,
    force_password_change: boolean,
    force_pin_change: boolean,
    last_login_date: Date,
    number_of_failed_attempts: number

}

export interface Role extends BusinessObject {
    name: string
    IsTransactable: boolean,
    TransactionAmount: number
}

export interface RoleEntity extends Entity {
    name: string
    is_transactable: boolean,
    transaction_amount: number
}

export interface UserFunction {
    id: string
    name: string
    action: string
    isEnabled: boolean
}

export interface UserFunctionEntity extends Entity {
    name: string
    action: string
    is_enabled: boolean
}

export interface UserRole extends BusinessObject {
    userId: string
    roleId: string
    roleName: string

    isAdmin: boolean,
    username: string
}
export interface UserRoleEntity extends Entity {
    user_id: string
    role_id: string
    role_name: string
    is_admin: boolean,
    username: string
}

export interface RoleFunction extends BusinessObject {
    roleId: string
    functionId: string
    functionName: string
}

export interface RoleFunctionEntity extends Entity {
    role_id: string
    function_id: string
    function_name: string
}