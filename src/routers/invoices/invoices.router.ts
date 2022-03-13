import Router from 'koa-router'
import { getAllInvoices, getInvoice, saveInvoice, updateInvoice, deleteInvoice } from '../../controllers/invoices/invoices.controller'

const router = new Router({
    prefix: '/invoices'
})

router.get('/', getAllInvoices)
router.get('/:id', getInvoice)
router.post('/', saveInvoice)
router.put('/:id', updateInvoice)
router.delete('/:id', deleteInvoice)

export default router