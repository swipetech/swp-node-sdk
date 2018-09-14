declare module "@swp/wallet-sdk" {
  type OperationType =
    "payment" |
    "create_account" |
    "create_organization" |
    "issue_asset" |
    "change_trust"

  interface Options {
    apiKey: string
    secret: string
    sandbox: boolean
    debug: boolean
  }

  interface PaymentOperations {
    from: string
    to: string
    asset: string
    amount: number
    op_code: string
  }

  interface Payment {
    id: string
    operations: PaymentOperations[]
  }

  interface Receipt {
    id: string
    created_at: string
    op_type: OperationType
  }

  interface Balance {
    balance: number
    asset_code: string
    asset_id: string
  }

  interface Account {
    id: string
    balances: Balance[]
  }

  interface Asset {
    id: string
    code: string
    limit: number
  }

  interface Organization extends Account {
    name: string
    api_key: string
    secret: string
  }

  interface WithReceipt {
    receipt: Receipt
  }

  interface AccountReceipt extends WithReceipt {
    account: Account
  }

  interface AssetReceipt extends WithReceipt {
    asset: Asset
  }

  interface OrganizationReceipt extends WithReceipt {
    organization: Organization
  }

  interface PaymentReceipt extends WithReceipt {
    payment: Payment
  }

  interface Endpoints {
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