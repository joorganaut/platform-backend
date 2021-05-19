import Router from 'koa-router'
import { getAllEventAttendees, getEventAttendee, createEventAttendee, updateEventAttendee, deleteEventAttendee } from '../../controllers/events/eventAttendees.controller'

const router = new Router({
    prefix: '/event-attendee'
})

router.get('/', getAllEventAttendees)
router.get('/:eventId/:eventAttendeeId', getEventAttendee)
router.post('/:userId', createEventAttendee)

router.put('/:eventId/:eventAttendeeId', updateEventAttendee)
router.delete('/:eventId/:eventAttendeeId', deleteEventAttendee)


export default router