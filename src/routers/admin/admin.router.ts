import Router from 'koa-router'
import { getAccessToken, getProfile, getAssetList } from '../../controllers/admin/admin.controller'

const router = new Router({
    prefix: '/admin'
})

router.get('/:asset', getAssetList)
router.get('/:role/:sso/:token', getAccessToken)
router.get('/profile/:role/:sso/:token', getProfile)

export default router