//https://slack.com/api/oauth.v2.access?client_id=CLIENT_ID&client_secret=CLIENT_SECRET&code=XXYYZZ

import axios from 'axios'
import { BadRequestError } from '../../lib'
import { User, Profile } from 'types'

import { createUser } from '../users/users.service'

const slackBaseAuthUrl = process.env.SLACK_BASE_AUTH_URL
const slackBaseUrl = process.env.SLACK_BASE_URL
const client_id = process.env.SLACK_CLIENT_ID
const client_secret = process.env.SLACK_CLIENT_SECRET
const redirect_uri = process.env.SLACK_REDIRECT_URL


const slackAccessTokenUrl = (code: string) => `client_id=${client_id}&client_secret=${client_secret}&code=${code}&redirect_uri=${redirect_uri}/slack`

export const getAccessToken = async (code: string, role: string) => {
    const response = await axios.get(slackBaseAuthUrl + slackAccessTokenUrl(code) + `/${role}`)
    return response
}

export const getProfile = async (accessToken: string, role: string) => {
    if (!accessToken) {
        throw new BadRequestError(__filename, `Invalid access token`)
    }

    const response = await axios.get(slackBaseUrl as string, { headers: { "Authorization": `Bearer ${accessToken}` } })

    const picture = response?.data?.user?.image_1024
    const firstName = response?.data?.user?.name?.split(' ')[0]
    const lastName = response?.data?.user?.name?.split(' ')[1]
    const user: User = {
        username: response?.data?.user?.email,
        firstName: firstName,
        lastName: lastName,
        role: role,
        enabled: true,
        isOnBoarded: false,
        image: picture ? picture : '',
        authType: 'sso',
        cognitoId: '',
        welcomed: false,
        ssoType: 'slack',
        verificationLink: '',
        accessToken: accessToken
    }
    const profile: Profile = {
        avatar: picture ? picture : '',
        location: '',
        bio: '',
        title: '',
        industry: '',
        userId: '',
        handler: ''
    }

    const newUser = await createUser(user, profile)

    return { ...user, ...newUser }
}