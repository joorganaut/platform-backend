import { applicationMetaDataRepository } from '../../repositories'
import { ApplicationMetaData, ApplicationMetaDataEntity, PagingParams } from '../../types'
import { mapApplicationMetaDataEntityFromApplicationMetaData, mapApplicationMetaDataFromApplicationMetaDataEntity } from '../../dataMappers/admin/application.metadata.mappers'


export const fetchAllMetaData = async (params?: PagingParams): Promise<ApplicationMetaData[]> => {
    const result = await applicationMetaDataRepository.fetchAllApplicationMetaData(params)
    if (!params) {
        return (result as ApplicationMetaDataEntity[])?.map(meta => mapApplicationMetaDataFromApplicationMetaDataEntity(meta))
    }
    return { ...result, data: result?.data?.map((meta: ApplicationMetaDataEntity) => mapApplicationMetaDataFromApplicationMetaDataEntity(meta)) }
}
