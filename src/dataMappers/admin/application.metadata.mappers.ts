import { ApplicationMetaData, ApplicationMetaDataEntity } from '../../types'


export const mapApplicationMetaDataFromApplicationMetaDataEntity = (entity: ApplicationMetaDataEntity): ApplicationMetaData => {

    return {
        id: entity.id,
        name: entity.name,
        value: entity.value as any[],
        type: entity.type,
        enabled: entity.enabled,
        expiryDate: entity.expiry_date
    }

}

export const mapApplicationMetaDataEntityFromApplicationMetaData = (applicationMetaData: ApplicationMetaData): ApplicationMetaDataEntity => {

    return {
        name: applicationMetaData.name,
        value: JSON.stringify(applicationMetaData.value),
        type: applicationMetaData.type,
        enabled: applicationMetaData.enabled,
        expiry_date: applicationMetaData.expiryDate
    }

}