---
title: Documentação
layout: page
homepage: true
order: 1
---

# Sobre

SwpWalletSDK é um SDK para Node.js, desenvolvido pela Swipe com o objetivo de facilitar a integração com a Swipe Wallet.

O SDK possibilita realizar criação de Tokens/Ativos, gestão de saldos entre contas e pagamentos instantâneos entre elas de forma simples. 

Todas as questões de comunicação HTTP com a API, a assinatura criptográfica das requisições e a utilização de ambiente sandbox são abstraídas.

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

Antes de realizar operações, é necessário inicializar o SDK com uma **api key** e um **secret** válidos:

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

<div class="alert alert-warning" markdown="1">
**Atenção:** temos um limite de 5 requests por segundo (Caso necessite exceder esse limite, entre em contato conosco). Se ultrapassar isso, você receberá um erro com código *APP-3*. Para mais detalhes [clique aqui](#lidando-com-erros)
</div>

## Utilizando Ambiente Sandbox

Para realizar testes utilizando a API em ambiente *sandbox*, utilize a configuração `sandbox: true` na inicialização do SDK:

```js
const wallet = WalletSDK.init({
  apiKey: CLIENT_API_KEY,
  secret: CLIENT_SECRET,
  sandbox: true
})
```

# Utilização

## Criação de Contas

```js
wallet.createAccount()
  .then(account => {
    console.log(account)
  })
```

**Output:**
```json
{
  "id": "c043ac0f8612b6ccbddb4c22742750a4f7e35746d4382efd4ddb2caa587e9899"
}
```

## Buscar informações de uma conta

```js
wallet.getAccount("c043ac0f8612b6ccbddb4c22742750a4f7e35746d4382efd4ddb2caa587e9899")
  .then(account => console.log(account))
```

**Output:**
```json
{
  "id": "c043ac0f8612b6ccbddb4c22742750a4f7e35746d4382efd4ddb2caa587e9899",
  "balances": [
    {
      "balance": 180,
      "asset_code": "ASSET1",
      "asset_id": "01e300c04a9af3e32b26980ca1a6c05f0150013112b9bd666b0059fa6a834555"
    }
  ]
}
```

## Buscar informações sobre todas as contas da sua organização

```js
wallet.getAllAccounts()
  .then(accounts => console.log(accounts))
```

**Output:**
```json
{
  "id": "c043ac0f8612b6ccbddb4c22742750a4f7e35746d4382efd4ddb2caa587e9899",
  "balances": [
    {
      "balance": 180,
      "asset_code": "ASSET1",
      "asset_id": "01e300c04a9af3e32b26980ca1a6c05f0150013112b9bd666b0059fa6a834555"
    }
  ]
}
```

## Buscar informações sobre um Asset 

```js
wallet.getAssets()
  .then(assets => console.log(assets))
```

**Output:**
```json
{
  "id": "01e300c04a9af3e32b26980ca1a6c05f0150013112b9bd666b0059fa6a834555",
  "code": "ASSET1",
  "limit": 20000
}
```

## Buscar informações sobre sua organização

```js
wallet.getOrganization()
  .then(organization => console.log(organization))
```

**Output:**
```json
{
  "id": "3e8bc54a01fed623c37cd1d07aa6818f7ac3e5608cad84c17711ba81d3c50f72",
  "name": "My Organization",
  "balances": [
    {
      "balance": 19820,
      "asset_code": "ASSET1",
      "asset_id": "01e300c04a9af3e32b26980ca1a6c05f0150013112b9bd666b0059fa6a834555"
    }
  ]
}
```

### Pagamento entre Organização e Conta

Para fazer um pagamento entre sua organização e uma conta utilizando um determinado asset emitido pela sua organização, utilize a função `makePayment` passando o `id` da sua organização como `source_id` e o `id` da conta como `destination_id`.

```js
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
      .then(acc => 
        // realizando depósito
        wallet.makePayment({
          source_id: org.id,
          asset_id: assetA["asset_id"],
          destination_id: acc.id,
          amount: AMOUNT
        })
      )
      .then(() => console.log("Depósito realizado!"))
      .catch(err => console.log("Ocorreu um erro:", err))
  })
```

## Pagamento entre Contas

Para efetuar um pagamento entre contas, utilize a função `makePayment` passando o `id` da conta pagadora como `source_id` e o da conta de destino como `destination_id`.

```js
wallet.makePayment({
  source_id: "f9b4aec14bcd558f1f27e7b60cc38ca347f2ca4eebffa3d2d99fbedcfeed9b28",
  asset_id: "72dc5b12a040e58202c155cf8175dda7004859320856e4e627ea01cfa10a2492",
  destination_id: "3c7caf634e09035c6d11cfa0ce3536d498a634185c875be39bee7a2b90443206",
  amount: 10
})
  .then(() => console.log("Depósito realizado!"))
  .catch(err => console.log("Ocorreu um erro:", err))
```

### Batch de Pagamentos Atômicos

Para efetuar um batch de até 100 pagamentos a serem executados em ordem e ao mesmo tempo, utilize a função `makePaymentBatch` com uma lista de `Payment`. A transação será atômica, isto é, se algum pagamento falhar, todos falharão.

```js
wallet.makePaymentBatch([
  {
    source_id: "f9b4aec14bcd558f1f27e7b60cc38ca347f2ca4eebffa3d2d99fbedcfeed9b28",
    asset_id: "72dc5b12a040e58202c155cf8175dda7004859320856e4e627ea01cfa10a2492",
    destination_id: "3c7caf634e09035c6d11cfa0ce3536d498a634185c875be39bee7a2b90443206",
    amount: 10
  },
  {
    source_id: "f9b4aec14bcd558f1f27e7b60cc38ca347f2ca4eebffa3d2d99fbedcfeed9b28",
    asset_id: "72dc5b12a040e58202c155cf8175dda7004859320856e4e627ea01cfa10a2492",
    destination_id: "3c7caf634e09035c6d11cfa0ce3536d498a634185c875be39bee7a2b90443206",
    amount: 20
  },
  {
    source_id: "f9b4aec14bcd558f1f27e7b60cc38ca347f2ca4eebffa3d2d99fbedcfeed9b28",
    asset_id: "72dc5b12a040e58202c155cf8175dda7004859320856e4e627ea01cfa10a2492",
    destination_id: "3c7caf634e09035c6d11cfa0ce3536d498a634185c875be39bee7a2b90443206",
    amount: 30
  },
])
  .then(() => console.log("Batch realizado!"))
  .catch(err => console.log("Ocorreu um erro:", err))
```

### Streaming de pagamentos por tempo indefinido para uma Conta/Organização  

Para criar um streaming de pagamentos, utilize a função `streamPayments`. É necessário passar o `id` da Conta, um callback que será chamado a cada pagamento recebido e um último callback para tratar um caso de erro. Para cancelá-lo chame a função de retorno. 

```js
wallet.createAccount()
  .then(account => {
    const cancel = w.streamPayments(
        account.id, 
        // Este callback será chamado a cada pagamento 
        payment => console.log(payment),
        // Em caso de erro este callback será chamado
        err => console.log(err),
    )
    
    // Quando quiser cancelar, simplesmente chame a função `cancel`
    cancel()
  })

```

**Output:**
```json
{
  "source_id": "01e300c04a9af3e32b26980ca1a6c05f0150013112b9bd666b0059fa6a834555",
  "destination_id": "3c7caf634e09035c6d11cfa0ce3536d498a634185c875be39bee7a2b90443206",
  "asset_id": "72dc5b12a040e58202c155cf8175dda7004859320856e4e627ea01cfa10a2492",
  "amount": 20
}
```

### Lidando com erros

Você pode identificar o tipo do `Error` através do campo `Code`. Segue abaixo a lista de possíveis códigos:
- APP-1: Erro interno do servidor
- APP-2: Campo(s) inválido(s). Utilize `FieldErrors` para obter o campo específico.
- APP-3: Limite de requests excedido.
- APP-4: Não autorizado. Isso significa que suas credenciais estão inválidas.
- APP-5: Saldo insuficiente para pagamento.
- APP-6: Recurso não encontrado.
- APP-7: Limite de contas criadas excedido.
- APP-8: Limite de pagamentos em batch excedidos. Atualmente o limite é de 100 pagamentos em um único batch.