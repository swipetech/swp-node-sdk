---
title: Documentação
layout: page
homepage: true
order: 1
---

# Sobre

SwpWalletSDK é um SDK para Node.js, desenvolvido pela Swipe com o objetivo de facilitar a integração com a Swipe Wallet.

O SDK possibilita realizar criação de contas e gerenciamento/transferência de saldos de forma simples, abstraindo questões como a comunicação HTTP com a API, a assinatura criptográfica das requisições e a utilização de ambiente sandbox.

# Instalação

SwpWalletSDK pode ser instalado via npm ou Yarn.

**npm:**

```
npm i @swp/wallet-sdk
```

**Yarn:**

```
yarn add @swp/wallet-sdk
```

Para importar o SDK em seu código, utilize:

```js
const WalletSDK = require("@swp/wallet-sdk");
```

Ou em ES2015/TypeScript:

```js
import * as WalletSDK from "@swp/wallet-sdk";
```

# Inicialização

Antes de realizar operações, é necessário inicilizar o SDK com uma **api key** e um **secret** válidos:

```js
const wallet = WalletSDK.init({
  apiKey: CLIENT_API_KEY,
  secret: CLIENT_SECRET
})
```

A função `init` retorna um objeto através do qual todas as operações serão realizadas.

<div class="alert alert-warning" markdown="1">
**Atenção:** a integração deve ser realizada sempre a partir de um servidor Node.js, nunca a partir de um navegador. Não é seguro armazenar seu *api key* e *secret* em um código JavaScript executado no navegador, mesmo que sejam utilizadas práticas de *code obfuscation*.
</div>

## Utilizando Ambiente Sandbox

Para realizar testes utilizando a API em ambiente *sandbox*, utilize a configuração `sandbox: true` na inicialização do SDK:

```js
const swpService = SwpPaySDK.init({
  apiKey: CLIENT_API_KEY,
  secret: CLIENT_SECRET,
  sandbox: true
})
```

# Utilização

## Criação de Contas

Para criar uma nova conta, utilize a função `createAccount`.

```ts
wallet.createAccount()
  .then(account => {
    console.log(account)
  })
```

**Output:**
```ts
{
  "id": "f9b4aec14bcd558f1f27e7b60cc38ca347f2ca4eebffa3d2d99fbedcfeed9b28"
}
```

## Depósito em Conta

Para depositar em uma conta um determinado asset emitido pela sua organização, utilize a função `makePayment` passando o `id` da sua organização como `source_id` e o `id` da conta como `destination_id`.

```ts
const AMOUNT = 10

wallet.getOrganization()
  .then(org => {
    // buscando nos saldos (balances) da
    // organização um asset de nome A
    assetA = org
      .balances
      .find(balance => balance["asset_code"] == "A")

    // criando nova conta
    wallet.createAccount()
      .then(acc => {
        // realizando depósito
        return wallet.makePayment({
          "source_id": org.id,
          "asset_id": assetA["asset_id"],
          "destination_id": acc.id,
          "amount": AMOUNT
        })
      })
      .then(() => console.log("Depósito realizado!"))
      .catch(err => console.log("Ocorreu um erro:", err))
  })
```

## Pagamento Entre Contas

Para efetuar um pagamento entre contas, utilize a função `makePayment` passando o `id` da conta pagadora como `source_id` e o da conta de destino como `destination_id`.

```ts
wallet.makePayment({
  "source_id": "f9b4aec14bcd558f1f27e7b60cc38ca347f2ca4eebffa3d2d99fbedcfeed9b28",
  "asset_id": "72dc5b12a040e58202c155cf8175dda7004859320856e4e627ea01cfa10a2492",
  "destination_id": "3c7caf634e09035c6d11cfa0ce3536d498a634185c875be39bee7a2b90443206",
  "amount": 10
})
  .then(() => console.log("Depósito realizado!"))
  .catch(err => console.log("Ocorreu um erro:", err))
```