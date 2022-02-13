import { Context } from 'koa'
import { ProductService } from '../../types'
import * as service from '../../services/product-services/product-services.service'


export const getAllProductServices = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    const result = await service.fetchAllProductServices(institutioncode as string)
    ctx.body = result
}


export const getProductService = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    const { id } = ctx.params
    const result = await service.fetchProductService(id, institutioncode as string)
    ctx.body = result
}

export const saveProductService = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    const client = ctx.request.body
    const result: ProductService[] = await service.saveProductService(client, institutioncode as string)
    ctx.body = result
}
export const updateProductService = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    const client = ctx.request.body
    const { id } = ctx.params
    const result: ProductService = await service.updateProductService(id, client, institutioncode as string)
    ctx.body = result
}
export const deleteProductService = async (ctx: Context) => {
    const { institutioncode } = ctx.headers
    const { id } = ctx.params
    const result: ProductService = await service.deleteProductService(id, institutioncode as string)
    ctx.body = result
}

