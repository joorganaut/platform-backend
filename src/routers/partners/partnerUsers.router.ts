import Router from 'koa-router'
import { getAllPartnerUsers, getPartnerUser, createPartnerUser, updatePartnerUser, deletePartnerUser } from '../../controllers/partners/partnerUsers.controller'

const router = new Router({
    prefix: '/partner-user'
})

router.get('/', getAllPartnerUsers)
router.get('/:partnerId/:partnerUserId', getPartnerUser)
router.post('/', createPartnerUser)

router.put('/:partnerId/:partnerUserId', updatePartnerUser)
router.delete('/:partnerId/:partnerUserId', deletePartnerUser)


export default router