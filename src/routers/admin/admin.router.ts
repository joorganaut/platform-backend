import Router from 'koa-router'
import { getAccessToken, getProfile, getAssetList, getGoogleProfile } from '../../controllers/admin/admin.controller'

const router = new Router({
    prefix: '/admin'
})

router.get('/:asset', getAssetList)
router.get('/:role/:sso/:token', getAccessToken)
router.get('/profile/:role/:sso/:token/:userId', getProfile)
router.post('/login/google', getGoogleProfile)

export default router