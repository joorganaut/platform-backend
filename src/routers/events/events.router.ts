import Router from 'koa-router'
import { updateContent } from 'repositories/contents/contents.repository'
import { getAllEvents, getEvent, createEvent, updateEvent, deleteEvent } from '../../controllers/events/events.controller'

const router = new Router ({
    prefix: '/event'
})

router.get('/', getAllEvents)
router.get('/:eventId', getEvent)
router.post('/:userId?', createEvent)

router.put('/:eventId', updateEvent)
router.delete('/:eventId', deleteEvent)

export default router