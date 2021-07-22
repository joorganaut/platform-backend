import axios from 'axios'
import { User, Profile } from '../../types'

import { createUser } from '../users/users.service'
import * as clientServer from '../../server/socket/socket.client.server'

const linkedInBaseAuthUrl = process.env.LINKEDIN_BASE_AUTH_URL
const linkedInBaseUrl = process.env.LINKEDIN_BASE_URL
const client_id = process.env.LINKEDIN_CLIENT_ID
const client_secret = process.env.LINKEDIN_CLIENT_SECRET
const redirect_uri = process.env.LINKEDIN_REDIRECT_URL


const linkedInAccessTokenUrl = (code: string) => `/accessToken?grant_type=authorization_code&code=${code}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}/linkedin`

export const getAccessToken = async (code: string, role: string) => {
    const response = await axios.get(linkedInBaseAuthUrl + linkedInAccessTokenUrl(code) + `/${role}`)
    return response
}

export const getProfile = async (accessToken: string, institutionCode: string) => {
    const profileMethod = '/me'
    const emailMethod = '/emailAddress?q=members&projection=(elements*(handle~))'
    const imageMethod = '/me?projection=(id,profilePicture(displayImage~:playableStreams))'
    //accessToken = 'AQWNx0kcTN9Bv3LlJ19IEsn9KbAXUUMUGUFQwDbLZ5_4fVZxwdnuYyE-48XugFvenLMp_sK72BuWE7wzntEnWDQaZn6pKBdONF1APo7d8WKtgPZ-t8iG8uPYwZ7Q_49NkvvNo1-izHiRHuEAt1CRU2CBRBv4NIRgcqORU0TSm6zzLr75K09zfOc-FylzftpJHn4kjpUbQOA-xRTMOmwWvjTG-1RSvGt-PaLB3-_-OMpTH5pvdtr9JU_jg73lNoM5fLs3w8bkqAEnt1dkygHa4FoLRRivigZ8XcLLYCUEKpsi7J6F5N50b2TAkZMD7VaH1VOiKoCTq5VqpD5NTeOrCus7zPe3Og'
    const url = linkedInBaseUrl + profileMethod
    const email_url = linkedInBaseUrl + emailMethod
    const image_url = linkedInBaseUrl + imageMethod
    const response = await axios.get(url, { headers: { "Authorization": `Bearer ${accessToken}` } })
    const email_response = await axios.get(email_url, { headers: { "Authorization": `Bearer ${accessToken}` } })
    const image_response = await axios.get(image_url, { headers: { "Authorization": `Bearer ${accessToken}` } })
    const picture = image_response?.data?.profilePicture
    const user: User = {
        institutionCode: institutionCode,
        username: email_response?.data?.elements[0]['handle~']?.emailAddress,
        firstName: response?.data?.localizedFirstName,
        lastName: response?.data?.localizedLastName,
        role: 'admin',
        enabled: true,
        isOnBoarded: false,
        image: picture ? image_response?.data?.profilePicture['displayImage~']?.elements[3]?.identifiers[0]?.identifier : '',
        authType: 'sso',
        cognitoId: '',
        welcomed: false,
        ssoType: 'linkedin',
        verificationLink: '',
        accessToken: accessToken,
        signoutRequested: false,
        lastLoginDate: new Date(),
        transactionPin: '',
        isAuthenticated: true,
        forcePasswordChange: false,
        forcePinChange: true,
        numberOfFailedAttempts: 0
    }

    const newUser = await createUser(institutionCode, user)

    clientServer.set('onlineUser', { id: newUser.id })

    return { ...user, ...newUser }
}