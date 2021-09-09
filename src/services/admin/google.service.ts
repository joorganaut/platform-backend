import { User, Profile, Contact } from '../../types'

import { createUser } from '../users/users.service'
import * as clientServer from '../../server/socket/socket.client.server'
import axios from 'axios'



export const getProfile = async (institutionCode: string, user: User) => {
    const newUser = await createUser(institutionCode, user)
    clientServer.set('onlineUser', { id: newUser.id })
    return { ...user, ...newUser }
}

export const getContacts = async (accessToken: string) => {
    const result = []
    const contacts_url = 'https://people.googleapis.com/v1/people/me/connections?pageSize=2000&personFields=emailAddresses,names,phoneNumbers&access_token=' + accessToken
    let response = await axios.get(contacts_url)
    result.push(...response.data?.connections?.map((x: any) => {
        const client: Contact = {
            id: x?.resourceName ? x.resourceName : x.etag,
            name: x?.names ? x.names[0].displayName : '',
            email: x?.emailAddresses ? x.emailAddresses[0].value : '',
            phone: x?.phoneNumbers ? x.phoneNumbers[0].value : '',
            workPhone: x?.phoneNumbers && x.phoneNumbers?.length > 1 ? x.phoneNumbers[1].value : ''
        }
        return client
    }))
    while (response.data?.nextPageToken) {
        response = await axios.get(contacts_url + `&pageToken=${response.data?.nextPageToken}`)
        result.push(...response.data?.connections?.map((x: any) => {
            const client: Contact = {
                id: x?.resourceName ? x.resourceName : x.etag,
                name: x?.names ? x.names[0].displayName : '',
                email: x?.emailAddresses ? x.emailAddresses[0].value : '',
                phone: x?.phoneNumbers ? x.phoneNumbers[0].value : '',
                workPhone: x?.phoneNumbers && x.phoneNumbers?.length > 1 ? x.phoneNumbers[1].value : ''
            }
            return client
        }))
    }
    return result
}