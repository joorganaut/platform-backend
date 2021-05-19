import * as openpgp from 'openpgp'
import jwt from 'jsonwebtoken'

const privateKeyArmored = process.env.API_PRIVATE_KEY?.replace(/\\n/g, '\n')
const publicKeyArmored = process.env.API_PUBLIC_KEY?.replace(/\\n/g, '\n')
const passphrase = process.env.API_KEY

export const encrypt = async (word: any) => {
    const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored as string })
    const privateKey = await openpgp.readKey({ armoredKey: privateKeyArmored as string })
    await privateKey.decrypt(passphrase as string);
    const encrypted = await openpgp.encrypt({
        message: openpgp.Message.fromText(word), // input as Message object
        publicKeys: publicKey, // for encryption
        privateKeys: [privateKey] // for signing (optional)
    })
    return base64Encode(encrypted as string)
}

export const decrypt = async (cipher: string) => {
    const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored as string })
    const privateKey = await openpgp.readKey({ armoredKey: privateKeyArmored as string })
    await privateKey.decrypt(passphrase as string)
    const message = await openpgp.readMessage({
        armoredMessage: base64Decode(cipher) // parse armored message
    });
    const {
        data: decrypted
    } = await openpgp.decrypt({
        message: message, // parse armored message
        publicKeys: publicKey, // for verification (optional)
        privateKeys: [privateKey] // for decryption
    })
    return decrypted as string
}

export const getJwtTokenFromValue = (value: any) => {
    return jwt.sign(value, passphrase as string)
}

export const getValueFromJwt = (token: string) => {
    const result = jwt.verify(token, passphrase as string)
    return result

}

const base64Encode = (cipher: string) => {
    const result = Buffer.from(cipher).toString('base64')
    return result;
}

const base64Decode = (cipher: string) => {
    const result = Buffer.from(cipher, 'base64').toString('ascii')
    return result;
}

export const GenerateKeys = async () => {
    return await openpgp.generateKey({
        userIds: [{
            name: process.env.API_SHORT_NAME,
            email: process.env.API_EMAIL
        }], // you can pass multiple user IDs
        curve: 'p256', // ECC curve name
        passphrase: passphrase // protects the private key
    })
}