declare module "@swp/wallet-sdk" {
  export type OperationType =
    "payment" |
    "create_account" |
    "create_organization" |
    "issue_asset" |
    "change_trust"

  export interface Options {
    apiKey: string
    secret: string
    sandbox: boolean
    debug: boolean
  }

  export interface PaymentOperations {
    from: string
    to: string
    asset: string
    amount: number
    op_code: string
  }

  export interface Payment {
    id: string
    operations: PaymentOperations[]
  }

  export interface Receipt {
    id: string
    created_at: string
    op_type: OperationType
  }

  export interface Balance {
    balance: number
    asset_code: string
    asset_id: string
  }

  export interface Account {
    id: string
    balances: Balance[]
  }

  export interface Asset {
    id: string
    code: string
    limit: number
  }

  export interface Organization extends Account {
    name: string
    api_key: string
    secret: string
  }

  export interface WithReceipt {
    receipt: Receipt
  }

  export interface AccountReceipt extends WithReceipt {
    account: Account
  }

  export interface AssetReceipt extends WithReceipt {
    asset: Asset
  }

  export interface OrganizationReceipt extends WithReceipt {
    organization: Organization
  }

  export interface PaymentReceipt extends WithReceipt {
    payment: Payment
  }

  export interface Endpoints {
    createAccount: () => Promise<AccountReceipt>
    getAccount: (id: string) => Promise<AccountReceipt>
    getAllAccounts: () => Promise<AccountReceipt[]>
    getAllAssets: () => Promise<AssetReceipt[]>
    getOrganization: () => Promise<OrganizationReceipt>
    makePayment: (payments: Array<PaymentOp>) => Promise<PaymentReceipt>
    getPayment: (id: string) => Promise<PaymentReceipt>
    // monitorPaymentsToAccount: (id: string, cb: (payment: PaymentReceipt) => void) => EventSource
    // monitorPaymentsToOrg: (cb: (payment: PaymentReceipt) => void) => EventSource
  }
  
  export const languages: {
    PT_BR: string
    EN_US: string
  }

  export const operationTypes: {
    Payment: "payment",
    CreateAccount: "create_account",
    CreateOrganization: "create_organization",
    IssueAsset: "issue_asset",
    ChangeTrust: "change_trust",
  }

  export const operationCodes: {
    Ok: "op_ok"
    Success: "op_success"
    Underfunded: "op_underfunded"
    NotProcessed: "op_not_processed"
  }

  export const init: (options: Options) => Endpoints
}