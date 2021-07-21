import Router from 'koa-router'
import { getAllUsers, getUser, createUser, updateUser, deleteUser, authenticateUser, resetPassword, changePassword } from '../../controllers/users/users.controller'

const router = new Router({
    prefix: '/user'
})

router.get('/', getAllUsers)
router.get('/:userId', getUser)
router.post('/', createUser)

router.put('/login', authenticateUser)
router.put('/reset', resetPassword)
router.put('/:userId/change', changePassword)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)


export default router