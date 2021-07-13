import Router from 'koa-router'
import { getAccessToken, getProfile, getAssetList, getPayment, getTodaysDate } from '../../controllers/admin/admin.controller'

const router = new Router({
    prefix: '/admin'
})

router.get('/:asset', getAssetList)
router.get('/:role/:sso/:token', getAccessToken)
router.get('/profile/:role/:sso/:token', getProfile)
router.get('/payment/amount/:amount/currency/:currency', getPayment)
router.get('/date/today', getTodaysDate)

export default router