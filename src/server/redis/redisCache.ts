import { User, UserContent } from 'types'
import { fetchUsers } from '../../services/users/users.service'
import { fetchContents } from '../../services/contents/contents.service'
import * as RedisService from '../../services/admin/redis.service'
import { GenerateKeys } from '../../services/admin/security.service'

export const prePopulateCacheWithUsers = async () => {
    // const users: User[] = await fetchUsers()
    // users.forEach(async (x) => {
    //     await RedisService.create('users', x)
    // })

    // const test1 = await RedisService.create('users', { id: '9c95a08a-96b9-48ad-8d42-ec61c2f65fcf' })
    // console.log(JSON.stringify(test1))

    // const test = await RedisService.destroy('users', '9c95a08a-96b9-48ad-8d42-ec61c2f65fcf')
    // console.log(JSON.stringify(test))

    //const {keys} = await GenerateKeys()
}