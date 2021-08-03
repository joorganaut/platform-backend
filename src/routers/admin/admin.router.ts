import Router from 'koa-router'
import { getAccessToken, getProfile, getAssetList, getPayment, getTodaysDate, getGoogleProfile, getInstitution } from '../../controllers/admin/admin.controller'

const router = new Router({
    prefix: '/admin'
})

router.get('/:asset', getAssetList)
router.get('/institution/:id', getInstitution)
router.get('/:role/:sso/:token', getAccessToken)
router.post('/profile/:role/:sso/:token', getProfile)
router.get('/payment/amount/:amount/currency/:currency', getPayment)
router.get('/date/today', getTodaysDate)
router.post('/login/google', getGoogleProfile)

export default router