import Router from 'koa-router'
import { getAllProfiles, getProfile, createProfile, updateProfile, deleteProfile } from '../../controllers/users/profiles.controller'

const router = new Router({
    prefix: '/profile'
})

router.get('/', getAllProfiles)
router.get('/:userId', getProfile)
router.post('/:userId', createProfile)
router.put('/:userId', updateProfile)
router.delete('/:userId', deleteProfile)

export default router