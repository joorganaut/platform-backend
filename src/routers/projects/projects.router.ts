import Router from 'koa-router'
import { getAllProjects, getProject, saveProject, updateProject, deleteProject } from '../../controllers/projects/projects.controller'

const router = new Router({
    prefix: '/projects'
})

router.get('/', getAllProjects)
router.get('/:id', getProject)
router.post('/', saveProject)
router.put('/:id', updateProject)
router.delete('/:id', deleteProject)

export default router