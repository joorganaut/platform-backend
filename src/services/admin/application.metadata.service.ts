import { applicationMetaDataRepository } from '../../repositories'
import { ApplicationMetaData, ApplicationMetaDataEntity, PagingParams } from '../../types'
import { mapApplicationMetaDataEntityFromApplicationMetaData, mapApplicationMetaDataFromApplicationMetaDataEntity } from '../../dataMappers/admin/application.metadata.mappers'
import { NotFoundError } from '../../lib'


export const fetchAllMetaData = async (params?: PagingParams): Promise<ApplicationMetaData[]> => {
    const result = await applicationMetaDataRepository.fetchAllApplicationMetaData(params)
    if (!params) {
        return (result as ApplicationMetaDataEntity[])?.map(meta => mapApplicationMetaDataFromApplicationMetaDataEntity(meta))
    }
    return { ...result, data: result?.data?.map((meta: ApplicationMetaDataEntity) => mapApplicationMetaDataFromApplicationMetaDataEntity(meta)) }
}

export const findMetaDataById = async (applicationMetaDataId: string): Promise<ApplicationMetaData> => {
    const appMetaData: ApplicationMetaDataEntity = await applicationMetaDataRepository.fetchApplicationMetaDataById(applicationMetaDataId)

    if (!appMetaData) {
        throw new NotFoundError(__filename, `Application Meta Data ID ${applicationMetaDataId} does not exist`)
    }
    return mapApplicationMetaDataFromApplicationMetaDataEntity(appMetaData)
}

export const findMetaDataByName = async (name: string): Promise<ApplicationMetaData | null> => {
    const applicationMetaData = await applicationMetaDataRepository.fetchApplicationMetaDataByName(name)
    if (!applicationMetaData) {
        return null
    }
    return mapApplicationMetaDataFromApplicationMetaDataEntity(applicationMetaData)
}

export const createMetaData = async (applicationMetaData: ApplicationMetaData): Promise<ApplicationMetaData> => {

    const appMetaDataEntity = mapApplicationMetaDataEntityFromApplicationMetaData(applicationMetaData)
    const [db_response] = await applicationMetaDataRepository.createApplicationMetaData(appMetaDataEntity)

    return mapApplicationMetaDataFromApplicationMetaDataEntity(db_response)
}

export const updateMetaData = async (applicationMetaDataId: string, applicationMetaData: ApplicationMetaData): Promise<ApplicationMetaData> => {
    const applicationMetaDataEntity = mapApplicationMetaDataEntityFromApplicationMetaData(applicationMetaData)
    const [db_response] = await applicationMetaDataRepository.updateApplicationMetaData(applicationMetaDataId, applicationMetaDataEntity)
    return mapApplicationMetaDataFromApplicationMetaDataEntity(db_response)
}

export const deleteMetaData = async (applicationMetaDataId: string): Promise<ApplicationMetaData> => {
    const [db_response] = await applicationMetaDataRepository.deleteApplicationMetaData(applicationMetaDataId)
    return mapApplicationMetaDataFromApplicationMetaDataEntity(db_response)
}