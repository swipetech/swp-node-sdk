---
title: API
layout: page
homepage: false
order: 2
---

# SwpPaySDK

## init

`init(config)`

Inicializa o SDK com as configurações para acesso à API.

**Argumentos:**

* `config: Config`: objeto de configuração do tipo [`Config`](#config), contendo as seguintes propriedades:
  * `apiKey: string`: chave da API válida (fornecida na criação da conta);
  * `secret: string`: chave criptográfica (fornecida na criação da conta);
  * `language?: string`: *(opcional)* idioma para internacionalização de mensagens de erro. Padrão: `"pt-br"`;
  * `debug?: boolean`: *(opcional)* quando `true`, erros http completos serão logados no console. Padrão: `false`.
  * `sandbox?: boolean`: *(opcional)* quando `true`, o SDK se conectará a uma API sandbox para fins de teste. Padrão: `false`.

**Retorno:**

* Objeto do tipo [`CheckoutService`](#checkoutservice), através do qual são realizadas todas as ações referentes ao checkout. Veja [CheckoutService](#checkoutservice) para mais detalhes.

---

## assetTypes

Enum do tipo [`AssetTypes`](#assettypes-1).

---

## checkoutEvents

Enum do tipo [`CheckoutEvents`](#checkoutevents-1), contendo os possíveis nomes dos eventos de atualização de checkout, disparados pelo `EventEmitter` retornado por [`CheckoutService.getCheckoutUpdates`](#getcheckoutupdates).

---

## checkoutStatus

Enum do tipo [`CheckoutStatus`](#checkoutstatus-1), contendo os possíveis status do checkout.

---

## credentialChannel

Enum do tipo [`CredentialChannel`](#credentialchannel-1).

---

## paymentStatus

Enum do tipo [`PaymentStatus`](#paymentstatus-1), contendo os possíveis status de pagamento.

---

# CheckoutService

## getAccountAssets

`getAccountAssets()`

Consulta na API informações sobre a conta e os assets disponíveis para a mesma.

**Retorno:**

* Promise de [`AccountAsset[]`](#accountassets). Em caso de erro, a promise rejeita um objeto do tipo [`Error`](#error).

---

## newCheckout

`newCheckout(checkout)`

Cria um novo checkout.

**Argumentos:**

* `checkout: BasicCheckoutInfo`: objeto do tipo [`BasicCheckoutInfo`](#basiccheckoutinfo) contendo informações para criação do checkout.

**Retorno:**

* Promise de [`Checkout`](#checkout). Em caso de erro, a promise rejeita um objeto do tipo [`Error`](#error).

---

## refreshCheckoutForPayment

`refreshCheckoutForPayment(checkoutId)`

Atualiza o checkout com uma nova ordem de pagamento. Essa função pode ser usada tanto para gerar uma primeira ordem de pagamento quanto para gerar uma nova em caso de expiração.

**Argumentos:**

* `checkoutId: string`: ID do checkout a ser atualizado.

**Retorno:**

* Promise de [`CheckoutWithPayment`](#checkoutwithpayment). Em caso de erro, a promise rejeita um objeto do tipo [`Error`](#error).

---

## getCheckoutUpdates

`getCheckoutUpdates(checkoutId)`

Retorna um objeto de tipo [`CheckoutUpdates`](#checkoutupdates), contendo as propriedades:

* `events: EventEmitter`: um EventEmitter nativo através do qual é possível ouvir os eventos de atualização do checkout;
* `unsubscribe: Function`: função que possibilita interromper manualmente a verificação por atualizações.

Os nomes dos eventos emitidos por `CheckoutUpdates.events` podem ser acessados através do enum [`SwpPaySDK.checkoutEvents`](#checkoutevents).

**Argumentos:**

* `checkoutId: string`: ID do checkout a verificar updates.

**Retorno:**

* Um `EventEmitter` nativo, através do qual é possível ouvir os eventos de atualização do checkout.

---

# Interfaces

## Account

```ts
interface Account {
  name: string
  is_active: boolean
  is_legal_entity: boolean
  id: string
}
```

---

## AccountAsset

```ts
interface AccountAsset {
  asset: Asset
}
```

---

## Asset

```ts
interface Asset {
  id: number
  type: AssetType
  name: string
  symbol: string
  acronym: string
  decimal_places: number
  is_enabled: boolean
}
```

---

## BasicCheckoutInfo

```ts
interface BasicCheckoutInfo {
    origin_asset_id: number
    origin_amount: number
    payment_asset_id: number
    source: CheckoutSource
    memo?: string
}
```

---

## Checkout

```ts
interface Checkout extends BasicCheckoutInfo {
  credential: Credential
  expires_at: string
  is_expired: boolean
}
```

---

## CheckoutSource

```ts
interface CheckoutSource {
  first_name?: string
  last_name?: string
  email?: string
  document_number?: string
}
```

---

## CheckoutWithPayment

```ts
interface CheckoutWithPayment extends Checkout {
  current_payments: Payment[]
}
```

---

## CheckoutUpdates

```ts
interface CheckoutUpdates {
  events: EventEmitter
  unsubscribe: () => void
}
```

---

## Config

```ts
interface Config {
  apiKey: string
  secret: string
  language?: string
  debug?: boolean
  sandbox?: boolean
}
```

---

## Credential

```ts
interface Credential {
  is_active: boolean
  channel: CredentialChannel
  account_id: number
}
```

---

## Deposit

```ts
interface Deposit {
  id: string
  internal_tx_hash: string
  external_tx_hash: string
  amount: number
  confirmations: number
  confirmed_at: string
}
```

---

## Error

```ts
interface Error {
  message: string
  code?: string
  statusCode?: number
  fieldErrors: FieldError[]
}
```

---

## FieldError

```ts
interface FieldError {
  code: string
  field: string
  message: string
}
```

---

## Payment

```ts
interface Payment {
  price_at: string
  rate: number
  asset: Asset
  amount: number
  amount_without_fee: number
  fee_amount: number
  fee: number
  status_created_at: string
  status: paymentStatus
  wallet_address: string
  wallet_address_uri: string
  is_confirmed: boolean
  expires_at: string
  is_expired: boolean
  confirmation_hook_id: string
  is_hook_unregistered: boolean
  deposits: Deposit[]
}
```

---

# Enums

## AssetTypes

```ts
enum assetType {
  Fiat = "FIAT",
  Crypto = "CRYPTO"
}
```

---

## CheckoutEvents

```ts
enum CheckoutEvents {
  Expired = "expired",
  StatusChange = "status-change",
  PaymentExpired = "payment-expired",
  PaymentStatusChange = "payment-status-change",
  GetUpdatesError = "get-updates-error"
}
```

---

## CheckoutStatus

```ts
enum PaymentStatus {
  Created = "Created",
  Paid = "Paid",
  Underpayment = "Underpayment",
  Overpayment = "Overpayment",
  WaitingPayment = "WaitingPayment"
}
```

---

## CredentialChannel

```ts
enum CredentialChannel {
    PoS = "PoS",
    WebStore = "WebStore"
}
```

---

## PaymentStatus

```ts
enum PaymentStatus {
  Paid = "Paid",
  Underpayment = "Underpayment",
  Overpayment = "Overpayment",
  WaitingPayment = "WaitingPayment"
}
```

---