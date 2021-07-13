import { AWSError, SES } from 'aws-sdk'
import fs from 'fs'
import path from 'path'
import { User } from 'types'

const ses = new SES({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
})

const url = process.env.UI_URL as string

export const getEmailTemplate = async (user: User, templateName: 'welcome' | 'passwordReset' | 'emailVerification' | 'invitation' | 'tickets' | 'claimTicket' | 'summitTickets' | 'completeProfile') => {
    switch (templateName) {
        case 'welcome': {
            const file = user.role === "Member" ? fs.readFileSync(path.resolve('src/services/admin/emailTemplates/welcome-member.html')).toString('utf8') :
                fs.readFileSync(path.resolve('src/services/admin/emailTemplates/welcome-partner.html')).toString('utf8')
            return file.replace('{firstName}', user.firstName).replace('./assets', `${url}assets/email/images`)
        }
        case 'passwordReset': {
            const file = await fs.readFileSync(path.resolve('src/services/admin/emailTemplates/passwordReset.html')).toString('utf8')
            return file.replace('{firstName}', user.firstName).replace('./assets', `${url}assets/email/images`)
        }
        case 'emailVerification': {
            const file = await fs.readFileSync(path.resolve('src/services/admin/emailTemplates/emailVerification.html')).toString('utf8')
            return file.replace('{firstName}', user.firstName).replace('./assets', `${url}assets/email/images`)
        }
        case 'invitation': {
            const file = await fs.readFileSync(path.resolve('src/services/admin/emailTemplates/invitation.html')).toString('utf8')
            return file.replace('{firstName}', user.firstName).replace('./assets', `${url}assets/email/images`)
        }
        case 'tickets': {
            const file = await fs.readFileSync(path.resolve('src/services/admin/emailTemplates/ticketDetails.html')).toString('utf8')
            return file.replace('{firstName}', user.firstName).replace('./assets', `${url}assets/email/images`)
        }
        case 'claimTicket': {
            const file = await fs.readFileSync(path.resolve('src/services/admin/emailTemplates/ticketClaim.html')).toString('utf8')
            return file.replace('{firstName}', user.firstName).replace('./assets', `${url}assets/email/images`)
        }
        case 'summitTickets': {
            const file = await fs.readFileSync(path.resolve('src/services/admin/emailTemplates/summitTickets.html')).toString('utf8')
            return file.replace('{firstName}', user.firstName).replace('./assets', `${url}assets/email/images`)
        }
        case 'completeProfile': {
            const file = await fs.readFileSync(path.resolve('src/services/admin/emailTemplates/completeProfile.html')).toString('utf8')
            return file.replace('{firstName}', user.firstName).replace('./assets', `${url}assets/email/images`)
        }
    }
}

export const sendEmail = async (
    destinationAddresses: string[],
    subjectText?: string,
    bodyText?: string
): Promise<string> => {
    const params: SES.Types.SendEmailRequest = {
        Destination: {
            ToAddresses: destinationAddresses
        },
        Message: {
            Body: {
                Html: {
                    Data: bodyText || `<h1>Hello World</h1>`
                }
            },
            Subject: {
                Data: subjectText || `Hi`
            }
        },
        Source: `Obsidi By BPTN <${process.env.CLIENT_INVITE_SOURCE_ADDRESS}>`
    }

    return new Promise((resolve, reject) => {
        ses.sendEmail(params, (err: AWSError, data: SES.Types.SendEmailResponse) => {
            if (err) reject(err)

            resolve(data?.MessageId)
        })
    })
}