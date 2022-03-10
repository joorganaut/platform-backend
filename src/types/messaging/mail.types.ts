

export enum MailMessageStatus {
    pending,
    sent,
    failed
}

export type Template = 'welcome' | 'passwordReset' | 'emailVerification' | 'invitation' | 'tickets' | 'claimTicket' | 'summitTickets' | 'completeProfile' | 'shareTicket' | 'codeVerification' | 'acceptConnection' | 'receivedConnection' | 'receivedComment' | 'profileReminder' | 'receivedDirectMessage'


export interface MailMessage {
    subject?: string
    html?: any
    from: string
    fromName?: string
    to: string | string[]
    toName?: string
    status?: MailMessageStatus
    alternatives?: any
}