import { Profile, User, UserEntity, PagingParams, UploadFile } from "../../types"
import * as usersRepository from '../../repositories/users/users.repository'
import * as institutionRepository from '../../repositories/admin/institution.repository'
import { mapUserFromUserEntity, mapUserEntityFromUser } from '../../dataMappers/users/users.mappers'
import { BadRequestError, NotFoundError, UnauthorizedError } from "../../lib"
import { Md5 } from 'ts-md5/dist/md5'
import { getEmailTemplate, sendEmail } from '../admin/email.service'
import { getJwtTokenFromValue } from '../admin/security.service'



export const fetchUsers = async (institutionCode: string, params?: PagingParams): Promise<User[] | any> => {
    const result = await usersRepository.fetchUsers(institutionCode, params)
    if (!params) {
        return (result as UserEntity[])?.map(user => mapUserFromUserEntity(user))
    }
    return { ...result, data: result?.data?.map((user: UserEntity) => mapUserFromUserEntity(user)) }
}

export const findUserById = async (userId: string): Promise<User> => {

    const user: UserEntity = await usersRepository.fetchUserById(userId)

    if (!user) {
        throw new NotFoundError(__filename, `User ID ${userId} does not exist`)
    }

    const response = mapUserFromUserEntity(user)
    return response
}

export const findUserByIdWithInstitutionCode = async (userId: string, institutionCode: string): Promise<User> => {

    const user: UserEntity = await usersRepository.fetchUserByIdWithInstitutionCode(userId, institutionCode)

    if (!user) {
        throw new NotFoundError(__filename, `User ID ${userId} does not exist`)
    }

    const response = mapUserFromUserEntity(user)
    return response
}

export const findUserByEmail = async (email: string, institutionCode: string): Promise<User | null> => {
    const user = await usersRepository.fetchUserByEmail(email, institutionCode || '')
    if (!user) {
        return null
    }
    const response = mapUserFromUserEntity(user)
    return response
}

export const createUser = async (institutionCode: string, user: User): Promise<any> => {
    const existingUser = await findUserByEmail(user.username, institutionCode)
    if (existingUser && existingUser.authType.includes('sso')) {
        const existingInstitution = await institutionRepository.fetchInstitutionById(existingUser?.institutionCode as string)

        return { data: existingUser, institution: existingInstitution }
    } else if (existingUser && existingUser.authType === 'creds') {
        throw new BadRequestError(__filename, `User with email ${user.username} already exists`)
    }

    //if institutionCode blank create new institution
    let institution = institutionCode ? await institutionRepository.fetchInstitutionById(institutionCode) : undefined
    if (!institution) {
        //create new institution
        [institution] = await institutionRepository.createInstitution({})
        //create accounts

    }


    const userEntity = mapUserEntityFromUser(user)
    userEntity.institution_code = institution.id
    //create md5 hash password
    userEntity.password = user.password && user.password !== '' ? Md5.hashStr(user.password) as string : ''

    const [db_response] = await usersRepository.createUser(userEntity)


    const response = mapUserFromUserEntity(db_response)

    //TODO: uncomment welcome email when ready
    // const welcomeTemplate = await getEmailTemplate(user, 'welcome')
    // await sendEmail([user.username, 'product@bptn.ca'], "Welcome to Obsidi", welcomeTemplate.replace('{link}', process.env.UI_URL as string))
    if (user.authType === 'creds') {
        const cipher = await getJwtTokenFromValue(JSON.stringify({ id: response.id, firstName: response.firstName, lastName: response.lastName }))
        const templateBuffer = await getEmailTemplate(user, 'emailVerification')
        const template = templateBuffer.replace('{link}', process.env.UI_URL + 'verification/' + cipher)
        //await sendEmail([user.username], "Name: Confirm Your Registration", template)
    }
    return { data: response, institution: institution }
}

export const loginUser = async (username: string, password: string, institutionCode: string): Promise<User> => {

    const existingUser = await findUserByEmail(username, institutionCode)
    if (!existingUser) {
        throw new NotFoundError(__filename, `User with username ${username} does not exist`)
    }

    if (existingUser.authType.includes('sso')) {
        throw new UnauthorizedError(__filename, `Please sign in using your identity provider`)
    }

    const passwordHash = Md5.hashStr(password)
    if (existingUser.password !== passwordHash) {
        throw new UnauthorizedError(__filename, `Invalid Username or Password`)
    }

    const userEntity = mapUserEntityFromUser(existingUser)
    userEntity.signout_requested = false
    const [db_response] = await usersRepository.updateUser(existingUser.id as string, userEntity, institutionCode)
    // db_response.password = ''
    const response = mapUserFromUserEntity(db_response)
    return { ...response }
}

export const resetPassword = async (email: string, institutionCode: string): Promise<User> => {
    const existingUser = await findUserByEmail(email, institutionCode)
    if (!existingUser) {
        throw new NotFoundError(__filename, `User with email ${email} does not exist`)
    }
    if (existingUser.authType === 'sso') {
        throw new UnauthorizedError(__filename, `Please sign in using your identity provider`)
    }
    const cipher = await getJwtTokenFromValue(JSON.stringify({ id: existingUser.id, firstName: existingUser.firstName, lastName: existingUser.lastName }))
    const templateBuffer = await getEmailTemplate(existingUser, 'passwordReset')
    const template = templateBuffer.replace('{link}', process.env.UI_URL + 'password-reset/' + cipher)
    //await sendEmail([existingUser.username], "Please reset your Password", template)
    return existingUser
}

export const invite = async (id: string, emails: string[], institutionCode?: string): Promise<User> => {
    const existingUser = institutionCode ? await findUserByIdWithInstitutionCode(id, institutionCode) : await findUserById(id)
    if (!existingUser) {
        throw new NotFoundError(__filename, `User with id ${id} does not exist`)
    }

    const templateBuffer = await getEmailTemplate(existingUser, 'invitation')
    const template = templateBuffer.replace('{link}', process.env.UI_URL as string)
    //await sendEmail([...emails], "You've Been Invited", template)
    return existingUser
}

export const changePassword = async (userId: string, password: string, institutionCode: string): Promise<User> => {
    const existingUser = institutionCode ? await findUserByIdWithInstitutionCode(userId, institutionCode) : await findUserById(userId)
    if (!existingUser) {
        throw new NotFoundError(__filename, `User does not exist`)
    }
    if (existingUser.authType === 'sso') {
        throw new UnauthorizedError(__filename, `Please sign in using your identity provider`)
    }
    const passwordHash = Md5.hashStr(password)

    existingUser.password = passwordHash as string
    existingUser.signoutRequested = true
    const [user] = await usersRepository.updateUser(userId, mapUserEntityFromUser(existingUser), institutionCode)

    return mapUserFromUserEntity(user)
}

export const updateUser = async (userId: string, user: User, institutionCode: string): Promise<User> => {
    const userEntity = mapUserEntityFromUser(user)
    const [db_response] = await usersRepository.updateUser(userId, userEntity, institutionCode)
    const response = mapUserFromUserEntity(db_response)
    return response
}

export const deleteUser = async (institutionCode: string, userId: string, onlyCache?: boolean): Promise<User> => {
    if (!onlyCache) {
        const [db_response_from_cache] = await usersRepository.deleteUser(userId, institutionCode)
        const response_from_cache = mapUserFromUserEntity({ ...db_response_from_cache, password: '' })

        return response_from_cache
    }
    const [db_response] = await usersRepository.deleteUser(userId, institutionCode)
    const response = mapUserFromUserEntity(db_response)
    return response
}
