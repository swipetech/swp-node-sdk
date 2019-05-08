declare module '@swp/swipe-sdk' {
  export interface SuccessResponse<T> {
    data?: T
    pagination?: Pagination
    error: Error
  }

  export interface Pagination {
    cursor: string
  }

  export interface Data<T> {
    receipt: Receipt
    value: T
  }

  export interface Receipt {
    id: string
    created_at: string
    type: ActionType
  }

  export enum ActionType {
    Transfer = "transfer",
    CreateAccount = "create_account",
    CreateOrganization = "create_organization",
    IssueAsset = "issue_asset",
    DestroyAccount = "destroy_account"
  }

  export interface Organization extends Account {
    name: string
  }

  export interface Account {
    id?: string
    type?: string
    balances: Balance[]
    tags?: string[]
    fields: { [key: string]: string }
  }

  export interface NewAccount {
    type?: string
    starting_balances?: StartingBalance[]
    tags?: string[]
    fields: { [key: string]: string }
  }

  export interface StartingBalance {
    balance: string
    asset_id: string
  }

  export interface Asset {
    id?: string
    code: string
    limit: string
    tags: string[]
    type?: string
  }

  export interface TransferBatch {
    id?: string
    actions: Transfer[]
    memo?: MemoValue
  }

  export interface MemoValue {
    type: "TEXT" | "HASH"
    value: string
  }

  export interface Transfer {
    id?: string
    from: string
    to: string
    asset: string
    amount: string
    op_code?: ActionCode
    type?: string
  }

  export enum ActionCode {
    Ok = "action_ok",
    Success = "action_success",
    Underfunded = "action_underfunded",
    NotProcessed = "action_not_processed",
  }

  export interface Balance {
    balance: string
    asset_code: string
    asset_id: string
  }

  export interface WebHook {
    id: String,
    url: String,
    actionType: String
  }

  export interface Tags {
    id?: string
    tags: string[]
  }

  export interface Error {
    code: string
    msg: string
    sub_errors: SubError[]
  }

  export interface SubError {
    code: string
    msg: string
    field: string
    index: number
  }

  export interface ActionBatch {
    id?: string
    actions: Array<NewAccount | Asset | Transfer>
    memo?: MemoValue
  }

  export interface ResponseToken {
    token: string
  }

  export interface PaginationOptions {
    limit: string
    starting_after: string
  }

  export interface Filters {
    tag: string
  }

  export interface PspInfo {
    psp: Psp
    user: User
  }

  export interface Psp {
    name: string
    phoneNumber: string
    domain: string 
  }

  export interface User {
    firstName: string
    lastName: string
    document: string
    email: string
    alias: string
  }

  export interface SwipeEndpoints {
    getOrganization: () => Promise<SuccessResponse<Data<Organization>>>
    getAccount: (id: string) => Promise<SuccessResponse<Data<Account>>>
    getAllAccounts: (ops?: PaginationOptions & Filters) => Promise<SuccessResponse<Array<Data<Account>>>>
    getAllTransfers: (accountId: string, paginationOps?: PaginationOptions) => Promise<SuccessResponse<Array<Data<Transfer>>>>
    getTransfer: (id: string) => Promise<SuccessResponse<Data<TransferBatch>>>
    getAsset: (id: string) => Promise<SuccessResponse<Data<Asset>>>
    getAllAssets: (ops?: PaginationOptions & Filters) => Promise<SuccessResponse<Array<Data<Asset>>>>

    createAccount: (acc?: NewAccount) => Promise<SuccessResponse<Data<Account>>>
    issueAsset: (asset: Asset) => Promise<SuccessResponse<Data<Asset>>>
    makeTransfers: (transferBatch: TransferBatch) => Promise<SuccessResponse<Data<TransferBatch>>>
    
    makeTrailTransfer: (transferBatch: TransferBatch) => Promise<SuccessResponse<Data<TransferBatch>>>
    getUserPSPInfo: (instanteId: string) => Promise<SuccessResponse<Data<PspInfo>>>
    createWebhook: (webHook: WebHook) => Promise<SuccessResponse<Data<WebHook>>>
    deleteWebhook: (id: string) => Promise<undefined>

    destroyAccount: (id: string) => Promise<SuccessResponse<Data<Account>>>
    makeActionBatch: (batch: ActionBatch) => Promise<SuccessResponse<Data<ActionBatch>>>
    updateTags: (tags: Tags) => Promise<SuccessResponse<Data<Tags>>>

    resetOrganization: () => Promise<undefined>
    getToken: () => Promise<SuccessResponse<Data<ResponseToken>>>
    revokeCredentials: () => Promise<undefined>
  }

  export interface Options {
    apiKey: string
    secret: string
    debug?: boolean
    sandbox?: boolean
    customHost?: string
  }

  export function init(options: Options): SwipeEndpoints
}