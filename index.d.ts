declare module "@swp/wallet-sdk" {
  export type ActionType =
    "PAYMENT" |
    "CREATE_ACC" |
    "DESTROY_ACC" |
    "CREATE_ORG" |
    "ISSUE_ASSET"

  export type OperationCode =
  "op_ok" |
  "op_success" |
  "op_underfunded" |
  "op_not_processed"

  export interface Options {
    apiKey: string
    secret: string
    sandbox: boolean
    debug: boolean
  }

  export interface PaymentOperation {
    from: string
    to: string
    asset: string
    amount: number
    op_code: OperationCode
  }

  export interface Payment {
    id: string
    transfers: PaymentOperation[]
  }

  export interface Receipt {
    id: string
    created_at: string
    type: ActionType
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

  export interface PaymentOp {
    from: string
    to: string
    amount: string
    asset: string
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

  export interface SubError {
    code: string
    msg: string
    field: string
  }

  export interface Error {
    code: string
    msg: string
    sub_errors: SubError[]
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

  export const actionTypes: {
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