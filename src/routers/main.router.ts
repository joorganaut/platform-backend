import { Context } from 'koa'
import Router from 'koa-router'
import fs from 'fs'

import AdminRouter from './admin/admin.router'
import UserRouter from './users/users.router'
import EventRouter from './events/events.router'
import ContentRouter from './contents/contents.router'
import PartnerRouter from './partners/partners.router'
import PartnerContentsRouter from './partners/partnerContents.router'
import ProfileRouter from './users/profiles.router'
import PartnerUserRouter from './partners/partnerUsers.router'
import UserContentRouter from './users/userContents.router'
import PreferenceRouter from './users/preferences.router'
import PartnerEventRouter from './partners/partnerEvents.router'
import EventAttendeeRouter from './events/eventAttendees.router'
import ContentActivityRouter from './contents/contentActivity.router'
import { authMiddleware } from '../middleware'




const router = new Router({
    prefix: '/v1'
})

router.get('/', (ctx: Context) => {
    ctx.body = {
        message: 'WORKING'
    }
})

router.get('/health', (ctx: Context) => {
    ctx.body = {
        message: 'HEALTHY'
    }
})

router.get('/version', (ctx: Context) => {
    const version = fs.readFileSync(__dirname + '/version.txt', 'utf-8')

    ctx.body = {
        message: 'HEALTHY',
        version
    }
})

router
    .use(authMiddleware)
    .use(AdminRouter.routes())
    .use(AdminRouter.allowedMethods())
    .use(UserRouter.routes())
    .use(UserRouter.allowedMethods())
    .use(EventRouter.routes())
    .use(EventRouter.allowedMethods())
    .use(ContentRouter.routes())
    .use(ContentRouter.allowedMethods())
    .use(PartnerRouter.routes())
    .use(PartnerRouter.allowedMethods())
    .use(PartnerContentsRouter.routes())
    .use(PartnerContentsRouter.allowedMethods())
    .use(ProfileRouter.routes())
    .use(ProfileRouter.allowedMethods())
    .use(PartnerUserRouter.routes())
    .use(PartnerUserRouter.allowedMethods())
    .use(UserContentRouter.routes())
    .use(UserContentRouter.allowedMethods())
    .use(PreferenceRouter.routes())
    .use(PreferenceRouter.allowedMethods())
    .use(PartnerEventRouter.routes())
    .use(PartnerEventRouter.allowedMethods())
    .use(EventAttendeeRouter.routes())
    .use(EventAttendeeRouter.allowedMethods())
    .use(ContentActivityRouter.routes())
    .use(ContentActivityRouter.allowedMethods())


export default router
