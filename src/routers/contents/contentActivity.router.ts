import Router from 'koa-router'
import {
    getContentActivity,
    createContentActivity,
    updateContentActivity,
    deleteContentActivity,
    getComment,
    createComment,
    updateComment,
    deleteComment,
    createReaction,
    updateReaction,
    deleteReaction,
    getReactionCount
} from '../../controllers/contents/contentActivity.controller'

const router = new Router({
    prefix: '/content-activity'
})

router.get('/:contentId/:activityId', getContentActivity)
router.post('/:userId', createContentActivity)
router.put('/:contentId/:activityId', updateContentActivity)
router.delete('/:contentId/:activityId', deleteContentActivity)

/*------ Comment Routes ------*/
router.get('/comment/:contentId/:commentId', getComment)
router.post('/comment/:userId', createComment)
router.put('/comment/:userId/:contentId/:commentId', updateComment)
router.delete('/comment/:userId/:contentId/:commentId', deleteComment)

/*------ Reaction Routes ------*/
router.get('/:contentId', getReactionCount)
router.post('/reaction/:userId', createReaction)
router.put('/reaction/:contentId/:reactionId', updateReaction)
router.delete('/reaction/:contentId/:reactionId', deleteReaction)

export default router