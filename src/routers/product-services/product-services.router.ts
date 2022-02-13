import Router from 'koa-router'
import { getAllProductServices, getProductService, saveProductService, updateProductService, deleteProductService } from '../../controllers/product-services/product-services.controller'

const router = new Router({
    prefix: '/product-services'
})

router.get('/', getAllProductServices)
router.get('/:id', getProductService)
router.post('/', saveProductService)
router.put('/:id', updateProductService)
router.delete('/:id', deleteProductService)

export default router