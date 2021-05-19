import Router from 'koa-router'
import { getAllPreferences, getPreference, createPreference, updatePreference, deletePreference } from '../../controllers/users/preferences.controller'

const router = new Router({
    prefix: '/preference'
})

router.get('/', getAllPreferences)
router.get('/:profileId/:preferenceId', getPreference)
router.post('/', createPreference)


router.put('/:profileId/:preferenceId', updatePreference)
router.delete('/:profileId/:preferenceId', deletePreference)


export default router