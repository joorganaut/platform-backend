import { Calendar, MailMessage, MailMessageStatus, Template } from '../../types'
import * as nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'
import ical from 'ical-generator'
import { BadRequestError } from '../../lib'


const testMail: MailMessage = {
    from: "info@hagorra.com <messages-noreply@hagorra.com>",
    fromName: 'Hagorra',
    toName: '',
    to: ["osazee.hagorra@gmail.com"],
    subject: "Hello from Hagorra",
    html: "<div style=\"display:flex;flex-direction:column;text-align:center;padding: 1em; margin: 1em;background-color: #F5F5F5; width: auto; height: auto; display: flex; justify-content: center; align-items: center;\"><h1>Welcome to Hagorra,</h1><span>Hello Fin</span></div>",
    status: MailMessageStatus.pending
}


const transporter = nodemailer.createTransport({
    host: 'mail.hagorra.com',
    port: 465,
    secure: true,
    //requireTLS: true,
    auth: {
        user: "messages-noreply@hagorra.com",
        pass: "$Victory12"
    },
    tls: {
        rejectUnauthorized: false,
    },
})


export const getEmailTemplate = async (userFirstName: string, templateName: Template) => {
    switch (templateName) {
        case 'welcome': {
            const file = fs.readFileSync(path.resolve('src/services/messaging/mail-templates/welcome.html')).toString('utf8')
            return file.replace('{firstName}', userFirstName)
        }
        case 'passwordReset': {
            const file = await fs.readFileSync(path.resolve('src/services/admin/emailTemplates/passwordReset.html')).toString('utf8')
            return file.replace('{firstName}', userFirstName)
        }
        case 'emailVerification': {
            const file = await fs.readFileSync(path.resolve('src/services/admin/emailTemplates/emailVerification.html')).toString('utf8')
            return file.replace('{firstName}', userFirstName)
        }
        case 'invitation': {
            const file = await fs.readFileSync(path.resolve('src/services/admin/emailTemplates/invitation.html')).toString('utf8')
            return file.replace('{firstName}', userFirstName)
        }
        case 'codeVerification': {
            const file = await fs.readFileSync(path.resolve('src/services/admin/emailTemplates/codeVerification.html')).toString('utf8')
            return file.replace('{firstName}', userFirstName)
        }
    }
}


export const sendMail = async (mail: MailMessage, template: Template, calendar?: Calendar): Promise<void> => {
    if (calendar) {
        const cal = createCalendar({
            startTime: calendar?.startTime,
            endTime: calendar?.endTime,
            summary: calendar?.summary,
            description: calendar?.description,
            location: calendar?.location,
            url: calendar?.url,
            name: calendar?.name,
            email: calendar?.email
        })
        let alternatives = {
            "Content-Type": "text/calendar",
            "method": "REQUEST",
            "content": Buffer.from(cal.toString()),
            "component": "VEVENT",
            "Content-Class": "urn:content-classes:calendarmessage"
        }
        mail['alternatives'] = alternatives;
        mail['alternatives']['contentType'] = 'text/calendar'
        mail['alternatives']['content']
            = Buffer.from(cal.toString())
    }
    mail.html = await getEmailTemplate(mail.toName as string, template)
    transporter.sendMail(mail, (error, info) => {
        if (error) {
            throw new BadRequestError(__filename, `Unable to send email ${error}`)
        }
    })
}


export const createCalendar = (calendar: Calendar) => {
    const cal = ical({
        name: calendar.name as string
    })
    cal.createEvent({
        start: calendar.startTime,         // eg : moment()
        end: calendar.endTime,             // eg : moment(1,'days')
        summary: calendar.summary,         // 'Summary of your event'
        description: calendar.description, // 'More description'
        location: calendar.location,       // 'Delhi'
        url: calendar.url,                 // 'event url'
        organizer: {              // 'organizer details'
            name: calendar.name as string,
            email: calendar.email
        },
    })
    return cal;
}

export const sendTestMail = async () => {
    const toDate = new Date(new Date().getTime() + (1 * 60 * 60 * 1000))
    const cal = createCalendar({
        startTime: new Date(),
        endTime: toDate,
        summary: 'This is a test meeting calendar',
        description: 'This is a test meeting calendar description',
        location: 'Toronto',
        url: 'https://meet.google.com/pfv-vuho-sxz',
        name: ['Fin', '`Sazee'],
        email: 'sazeespectra@gmail.com'
    })

    let alternatives = {
        "Content-Type": "text/calendar",
        "method": "REQUEST",
        "content": Buffer.from(cal.toString()),
        "component": "VEVENT",
        "Content-Class": "urn:content-classes:calendarmessage"
    }
    testMail['alternatives'] = alternatives;
    testMail['alternatives']['contentType'] = 'text/calendar'
    testMail['alternatives']['content']
        = Buffer.from(cal.toString())

    testMail.html = await getEmailTemplate("Osazee", "welcome")
    transporter.sendMail(testMail, (error, info) => {
        if (error)
            console.log(error)
        if (info)
            console.log(info)
    })
}