declare module "@swp/wallet-sdk" {
  interface Options {
    apiKey: string
    secret: string
    sandbox: boolean
    debug: boolean
  }

  interface Payment {
    source_id: string
    destination_id: string
    asset_id: string
    amount: number
  }

  interface Endpoints {
    createAccount: () => Promise<any>
    getAccount: (id: string) => Promise<any>
    getAllAccounts: () => Promise<any>
    getAssets: () => Promise<any>
    getOrganization: () => Promise<any>
    makePayment: (payments: Array<Payment>) => Promise<any>
    listenForPayments: (id: string, cb: (payment: Payment) => void) => EventSource
  }
  
  export const languages: {
    PT_BR: string
    EN_US: string
  }

  export const init: (options: Options) => Endpoints
}