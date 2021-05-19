import Router from 'koa-router'
import { getAllPartnerEvents, getPartnerEvent, createPartnerEvent, updatePartnerEvent, deletePartnerEvent } from '../../controllers/partners/partnerEvents.controller'

const router = new Router({
    prefix: '/partner-event'
})

router.get('/', getAllPartnerEvents)
router.get('/:partnerId/:partnerEventId', getPartnerEvent)
router.post('/', createPartnerEvent)

router.put('/:partnerId/:partnerEventId', updatePartnerEvent)
router.delete('/:partnerId/:partnerEventId', deletePartnerEvent)


export default router