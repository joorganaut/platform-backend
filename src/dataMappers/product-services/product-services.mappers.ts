import { ProductService, ProductServiceEntity } from '../../types'

/*
export interface ProductService extends BusinessObject {
    name: string
    businessName: string
    email: string
    phone: string
    address: string
}

export interface ProductServiceEntity extends Entity {
    name: string
    business_name: string
    email: string
    phone: string
    address: string
}
*/

export const mapProductServiceFromProductServiceEntity = (entity: ProductServiceEntity): ProductService => {

    return {
        id: entity.id,
        image: entity.image,
        tags: entity.tags,
        description: entity.description,
        active: entity.active,
        taxable: entity.taxable,
        name: entity.name,
        category: entity.category,
        cost: entity.cost,
        currency: entity.currency,
        institutionCode: entity.institution_code,
    }
}

export const mapProductServiceEntityFromProductService = (ProductService: ProductService, institutionCode: string): ProductServiceEntity => {

    return {
        image: ProductService.image,
        tags: ProductService.tags,
        description: ProductService.description,
        active: ProductService.active,
        taxable: ProductService.taxable,
        name: ProductService.name,
        category: ProductService.category,
        cost: ProductService.cost,
        currency: ProductService.currency,
        institution_code: institutionCode,
    }
}