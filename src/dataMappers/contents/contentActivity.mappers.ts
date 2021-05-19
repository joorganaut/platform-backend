import { ContentActivity, ContentActivityEntity } from 'types'

export const mapContentActivityFromContentActivityEntity = (entity: ContentActivityEntity): ContentActivity => {
    
    return {
        id: entity.id,
        contentId: entity.content_id,
        type: entity.type,
        typeValue: entity.type_value
    }

} 

export const mapContentActivityEntityFromContentActivity = (contentActivity: ContentActivity): ContentActivityEntity => {

    return {
        content_id: contentActivity.contentId,
        type: contentActivity.type,
        type_value: contentActivity.typeValue
    }
}