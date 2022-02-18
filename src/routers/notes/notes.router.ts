import Router from 'koa-router'
import { getAllNotes, getNote, saveNote, updateNote, deleteNote } from '../../controllers/notes/notes.controller'

const router = new Router({
    prefix: '/notes'
})

router.get('/', getAllNotes)
router.get('/:id', getNote)
router.post('/', saveNote)
router.put('/:id', updateNote)
router.delete('/:id', deleteNote)

export default router