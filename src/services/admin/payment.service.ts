import stripe from 'stripe'

const stripe_key = process.env.STRIPE_KEY || ''

const instance = new stripe(stripe_key, { apiVersion: '2020-08-27' })

export const getPaymentKey = async (amount: string, currency: string) => {
    const cents = parseFloat(parseFloat(amount).toFixed(2)) * 10 * 10
    const intent = await instance.paymentIntents.create({ amount: cents, currency: currency })
    return intent.client_secret
}