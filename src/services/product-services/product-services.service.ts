import { ProductService, ProductServiceEntity } from '../../types'
import * as repository from '../../repositories/product-services/product-services.repository'
import { mapProductServiceFromProductServiceEntity, mapProductServiceEntityFromProductService } from '../../dataMappers/product-services/product-services.mappers'



export const fetchProductService = async (ProductServiceId: string, institutionCode: string): Promise<ProductService> => {
    const entity: ProductServiceEntity = await repository.fetchProductServiceById(ProductServiceId, institutionCode)
    const result = mapProductServiceFromProductServiceEntity(entity)
    return result
}

export const fetchAllProductServices = async (institutionCode: string): Promise<ProductService[]> => {
    const ProductServiceEntities: ProductServiceEntity[] = await repository.fetchProductServices(institutionCode)
    const result = ProductServiceEntities.map(entity => mapProductServiceFromProductServiceEntity(entity))
    return result
}

// export const saveBulkProductServices = async (ProductServices: ProductService[], institutionCode: string) => {
//     const ProductServiceEntities: ProductServiceEntity[] = ProductServices?.map(ProductService => mapProductServiceEntityFromProductService(ProductService, institutionCode))
//     const { rowCount } = await repository.saveBulkProductServices(ProductServiceEntities)
//     return rowCount
// }

export const saveProductService = async (ProductService: ProductService, institutionCode: string) => {
    const ProductServiceEntity: ProductServiceEntity = mapProductServiceEntityFromProductService(ProductService, institutionCode)
    const response = await repository.createProductService(ProductServiceEntity)
    return response
}

export const updateProductService = async (ProductServiceId: string, ProductService: ProductService, institutionCode: string) => {
    const ProductServiceEntity: ProductServiceEntity = mapProductServiceEntityFromProductService(ProductService, institutionCode)
    const [db_response] = await repository.updateProductService(ProductServiceId, ProductServiceEntity, institutionCode)
    const response = mapProductServiceFromProductServiceEntity(db_response)
    return response
}

export const deleteProductService = async (ProductServiceId: string, institutionCode: string) => {
    const [db_response] = await repository.deleteProductService(ProductServiceId, institutionCode)
    const response = mapProductServiceFromProductServiceEntity(db_response)
    return response
}