let languages = Enums.Languages.enum;
let actionTypes = Enums.ActionTypes.enum;
let operationCodes = Enums.OperationCodes.enum;

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

    let getAccount = id => {j|$accounts/$id|j};
    let deleteAccount = getAccount;
    let getTransfer = id => {j|$transfers/$id|j};
    let getAllTransfers = id => {j|$accounts/$id/transfers|j};
    let updateTags = id => {j|$tags/$id|j};
    let resetOrganization = {j|$organizations/reset|j};
  };

  type response = Nullable.t(Service.Api.Response.t);
  type dictParams = Nullable.t(Js.Dict.t(string));

  [@bs.deriving abstract]
  type t = {
    createAccount: Nullable.t(Js.Json.t) => Promise.t(response),
    getAccount: string => Promise.t(response),
    getAllAccounts: dictParams => Promise.t(response),
    getAllAssets: dictParams => Promise.t(response),
    getOrganization: unit => Promise.t(response),
    makeTransfers: Json.t => Promise.t(response),
    getTransfer: string => Promise.t(response),
    getAllTransfers: (string, dictParams) => Promise.t(response),
    destroyAccount: string => Promise.t(response),
    updateTags: (string, Array.t(string)) => Promise.t(response),
    resetOrganization: unit => Promise.t(response),
  };

  let make = t;
};

/* let mergeDicts = (dict1, dict2) => {
     let newDict = Js.Dict.empty();

     [|dict1, dict2|]
     |> Js.Array.forEach(dict =>
          Js.Dict.keys(dict)
          |> Js.Array.forEach(key =>
               Js.Dict.set(newDict, key, Js.Dict.unsafeGet(dict, key))
             )
        );

     newDict;
   }; */

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

    let baseRequest =
      request(
        ~host,
        ~headers,
        ~setAuthHeaders=partialSetAuthHeaders,
        ~debug=?options |> Options.debug,
      );

    let get = baseRequest(~method=Fetch.Get);
    let post = baseRequest(~method=Fetch.Post);
    let delete = baseRequest(~method=Fetch.Delete);
    let put = baseRequest(~method=Fetch.Put);

    Endpoints.make(
      ~createAccount=
        body =>
          post(Endpoints.Routes.accounts, ~body=?Js.Nullable.toOption(body)),
      ~getAccount=id => get(Endpoints.Routes.getAccount(id)),
      ~getAllAccounts=
        queryParams =>
          get(
            Endpoints.Routes.accounts,
            ~queryParams=?Js.Nullable.toOption(queryParams),
          ),
      ~getAllAssets=
        queryParams =>
          get(
            Endpoints.Routes.assets,
            ~queryParams=?Js.Nullable.toOption(queryParams),
          ),
      ~getOrganization=() => get(Endpoints.Routes.organizations),
      ~makeTransfers=
        (transferDTO) =>
          post(
            Endpoints.Routes.transfers,
            ~body=transferDTO,
          ),
      ~getTransfer=id => get(Endpoints.Routes.getTransfer(id)),
      ~getAllTransfers=
        (id, queryParams) =>
          get(
            Endpoints.Routes.getAllTransfers(id),
            ~queryParams=?Js.Nullable.toOption(queryParams),
          ),
      ~destroyAccount=id => delete(Endpoints.Routes.deleteAccount(id)),
      ~updateTags=
        (id, tags) =>
          put(
            Endpoints.Routes.updateTags(id),
            ~body=JsonUtil.asJson(EncapsulatedTags.make(~tags)),
          ),
      ~resetOrganization=() => post(Endpoints.Routes.resetOrganization),
    );
  };