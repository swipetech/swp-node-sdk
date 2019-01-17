let languages = Enums.Languages.enum;
let actionTypes = Enums.ActionTypes.enum;
let operationCodes = Enums.OperationCodes.enum;

let get = (~host, ~headers, ~setAuthHeaders, ~debug=?, ~queryParams=?, path) => {
  setAuthHeaders(~path, ~body=?None, headers);

  Service.get(~host, ~headers, ~debug?, ~queryParams?, path);
};

let post = (~host, ~headers, ~body=?, ~setAuthHeaders, ~debug=?, path) => {
  setAuthHeaders(~path, ~body?, headers);

  Service.post(~host, ~headers, ~body?, ~debug?, path);
};

let delete = (~host, ~headers, ~setAuthHeaders, ~debug=?, path) => {
  setAuthHeaders(~path, ~body=?None, headers);

  Service.delete(~host, ~headers, ~debug?, path);
};

module Options = {
  [@bs.deriving abstract]
  type t =
    pri {
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

module Transfer = {
  open Js;

  type t;

  [@bs.deriving abstract]
  type batch = {operations: Array.t(t)};
};

module Endpoints = {
  open Js;

  module Routes = {
    let organizations = "/organizations";
    let accounts = "/accounts";
    let assets = "/assets";
    let transfers = "/transfers";

    let getAccount = id => {j|$accounts/$id|j};
    let deleteAccount = getAccount;
    let getTransfer = id => {j|$transfers/$id|j};
    let getAllTransfers = id => {j|$accounts/$id/transfers|j};
  };

  type response = Nullable.t(Service.Api.Response.t);
  type dictParams = Js.Nullable.t(Js.Dict.t(string));

  [@bs.deriving abstract]
  type t = {
    createAccount: Js.Nullable.t(Js.Json.t) => Promise.t(response),
    getAccount: string => Promise.t(response),
    getAllAccounts: (dictParams, dictParams) => Promise.t(response),
    getAllAssets: dictParams => Promise.t(response),
    getOrganization: unit => Promise.t(response),
    makeTransfer: Array.t(Transfer.t) => Promise.t(response),
    getTransfer: string => Promise.t(response),
    getAllTransfers: (string, dictParams) => Promise.t(response),
    destroyAccount: string => Promise.t(response),
  };

  let make = t;
};

let mergeDicts = list => {
  let newDict = Js.Dict.empty();

  list
  |> Js.Array.forEach(dict =>
       switch (dict) {
       | Some(p) =>
         Js.Dict.keys(p)
         |> Js.Array.forEach(key => {
              let value = Js.Dict.get(p, key);
              switch (value) {
              | Some(value) =>
                Js.Dict.set(newDict, key, value);
                ();
              | None => ()
              };
            });
         ();
       | None => ()
       }
     );

  newDict;
};

let init: Options.t => Endpoints.t =
  options => {
    let host =
      switch (options |> Options.customHost) {
      | Some(host) => host
      | None =>
        switch (options |> Options.sandbox) {
        | Some(sandbox) => sandbox ? Config.sandboxHost : Config.host
        | None => Config.host
        }
      };

    let language =
      switch (options |> Options.language) {
      | None => languages |> Enums.Languages.ptBr
      | Some(lang) => lang
      };

    let headers = Js.Dict.empty();
    Js.Dict.set(headers, "Content-Type", "application/json");
    Js.Dict.set(headers, "Accept-Language", language);

    let partialSetAuthHeaders =
      Auth.setHeaders(
        ~apiKey=options |> Options.apiKey,
        ~secret=options |> Options.secret,
      );

    let getRoute =
      get(
        ~host,
        ~headers,
        ~setAuthHeaders=partialSetAuthHeaders,
        ~debug=?options |> Options.debug,
      );

    let postToRoute =
      post(
        ~host,
        ~headers,
        ~setAuthHeaders=partialSetAuthHeaders,
        ~debug=?options |> Options.debug,
      );

    let delete =
      delete(
        ~host,
        ~headers,
        ~setAuthHeaders=partialSetAuthHeaders,
        ~debug=?options |> Options.debug,
      );

    Endpoints.make(
      ~createAccount=
        body =>
          postToRoute(
            Endpoints.Routes.accounts,
            ~body=?Js.Nullable.toOption(body),
          ),
      ~getAccount=id => getRoute(Endpoints.Routes.getAccount(id)),
      ~getAllAccounts=
        (pagination, filters) => {
          let queryParams =
            mergeDicts([|
              Js.Nullable.toOption(pagination),
              Js.Nullable.toOption(filters),
            |]);

          getRoute(Endpoints.Routes.accounts, ~queryParams);
        },
      ~getAllAssets=
        queryParams =>
          getRoute(
            Endpoints.Routes.assets,
            ~queryParams=?Js.Nullable.toOption(queryParams),
          ),
      ~getOrganization=() => getRoute(Endpoints.Routes.organizations),
      ~makeTransfer=
        operations =>
          postToRoute(
            Endpoints.Routes.transfers,
            ~body=JsonUtil.asJson(Transfer.batch(~operations)),
          ),
      ~getTransfer=id => getRoute(Endpoints.Routes.getTransfer(id)),
      ~getAllTransfers=
        (id, queryParams) =>
          getRoute(
            Endpoints.Routes.getAllTransfers(id),
            ~queryParams=?Js.Nullable.toOption(queryParams),
          ),
      ~destroyAccount=id => delete(Endpoints.Routes.deleteAccount(id)),
    );
  };