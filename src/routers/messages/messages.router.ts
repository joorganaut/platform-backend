import Router from 'koa-router'
import { createMessage, updateMessage, deleteMessage, getMessagesByReceiver, getMessagesBySender, deleteConversation } from '../../controllers/messages/messages.controller'

const router = new Router ({
    prefix: '/message'
})

router.get('/:receiverId/received', getMessagesByReceiver)
router.get('/:senderId/sent', getMessagesBySender)
router.post('/:senderId/:receiverId', createMessage)

router.put('/:messageId', updateMessage)
router.delete('/:messageId', deleteMessage)
router.delete('/:senderId/:receiverId', deleteConversation)

export default router