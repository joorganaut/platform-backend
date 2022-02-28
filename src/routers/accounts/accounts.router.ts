import Router from 'koa-router'
import { getAllAccounts, getAccount, saveAccount, updateAccount, deleteAccount } from '../../controllers/accounts/accounts.controller'

const router = new Router({
    prefix: '/accounts'
})

router.get('/', getAllAccounts)
router.get('/:id', getAccount)
router.post('/', saveAccount)
router.put('/:id', updateAccount)
router.delete('/:id', deleteAccount)

export default router