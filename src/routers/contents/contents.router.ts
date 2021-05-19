import Router from 'koa-router'
import { getAllContents, getContent, createContent, updateContent, deleteContent, reportContent } from '../../controllers/contents/contents.controller'

const router = new Router ({
    prefix: '/content'
})

router.get('/', getAllContents)
router.get('/:contentId', getContent)
router.post('/:userId', createContent)

router.put('/:userId/:contentId', updateContent)
router.put('/:contentId', reportContent)
router.delete('/:userId/:contentId', deleteContent)


export default router