import Router from 'koa-router'
import { getAllPartnerContents, getPartnerContent, createPartnerContent, updatePartnerContent, deletePartnerContent } from '../../controllers/partners/partnerContents.controller'

const router = new Router({
    prefix: '/partner-content'
})

router.get('/', getAllPartnerContents)
router.get('/:partnerId/:partnerContentId', getPartnerContent)
router.post('/', createPartnerContent)

router.put('/:partnerId/:partnerContentId', updatePartnerContent)
router.delete('/:partnerId/:partnerContentId', deletePartnerContent)

export default router