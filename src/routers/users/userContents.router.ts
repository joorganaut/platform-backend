import Router from 'koa-router'
import { getAllUserContents, getUserContent, createUserContent, updateUserContent, deleteUserContent } from '../../controllers/users/userContents.controller'

const router = new Router({
    prefix: '/user-content'
})

router.get('/', getAllUserContents)
router.get('/:profileId/:userContentId', getUserContent)
router.post('/', createUserContent)

router.put('/:profileId/:userContentId', updateUserContent)
router.delete('/:profileId/:userContentId', deleteUserContent)


export default router