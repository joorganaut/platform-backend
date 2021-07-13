import { Institution, InstitutionEntity, PagingParams } from "../../types"
import * as InstitutionsRepository from '../../repositories/admin/institution.repository'
import { NotFoundError } from "../../lib/errors"
import { mapInstitutionFromInstitutionEntity, mapInstitutionEntityFromInstitution } from '../../dataMappers/admin/institutions.mappers'



export const fetchInstitutions = async (params?: PagingParams): Promise<Institution[] | any> => {
    const result = await InstitutionsRepository.fetchInstitutions(params)
    if (!params) {
        return (result as InstitutionEntity[])?.map(Institution => mapInstitutionFromInstitutionEntity(Institution))
    }
    return { ...result, data: result?.data?.map((Institution: InstitutionEntity) => mapInstitutionFromInstitutionEntity(Institution)) }
}

export const findInstitutionById = async (InstitutionId: string): Promise<Institution> => {

    const Institution: InstitutionEntity = await InstitutionsRepository.fetchInstitutionById(InstitutionId)

    if (!Institution) {
        throw new NotFoundError(__filename, `Institution ID ${InstitutionId} does not exist`)
    }

    const response = mapInstitutionFromInstitutionEntity(Institution)
    return response
}

export const findInstitutionByEmail = async (email: string): Promise<Institution | null> => {
    const Institution = await InstitutionsRepository.fetchInstitutionByEmail(email)
    if (!Institution) {
        return null
    }
    const response = mapInstitutionFromInstitutionEntity(Institution)
    return response
}