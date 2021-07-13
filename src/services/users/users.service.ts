import { Profile, User, UserEntity, Partner, PartnerUser, PagingParams, UploadFile } from "../../types"
import * as usersRepository from '../../repositories/users/users.repository'
import { mapUserFromUserEntity, mapUserEntityFromUser } from '../../dataMappers/users/users.mappers'
import { BadRequestError, NotFoundError, UnauthorizedError } from "../../lib"
import * as RedisService from '../../services/admin/redis.service'
import { Md5 } from 'ts-md5/dist/md5'
import { createProfile, findProfileByUserId, updateProfile } from "./profiles.service"
import { getEmailTemplate, sendEmail } from '../admin/email.service'
import { getJwtTokenFromValue } from '../admin/security.service'
import { QuestionAnswer } from "../../types/users/questions.types"
import { handleFileUpload } from "../admin/file.service"



export const fetchUsers = async (params?: PagingParams): Promise<User[] | any> => {
    const result = await usersRepository.fetchUsers(params)
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
    await RedisService.create("users", response)
    return response
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
    const user = await usersRepository.fetchUserByEmail(email)
    if (!user) {
        return null
    }
    const response = mapUserFromUserEntity(user)
    await RedisService.create("users", response)
    return response
}

export const createUser = async (user: User, profile?: Profile): Promise<User> => {
    const existingUser = await findUserByEmail(user.username)
    if (existingUser && existingUser.authType.includes('sso')) {
        return existingUser
    } else if (existingUser && existingUser.authType === 'creds') {
        throw new BadRequestError(__filename, `User with email ${user.username} already exists`)
    }
    const userEntity = mapUserEntityFromUser(user)
    //create md5 hash password
    userEntity.password = user.password && user.password !== '' ? Md5.hashStr(user.password) as string : ''

    const newProfile: Profile = profile ? profile : {
        institutionCode: user.institutionCode,
        avatar: '',
        location: '',
        bio: '',
        title: '',
        industry: '',
        userId: '',
        handler: ''
    }
    const [db_response] = await usersRepository.createUser(userEntity)
    newProfile.userId = db_response.id as string
    const oldProfile = await findProfileByUserId(db_response.id as string)
    const new_Profile = oldProfile ? oldProfile : await createProfile(newProfile)

    const response = mapUserFromUserEntity(db_response)
    await RedisService.create("users", response)

    //TODO uncomment welcome email when ready
    // const welcomeTemplate = await getEmailTemplate(user, 'welcome')
    // await sendEmail([user.username, 'product@bptn.ca'], "Welcome to Obsidi", welcomeTemplate.replace('{link}', process.env.UI_URL as string))
    if (user.authType === 'creds') {
        const cipher = await getJwtTokenFromValue(JSON.stringify({ id: response.id, firstName: response.firstName, lastName: response.lastName }))
        const templateBuffer = await getEmailTemplate(user, 'emailVerification')
        const template = templateBuffer.replace('{link}', process.env.UI_URL + 'verification/' + cipher)
        await sendEmail([user.username], "Name: Confirm Your Registration", template)
    }
    return { ...response, profile: new_Profile }
}

export const loginUser = async (username: string, password: string): Promise<User> => {

    const existingUser = await findUserByEmail(username)
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
    const [db_response] = await usersRepository.updateUser(existingUser.id as string, userEntity)
    // db_response.password = ''
    const response = mapUserFromUserEntity(db_response)
    await RedisService.create("users", response)
    const profile = await findProfileByUserId(response.id as string) as Profile
    return { ...response, profile: profile }
}

export const resetPassword = async (email: string): Promise<User> => {
    const existingUser = await findUserByEmail(email)
    if (!existingUser) {
        throw new NotFoundError(__filename, `User with email ${email} does not exist`)
    }
    if (existingUser.authType === 'sso') {
        throw new UnauthorizedError(__filename, `Please sign in using your identity provider`)
    }
    const cipher = await getJwtTokenFromValue(JSON.stringify({ id: existingUser.id, firstName: existingUser.firstName, lastName: existingUser.lastName }))
    const templateBuffer = await getEmailTemplate(existingUser, 'passwordReset')
    const template = templateBuffer.replace('{link}', process.env.UI_URL + 'password-reset/' + cipher)
    await sendEmail([existingUser.username], "Please reset your Password", template)
    return existingUser
}

export const invite = async (id: string, emails: string[]): Promise<User> => {
    const existingUser = await findUserById(id)
    if (!existingUser) {
        throw new NotFoundError(__filename, `User with id ${id} does not exist`)
    }

    const templateBuffer = await getEmailTemplate(existingUser, 'invitation')
    const template = templateBuffer.replace('{link}', process.env.UI_URL as string)
    await sendEmail([...emails, 'product@bptn.ca'], "You've Been Invited", template)
    return existingUser
}

export const changePassword = async (userId: string, password: string): Promise<User> => {
    const existingUser = await findUserById(userId)
    if (!existingUser) {
        throw new NotFoundError(__filename, `User does not exist`)
    }
    if (existingUser.authType === 'sso') {
        throw new UnauthorizedError(__filename, `Please sign in using your identity provider`)
    }
    const passwordHash = Md5.hashStr(password)

    existingUser.password = passwordHash as string
    existingUser.signoutRequested = true
    const [user] = await usersRepository.updateUser(userId, mapUserEntityFromUser(existingUser))

    return mapUserFromUserEntity(user)
}

export const updateUser = async (userId: string, user: User): Promise<User> => {
    const userEntity = mapUserEntityFromUser(user)
    const [db_response] = await usersRepository.updateUser(userId, userEntity)
    const response = mapUserFromUserEntity(db_response)
    await RedisService.update("users", response)
    return response
}

export const deleteUser = async (userId: string, onlyCache?: boolean): Promise<User> => {
    if (!onlyCache) {
        const [db_response_from_cache] = await usersRepository.deleteUser(userId)
        const response_from_cache = mapUserFromUserEntity({ ...db_response_from_cache, password: '' })

        await RedisService.destroy("users", response_from_cache.id as string)
        return response_from_cache
    }
    const [db_response] = await usersRepository.deleteUser(userId)
    const response = mapUserFromUserEntity(db_response)
    await RedisService.destroy("users", response.id as string)
    return response
}

export const updateOnboardingQuestions = async (userId: string, answers: QuestionAnswer[]): Promise<User> => {
    const user: UserEntity = await usersRepository.fetchUserById(userId)
    if (!user) {
        throw new NotFoundError(__filename, `User with id ${userId} does not exist`)
    }

    const firstName = answers?.find(answer => answer.question.includes('First Name'))
    if (firstName && firstName.answer) {
        user.first_name = firstName.answer
    }

    const lastName = answers?.find(answer => answer.question.includes('Last Name'))
    if (lastName && lastName.answer) {
        user.last_name = lastName.answer
    }

    const resume = answers?.find(answer => answer.question.includes('resume'))
    if (resume && resume.answer && resume.answer.includes('type')) {
        const fileDetails = JSON.parse(resume.answer)
        const file: UploadFile = {
            name: `resume`,
            type: fileDetails.type,
            file: fileDetails.file,
            fileUrl: '',
            fileType: fileDetails.type,
            folder: `uploads/${userId}/docs/`
        }
        const filePath = await handleFileUpload(file)
        resume.answer = filePath
        answers[answers.indexOf(resume)] = resume
    }

    const avatar = answers?.find(answer => answer.question.includes('avatar'))
    if (avatar && avatar.answer && avatar.answer.includes('type')) {
        const fileDetails = JSON.parse(avatar.answer)
        const file: UploadFile = {
            name: `avatar`,
            type: fileDetails.type,
            file: fileDetails.file,
            fileUrl: '',
            fileType: fileDetails.type,
            folder: `uploads/${userId}/media/profile`
        }
        const filePath = await handleFileUpload(file)
        avatar.answer = filePath
        answers[answers.indexOf(avatar)] = avatar

        const editedProfile = await findProfileByUserId(userId)
        if (!editedProfile) {
            throw new NotFoundError(__filename, `Profile with User ID ${userId} can't be found`)
        }
        editedProfile.avatar = answers[answers.indexOf(avatar)].answer
        await updateProfile(userId, editedProfile)
        user.image = answers[answers.indexOf(avatar)].answer
    }
    const existingUser = mapUserFromUserEntity(user)
    existingUser.onboardingQuestions = answers
    existingUser.isOnBoarded = true
    const response = await updateUser(userId, existingUser)
    return response
}