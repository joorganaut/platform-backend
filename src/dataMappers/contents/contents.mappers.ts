import { Content, ContentEntity} from '../../types'

export const mapContentFromContentEntity = (entity: ContentEntity): Content => {

    return {
        id: entity.id,
        status: entity.status,
        type: entity.type,
        title: entity.title,
        content: entity.content,
        media: entity.media,
        flagged: entity.flagged,
        reports:  entity.reports
    }
}

export const mapContentEntityFromContent = (content: Content): ContentEntity => {

    return {
        status: content.status,
        type: content.type,
        title: content.title,
        content: content.content,
        media: content.media,
        flagged: content.flagged,
        reports:  content.reports
    }
}