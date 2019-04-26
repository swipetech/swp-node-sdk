let languages = Enums.Languages.enum;
let actionTypes = Enums.ActionTypes.enum;
let actionCodes = Enums.ActionCodes.enum;
let memoTypes = Enums.MemoTypes.enum;

let request =
    (
      ~host,
      ~headers,
      ~method,
      ~setAuthHeaders,
      ~body=?,
      ~queryParams=?,
      ~debug=?,
      path,
    ) => {
  setAuthHeaders(~path, ~body?, headers);

  Service.request(
    ~host,
    ~headers,
    ~method,
    ~body?,
    ~queryParams?,
    ~debug?,
    path,
  );
};

module Options = {
  [@bs.deriving abstract]
  type t = {
    apiKey: string,
    secret: string,
    [@bs.optional]
    language: string,
    [@bs.optional]
    debug: bool,
    [@bs.optional]
    sandbox: bool,
    [@bs.optional]
    customHost: string,
  };
};

module EncapsulatedTags = {
  [@bs.deriving abstract]
  type t = {tags: Js.Array.t(string)};
  let make = t;
};

module Endpoints = {
  open Js;

  module Routes = {
    let organizations = "/organizations";
    let accounts = "/accounts";
    let assets = "/assets";
    let transfers = "/transfers";
    let tags = "/tags";
    let actions = "/actions";
    let revoke = "/revoke";
    let webhooks = "/webhooks";

    let getAccount = id => {j|$accounts/$id|j};
    let getAccountByAlias = alias => {j|$accounts/alias/$alias|j};

    let deleteAccount = getAccount;
    let getTransfer = id => {j|$transfers/$id|j};
    let getAllTransfers = id => {j|$accounts/$id/transfers|j};
    let updateTags = id => {j|$tags/$id|j};
    let resetOrganization = {j|$organizations/reset|j};
    let getRevokeToken = {j|$organizations$revoke|j};
    let revokeCredentials = token => {j|$organizations$revoke/$token|j};
    let getActions = id => {j|$actions/$id|j};
    let deleteWebhook = id => {j|$webhooks/$id|j};
    let getWebhook = id => {j|$webhooks/$id|j};
  };

  type response = Nullable.t(Service.Api.Response.t);
  type dictParams = Nullable.t(Js.Dict.t(string));

  [@bs.deriving abstract]
  type t = {
    getOrganization: unit => Promise.t(response),
    resetOrganization: unit => Promise.t(response),
    getAccount: string => Promise.t(response),
    getAccountByAlias: string => Promise.t(response),
    getAllAccounts: dictParams => Promise.t(response),
    createAccount: Nullable.t(Js.Json.t) => Promise.t(response),
    destroyAccount: string => Promise.t(response),
    issueAsset: Json.t => Promise.t(response),
    getAllAssets: dictParams => Promise.t(response),
    getTransfer: string => Promise.t(response),
    getAllTransfers: (string, dictParams) => Promise.t(response),
    makeTransfers: Json.t => Promise.t(response),
    updateTags: (string, Array.t(string)) => Promise.t(response),
    getActionBatch: string => Promise.t(response),
    makeActionBatch: Json.t => Promise.t(response),
    getRevokeToken: unit => Promise.t(response),
    revokeCredentials: string => Promise.t(response),
    createWebhook: Json.t => Promise.t(response),
    deleteWebhook: string => Promise.t(response),
    getWebhook: string => Promise.t(response),
  };

  let make = t;
};

/* let mergeDicts = (dict1, dict2) => {
        let newDict = Js.Dict.empty();

        [|dict1, dict2|]
        |> Js.Array.forEach(dict =>getRevokeToken
             Js.Dict.keys(dict)
             |> Js.Array.forEach(key =>
                  Js.Dict.set(newDict, key, Js.DictgetOrganization
   getOrganization.unsafeGet(dict, key))
                )
           );

        newDict;
      }; */

module Account = {
  type balance;

  [@bs.deriving abstract]
  type t = {
    [@bs.optional] [@bs.as "type"]
    type_: string,
    [@bs.optional]
    tags: Js.Array.t(string),
    [@bs.optional] [@bs.as "starting_balances"]
    startingBalances: Js.Array.t(balance),
    [@bs.optional] [@bs.as "fields"]
    fields: Js.Json.t,
    [@bs.optional] [@bs.as "alias"]
    alias: string,
  };
};

module Asset = {
  [@bs.deriving abstract]
  type t = {
    [@bs.optional] [@bs.as "type"]
    type_: string,
    code: string,
    [@bs.optional]
    limit: string,
    [@bs.optional]
    tags: Js.Array.t(string),
  };
};

module Transfer = {
  [@bs.deriving abstract]
  type t = {
    [@bs.optional] [@bs.as "type"]
    type_: string,
    from: string,
    [@bs.as "to"]
    to_: string,
    asset: string,
    amount: string,
  };
};

module Memo = {
  [@bs.deriving abstract]
  type t = {
    [@bs.as "type"]
    type_: Js.String.t,
    value: Js.String.t,
  };
};

module TrailTransfer = {
  [@bs.deriving abstract]
  type t = {
    [@bs.optional] [@bs.as "type"]
    type_: string,
    from: string,
    [@bs.as "to"]
    to_: string,
    asset: string,
    amount: string,
  };
};

let memoHash = (value: Js.String.t) =>
  Memo.t(~type_=Enums.MemoTypes.hash, ~value);

let memoText = (value: Js.String.t) =>
  Memo.t(~type_=Enums.MemoTypes.text, ~value);

let sha256 = (value: Js.String.t) => Crypto.sha256(value) |> Util.toString;

let createAccountAction = (acc: Js.Nullable.t(Account.t)) =>
  switch (Js.Nullable.toOption(acc)) {
  | Some(a) =>
    Account.t(
      ~tags=?Account.tagsGet(a),
      ~startingBalances=?Account.startingBalancesGet(a),
      ~fields=?Account.fieldsGet(a),
      ~type_=Enums.ActionTypes.createAccount,
      ~alias=?Account.aliasGet(a),
      (),
    )
  | None => Account.t(~type_=Enums.ActionTypes.createAccount, ())
  };

let issueAssetAction = (asset: Asset.t) =>
  Asset.t(
    ~code=Asset.codeGet(asset),
    ~limit=?Asset.limitGet(asset),
    ~tags=?Asset.tagsGet(asset),
    ~type_=Enums.ActionTypes.issueAsset,
    (),
  );

let transferAction = (transfer: Transfer.t) =>
  Transfer.t(
    ~from=Transfer.fromGet(transfer),
    ~to_=Transfer.to_Get(transfer),
    ~asset=Transfer.assetGet(transfer),
    ~amount=Transfer.amountGet(transfer),
    ~type_=Enums.ActionTypes.transfer,
    (),
  );

let trailTransferAction = (transfer: TrailTransfer.t) =>
  TrailTransfer.t(
    ~from=TrailTransfer.fromGet(transfer),
    ~to_=TrailTransfer.to_Get(transfer),
    ~asset=TrailTransfer.assetGet(transfer),
    ~amount=TrailTransfer.amountGet(transfer),
    ~type_=Enums.ActionTypes.trailTransfer,
    (),
  );

let init: Options.t => Endpoints.t =
  options => {
    let host =
      switch (options |> Options.customHostGet) {
      | Some(host) => host
      | None =>
        switch (options |> Options.sandboxGet) {
        | Some(sandbox) => sandbox ? Config.sandboxHost : Config.host
        | None => Config.host
        }
      };

    let language =
      switch (options |> Options.languageGet) {
      | None => languages |> Enums.Languages.ptBrGet
      | Some(lang) => lang
      };

    let headers = Js.Dict.empty();
    Js.Dict.set(headers, "Content-Type", "application/json");
    Js.Dict.set(headers, "Accept-Language", language);

    let partialSetAuthHeaders =
      Auth.setHeaders(
        ~apiKey=options |> Options.apiKeyGet,
        ~secret=options |> Options.secretGet,
      );

    let baseRequest =
      request(~host, ~headers, ~debug=?options |> Options.debugGet);

    let get =
      baseRequest(
        ~setAuthHeaders=partialSetAuthHeaders(~method=Fetch.Get),
        ~method=Fetch.Get,
      );
    let post =
      baseRequest(
        ~setAuthHeaders=partialSetAuthHeaders(~method=Fetch.Post),
        ~method=Fetch.Post,
      );
    let delete =
      baseRequest(
        ~setAuthHeaders=partialSetAuthHeaders(~method=Fetch.Delete),
        ~method=Fetch.Delete,
      );
    let put =
      baseRequest(
        ~setAuthHeaders=partialSetAuthHeaders(~method=Fetch.Put),
        ~method=Fetch.Put,
      );

    Endpoints.make(
      ~getOrganization=() => get(Endpoints.Routes.organizations),
      ~resetOrganization=() => post(Endpoints.Routes.resetOrganization),
      ~getAccount=id => get(Endpoints.Routes.getAccount(id)),
      ~getAccountByAlias=
        alias => get(Endpoints.Routes.getAccountByAlias(alias)),
      ~getAllAccounts=
        queryParams =>
          get(
            Endpoints.Routes.accounts,
            ~queryParams=?Js.Nullable.toOption(queryParams),
          ),
      ~createAccount=
        body =>
          post(Endpoints.Routes.accounts, ~body=?Js.Nullable.toOption(body)),
      ~destroyAccount=id => delete(Endpoints.Routes.deleteAccount(id)),
      ~getAllAssets=
        queryParams =>
          get(
            Endpoints.Routes.assets,
            ~queryParams=?Js.Nullable.toOption(queryParams),
          ),
      ~issueAsset=body => post(Endpoints.Routes.assets, ~body),
      ~getTransfer=id => get(Endpoints.Routes.getTransfer(id)),
      ~getAllTransfers=
        (id, queryParams) =>
          get(
            Endpoints.Routes.getAllTransfers(id),
            ~queryParams=?Js.Nullable.toOption(queryParams),
          ),
      ~makeTransfers=body => post(Endpoints.Routes.transfers, ~body),
      ~updateTags=
        (id, tags) =>
          put(
            Endpoints.Routes.updateTags(id),
            ~body=JsonUtil.asJson(EncapsulatedTags.make(~tags)),
          ),
      ~getActionBatch=id => get(Endpoints.Routes.getActions(id)),
      ~makeActionBatch=body => post(Endpoints.Routes.actions, ~body),
      ~getRevokeToken=() => get(Endpoints.Routes.getRevokeToken),
      ~revokeCredentials=
        token => post(Endpoints.Routes.revokeCredentials(token)),
      ~deleteWebhook=id => delete(Endpoints.Routes.deleteWebhook(id)),
      ~createWebhook=body => post(Endpoints.Routes.webhooks, ~body),
      ~getWebhook=id => get(Endpoints.Routes.getWebhook(id)),
    );
  };
