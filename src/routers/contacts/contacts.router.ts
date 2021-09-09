import Router from 'koa-router'
import { getContacts, getAllContacts, saveBulkContacts, getContact, saveContact, updateContact, deleteContact } from '../../controllers/contacts/contacts.controller'

const router = new Router({
    prefix: '/contacts'
})

router.get('/', getAllContacts)
router.get('/:id', getContact)
router.get('/:source/:key', getContacts)
router.post('/bulk', saveBulkContacts)
router.post('/', saveContact)
router.put('/:id', updateContact)
router.delete('/:id', deleteContact)

export default router