import Router from 'koa-router'
import { getAllMetaData, getMetaData, createMetaData, updateMetaData, deleteMetaData } from '../../controllers/admin/application.metadata.controller'

const router = new Router({
    prefix: '/application-metadata'
})

router.get('/', getAllMetaData)
router.get('/:applicationMetaDataId', getMetaData)
router.post('/', createMetaData)

router.put('/:applicationMetaDataId', updateMetaData)
router.delete('/:applicationMetaDataId', deleteMetaData)

export default router