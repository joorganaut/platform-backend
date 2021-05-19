import { ContentActivity, ContentActivityEntity, Content } from "types"
import * as contentActivityRepository from '../../repositories/contents/contentActivity.repository'
import { mapContentActivityFromContentActivityEntity, mapContentActivityEntityFromContentActivity } from '../../dataMappers/contents/contentActivity.mappers'
import { NotFoundError } from '../../lib'

import { createContent, findContentByID, updateContent, deleteContent } from '../contents/contents.service'

export const fetchContentActivityById = async (contentId: string, activityId: string): Promise<ContentActivity> => {
    const contentActivity: ContentActivityEntity = await contentActivityRepository.fetchContentActivityById(contentId, activityId)

    if (!contentActivity) {
        throw new NotFoundError(__filename, `Content Activity ID ${activityId} does not exist`)
    }

    return mapContentActivityFromContentActivityEntity(contentActivity)
}

export const findContentActivityByContentId = async (contentId: string): Promise<ContentActivity | null> => {
    const contentActivity = await contentActivityRepository.fetchContentActivityByContentId(contentId)
    if (!contentActivity) {
        return null
    }
    return mapContentActivityFromContentActivityEntity(contentActivity)
}

export const fetchReactionCount = async (contentId: string): Promise<any[]> => {
    const contentActivities: ContentActivityEntity[] = await contentActivityRepository.fetchReactions(contentId)
    const hashMap: { [activity: string]: number} = {}

    // if that typeVaule exists
    for (let contentActivity of contentActivities) {
        if(contentActivity.type_value in hashMap) {

            //up the prev count
            hashMap[contentActivity.type_value] = hashMap[contentActivity.type_value] + 1

        } else {
            hashMap[contentActivity.type_value] = 1;
        }
    }
    
    //now iterate through those keys of the Map and format it for countArray

    const countArray: object[] =  []
    Object.keys(hashMap).forEach(key => {
        countArray.push({reaction: key, count: hashMap[key]})
    })

    return countArray
}

export const createContentActivity =  async (contentActivity: ContentActivity, userId: string): Promise<ContentActivity> => {
    const contentActivityEntity = mapContentActivityEntityFromContentActivity(contentActivity)

    const [db_response] = await contentActivityRepository.createContentActivity(contentActivityEntity)
    return mapContentActivityFromContentActivityEntity(db_response)
}

export const updateContentActivity = async (contentId: string, activityId: string, contentAcitvity: ContentActivity): Promise<ContentActivity> => {
    const contentActivityEntity = mapContentActivityEntityFromContentActivity(contentAcitvity)
    const [db_response] = await contentActivityRepository.updateContentActivity(activityId, contentActivityEntity, contentId)
    return mapContentActivityFromContentActivityEntity(db_response)
}


export const deleteContentActivity = async (contentId: string, activityId: string): Promise<ContentActivity> => {
    const [db_response] = await contentActivityRepository.deleteContentActivity(activityId, contentId)
    return mapContentActivityFromContentActivityEntity(db_response)
}


    /*------ Comment Methods  ------*/

export const fetchCommentById = async (contentId: string, commentId:string): Promise<ContentActivity> => {
    const comment: ContentActivityEntity = await contentActivityRepository.fetchContentActivityById(contentId, commentId)

    if (!comment) {
        throw new NotFoundError(__filename, `Content Activity ID ${commentId} does not exist`)
    }

    return mapContentActivityFromContentActivityEntity(comment)
}

export const createComment = async (comment: ContentActivity, userId: string): Promise<ContentActivity> => {
    const commentEntity = mapContentActivityEntityFromContentActivity(comment)

    const newContent: Content = {
        status: 'value1',
        type: 'comment',
        content: comment.typeValue,
        media: '',
        title: '',
        flagged: false,
        reports: []
    }
    const [db_response] = await contentActivityRepository.createContentActivity(commentEntity)
    const new_Content = await createContent(newContent, userId)

    return mapContentActivityFromContentActivityEntity(db_response)
}

export const updateComment = async (commentId: string, userId: string, comment: ContentActivity, contentId: string): Promise<ContentActivity> => {
    const commentContent =  await findContentByID(contentId)
    commentContent.content = comment.typeValue

    const contentActivityEntity = mapContentActivityEntityFromContentActivity(comment)
    const [db_response] = await contentActivityRepository.updateContentActivity(commentId, contentActivityEntity)
    await updateContent(contentId, userId, commentContent)
    
    return mapContentActivityFromContentActivityEntity(db_response)
}

export const deleteComment = async (commentId: string, userId: string, contentId: string): Promise<ContentActivity> => {

    const [db_response] = await contentActivityRepository.deleteContentActivity(commentId, contentId)
    await deleteContent(contentId, userId)

    return mapContentActivityFromContentActivityEntity(db_response)

}

    /*------ Reaction Methods ------*/

export const createReaction = async (reaction: ContentActivity): Promise<ContentActivity> => {
    const contentReactionEntity = mapContentActivityEntityFromContentActivity(reaction)
    const [db_response] = await contentActivityRepository.createContentActivity(contentReactionEntity)

    return mapContentActivityFromContentActivityEntity(db_response)
}

export const updateReaction = async (contentId: string, reactionId: string, reaction: ContentActivity): Promise<ContentActivity> => {
    const contentActivityEntity = mapContentActivityEntityFromContentActivity(reaction)
    const [db_response] = await contentActivityRepository.updateContentActivity(reactionId, contentActivityEntity, contentId)
    return mapContentActivityFromContentActivityEntity(db_response)
}

export const deleteReaction = async (contentId: string, reactionId: string): Promise<ContentActivity> => {
    const [db_response] = await contentActivityRepository.deleteContentActivity(reactionId, contentId)
    return mapContentActivityFromContentActivityEntity(db_response)
}