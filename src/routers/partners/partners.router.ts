import Router from 'koa-router'
import { getAllPartners, getPartner, createPartner, updatePartner, deletePartner } from '../../controllers/partners/partners.controller'

const router = new Router({
    prefix: '/partner'
})

router.get('/', getAllPartners)
router.get('/:partnerId', getPartner)
router.post('/', createPartner)

router.put('/:partnerId', updatePartner)
router.delete('/:partnerId', deletePartner)

export default router