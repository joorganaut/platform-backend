import axios from 'axios'
import { User, Profile } from '../../types'

import { createUser } from '../users/users.service'
import * as clientServer from '../../server/socket/socket.client.server'



export const getProfile = async (user: User) => {

    const picture = user.image
    const profile: Profile = {
        avatar: picture as string,
        location: '',
        bio: '',
        title: '',
        industry: '',
        userId: '',
        handler: ''
    }

    const newUser = await createUser(user, profile)

    clientServer.set('onlineUser', { id: newUser.id })

    return { ...user, ...newUser }
}