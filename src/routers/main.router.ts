import { Context } from 'koa'
import Router from 'koa-router'
import fs from 'fs'

import AdminRouter from './admin/admin.router'
import UserRouter from './users/users.router'
import ProfileRouter from './users/profiles.router'
import UserContentRouter from './users/userContents.router'
import PreferenceRouter from './users/preferences.router'
import ApplicationMetaDataRouter from './admin/application.metadata.router'
import OnboardingQuestionRouter from './admin/onboarding.question.router'
import MessageRouter from './messages/messages.router'
import ContactsRouter from './contacts/contacts.router'
import ProductServiceRouter from './product-services/product-services.router'
import ProjectsRouter from './projects/projects.router'
import NotesRouter from './notes/notes.router'
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
    .use(ProfileRouter.routes())
    .use(ProfileRouter.allowedMethods())
    .use(UserContentRouter.routes())
    .use(UserContentRouter.allowedMethods())
    .use(PreferenceRouter.routes())
    .use(PreferenceRouter.allowedMethods())
    .use(ApplicationMetaDataRouter.routes())
    .use(ApplicationMetaDataRouter.allowedMethods())
    .use(OnboardingQuestionRouter.routes())
    .use(OnboardingQuestionRouter.allowedMethods())
    .use(MessageRouter.routes())
    .use(MessageRouter.allowedMethods())
    .use(ContactsRouter.routes())
    .use(ContactsRouter.allowedMethods())
    .use(ProductServiceRouter.routes())
    .use(ProductServiceRouter.allowedMethods())
    .use(ProjectsRouter.routes())
    .use(ProjectsRouter.allowedMethods())
    .use(NotesRouter.routes())
    .use(NotesRouter.allowedMethods())

export default router
