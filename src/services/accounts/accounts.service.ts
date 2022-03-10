import { Account, AccountEntity, AccountStatus } from '../../types'
import * as repository from '../../repositories/accounts/accounts.repository'
// import * as mailService from '../../services/messaging/mail.service'
import { mapAccountFromAccountEntity, mapAccountEntityFromAccount } from '../../dataMappers/accounts/accounts.mappers'



export const fetchAccount = async (AccountId: string, institutionCode: string): Promise<Account> => {
    const entity: AccountEntity = await repository.fetchAccountById(AccountId, institutionCode)
    const result = mapAccountFromAccountEntity(entity)
    return result
}

export const fetchAllAccounts = async (institutionCode: string): Promise<Account[]> => {
    const AccountEntities: AccountEntity[] = await repository.fetchAccounts(institutionCode)
    const result = AccountEntities.map(entity => mapAccountFromAccountEntity(entity))
    return result
}

// export const saveBulkAccounts = async (Accounts: Account[], institutionCode: string) => {
//     const AccountEntities: AccountEntity[] = Accounts?.map(Account => mapAccountEntityFromAccount(Account, institutionCode))
//     const { rowCount } = await repository.saveBulkAccounts(AccountEntities)
//     return rowCount
// }

export const saveAccount = async (Account: Account, institutionCode: string) => {
    const AccountEntity: AccountEntity = mapAccountEntityFromAccount(Account, institutionCode)
    AccountEntity.account_balance = 0
    AccountEntity.status = AccountStatus.open
    AccountEntity.is_gl = false
    const allAccounts = await fetchAllAccounts(institutionCode)
    AccountEntity.account_number = `${institutionCode}_${allAccounts.length + 1}`
    const [response] = await repository.createAccount(AccountEntity)
    // mailService.sendTestMail()
    return mapAccountFromAccountEntity(response)
}

export const createDefaultAccounts = async (institutionCode?: string) => {
    const incomeAccount: AccountEntity = {
        account_balance: 0,
        account_number: institutionCode + "_1",
        status: AccountStatus.open,
        name: 'income-account-' + institutionCode,
        currency: 'CAD',
        institution_code: institutionCode,
        is_gl: true,
    }
    const expenseAccount: AccountEntity = {
        account_balance: 0,
        account_number: institutionCode + "_2",
        status: AccountStatus.open,
        name: 'expense-account-' + institutionCode,
        currency: 'CAD',
        institution_code: institutionCode,
        is_gl: true
    }
    const accounts: AccountEntity[] = [incomeAccount, expenseAccount]
    await repository.createBulkAccounts(accounts)
}

export const updateAccount = async (AccountId: string, Account: Account, institutionCode: string) => {
    const AccountEntity: AccountEntity = mapAccountEntityFromAccount(Account, institutionCode)
    const [db_response] = await repository.updateAccount(AccountId, AccountEntity, institutionCode)
    const response = mapAccountFromAccountEntity(db_response)
    return response
}

export const deleteAccount = async (AccountId: string, institutionCode: string) => {
    const [db_response] = await repository.deleteAccount(AccountId, institutionCode)
    const response = mapAccountFromAccountEntity(db_response)
    return response
}