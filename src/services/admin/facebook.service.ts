//https://slack.com/api/oauth.v2.access?client_id=CLIENT_ID&client_secret=CLIENT_SECRET&code=XXYYZZ

import axios from 'axios'
import { BadRequestError } from '../../lib'
import { User, Profile } from 'types'

import { createUser } from '../users/users.service'

const slackBaseAuthUrl = process.env.FACEBOOK_BASE_AUTH_URL
const slackBaseUrl = process.env.FACEBOOK_BASE_URL
const client_id = process.env.FACEBOOK_CLIENT_ID
const client_secret = process.env.FACEBOOK_CLIENT_SECRET
const redirect_uri = process.env.FACEBOOK_REDIRECT_URL


const slackAccessTokenUrl = (code: string) => `client_id=${client_id}&client_secret=${client_secret}&code=${code}&redirect_uri=${redirect_uri}/facebook`

export const getAccessToken = async (code: string, role: string) => {
    const response = await axios.get(slackBaseAuthUrl + slackAccessTokenUrl(code) + `/${role}`)
    return response
}

export const getProfile = async (accessToken: string, institutionCode: string) => {
    if (!accessToken) {
        throw new BadRequestError(__filename, `Invalid access token`)
    }

    const response = await axios.get(`${slackBaseUrl}/me?fields=first_name,last_name,email,name,gender,location,picture&access_token=${accessToken}`, { headers: { "Authorization": `Bearer ${accessToken}` } })


    const picture = response?.data?.picture?.data?.url
    const firstName = response?.data?.first_name
    const lastName = response?.data?.last_name
    const user: User = {
        institutionCode: institutionCode,
        username: response?.data?.email,
        firstName: firstName,
        lastName: lastName,
        role: 'admin',
        enabled: true,
        isOnBoarded: false,
        image: picture ? picture : '',
        authType: 'sso',
        cognitoId: '',
        welcomed: false,
        ssoType: 'slack',
        verificationLink: '',
        accessToken: accessToken,
        lastLoginDate: new Date(),
        signoutRequested: false,
        transactionPin: '',
        isAuthenticated: true,
        forcePasswordChange: false,
        forcePinChange: true,
        numberOfFailedAttempts: 0
    }


    const newUser = await createUser(institutionCode, user)

    return { ...user, ...newUser }
}