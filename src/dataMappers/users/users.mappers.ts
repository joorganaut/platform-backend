import { QuestionAnswer } from 'types/users/questions.types'
import { User, UserEntity } from '../../types/'


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
        welcomed: entity.welcomed,
        onboardingQuestions: entity.onboarding_questions as QuestionAnswer[],
        verificationLink: entity.verification_link,
        ssoType: entity.sso_type,
        accessToken: entity.access_token
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
        welcomed: user.welcomed,
        onboarding_questions: JSON.stringify(user.onboardingQuestions),
        verification_link: user.verificationLink,
        sso_type: user.ssoType,
        access_token: user.accessToken
    }

}