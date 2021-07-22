import { User, Profile } from '../../types'

import { createUser } from '../users/users.service'
import * as clientServer from '../../server/socket/socket.client.server'



export const getProfile = async (institutionCode: string, user: User) => {

    const picture = user.image

    const newUser = await createUser(institutionCode, user)

    clientServer.set('onlineUser', { id: newUser.id })

    return { ...user, ...newUser }
}