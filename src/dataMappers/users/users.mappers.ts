import { QuestionAnswer } from 'types/users/questions.types'
import {
    User,
    UserEntity,
    Role,
    RoleEntity,
    UserFunction,
    UserFunctionEntity,
    UserRole,
    UserRoleEntity,
    RoleFunction,
    RoleFunctionEntity
} from '../../types/'

/*
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
*/

export const mapRoleFunctionFromRoleFunctionEntity = (entity: RoleFunctionEntity): RoleFunction => {
    return {
        id: entity.id,
        roleId: entity.role_id,
        functionId: entity.function_id,
        functionName: entity.function_name,
        institutionCode: entity.institution_code
    }
}

export const mapRoleFunctionEntityFromRoleFunction = (roleFunction: RoleFunction): RoleFunctionEntity => {
    return {
        role_id: roleFunction.roleId,
        function_id: roleFunction.functionId,
        function_name: roleFunction.functionName,
        institution_code: roleFunction.institutionCode
    }
}



/*
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
}
*/

export const mapUserRoleFromUserRoleEntity = (entity: UserRoleEntity): UserRole => {
    return {
        id: entity.id,
        userId: entity.user_id,
        roleId: entity.role_id,
        roleName: entity.role_name,
        isAdmin: entity.is_admin,
        username: entity.username,
        institutionCode: entity.institution_code
    }
}

export const mapUserRoleEntityFromUserRole = (userRole: UserRole): UserRoleEntity => {
    return {
        user_id: userRole.userId,
        role_id: userRole.roleId,
        role_name: userRole.roleName,
        is_admin: userRole.isAdmin,
        username: userRole.username,
        institution_code: userRole.institutionCode
    }
}

/*

export interface UserFunction {
    id: string
    name: string
    action: string
    isEnabled: boolean
}

export interface UserFunctionEntity extends Entity {
    id: string
    name: string
    action: string
    is_enabled: boolean
}
*/

export const mapUserFunctionFromUserFunctionEntity = (entity: UserFunctionEntity): UserFunction => {
    return {
        id: entity.id as string,
        name: entity.name,
        action: entity.action,
        isEnabled: entity.is_enabled
    }
}

export const mapUserFunctionEntityFromUserFunction = (userFunction: UserFunction): UserFunctionEntity => {
    return {
        name: userFunction.name,
        action: userFunction.action,
        is_enabled: userFunction.isEnabled,
        institution_code: ''
    }
}


/*
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
*/
export const mapRoleFromRoleEntity = (entity: RoleEntity): Role => {
    return {
        id: entity.id,
        name: entity.name,
        IsTransactable: entity.is_transactable,
        TransactionAmount: entity.transaction_amount,
        institutionCode: entity.institution_code
    }
}

export const mapRoleEntityFromRole = (role: Role): RoleEntity => {
    return {
        name: role.name,
        is_transactable: role.IsTransactable,
        transaction_amount: role.TransactionAmount,
        institution_code: role.institutionCode
    }
}


export const mapUserFromUserEntity = (entity: UserEntity): User => {

    return {
        id: entity.id,
        firstName: entity.first_name,
        lastName: entity.last_name,
        password: entity.password,
        username: entity.username,
        role: entity.role,
        authType: entity.auth_type,
        cognitoId: entity.cognito_id,
        isOnBoarded: entity.is_onboarded,
        enabled: entity.enabled,
        image: entity.image,
        onboardingQuestions: entity.onboarding_questions as QuestionAnswer[],
        verificationLink: entity.verification_link,
        ssoType: entity.sso_type,
        accessToken: entity.access_token,
        signoutRequested: entity.signout_requested,
        transactionPin: entity.transaction_pin,
        isAuthenticated: entity.is_authenticated,
        forcePasswordChange: entity.force_password_change,
        lastLoginDate: entity.last_login_date,
        numberOfFailedAttempts: entity.number_of_failed_attempts,
        institutionCode: entity.institution_code,
        forcePinChange: entity.force_pin_change
    }

}

export const mapUserEntityFromUser = (user: User): UserEntity => {

    return {
        username: user.username,
        first_name: user.firstName,
        last_name: user.lastName,
        password: user.password,
        auth_type: user.authType,
        is_onboarded: user.isOnBoarded,
        cognito_id: user.cognitoId,
        enabled: user.enabled,
        role: user.role,
        image: user.image,
        onboarding_questions: JSON.stringify(user.onboardingQuestions),
        verification_link: user.verificationLink,
        sso_type: user.ssoType,
        access_token: user.accessToken,
        signout_requested: user.signoutRequested,
        transaction_pin: user.transactionPin,
        is_authenticated: user.isAuthenticated,
        force_password_change: user.forcePasswordChange,
        last_login_date: user.lastLoginDate,
        number_of_failed_attempts: user.numberOfFailedAttempts,
        force_pin_change: user.forcePinChange,
        institution_code: user.institutionCode
    }

}