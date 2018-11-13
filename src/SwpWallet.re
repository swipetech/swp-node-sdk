let languages = Enums.Languages.enum;
let operationTypes = Enums.OpTypes.enum;
let operationCodes = Enums.OpCodes.enum;

let get = (~host, ~headers, ~setAuthHeaders, ~debug=?, path) => {
  setAuthHeaders(~path, ~body=?None, headers);

  Service.get(~host, ~headers, ~debug?, path);
};

let post = (~host, ~headers, ~body=?, ~setAuthHeaders, ~debug=?, path) => {
  setAuthHeaders(~path, ~body?, headers);

  Service.post(~host, ~headers, ~body?, ~debug?, path);
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

module Data = {
  module Receipt = {
    type t;
  };

  [@bs.deriving abstract]
  type t('a) = {
    receipt: Receipt.t,
    value: 'a,
  };

  external asData: 'a => t('a) = "%identity";

  let make = t;
};

module TransferCompat = {
  open Js;

  module OperationCompat = {
    [@bs.deriving abstract]
    type t = {
      from: string,
      [@bs.as "to"]
      to_: string,
      asset: string,
      amount: float,
      [@bs.optional]
      opCode: string,
    };

    let make = t;
  };

  [@bs.deriving abstract]
  type t = {
    [@bs.optional]
    id: string,
    operations: Array.t(OperationCompat.t),
  };

  let make = t;
};

module Transfer = {
  open Js;

  module Operation = {
    [@bs.deriving abstract]
    type t = {
      from: string,
      [@bs.as "to"]
      to_: string,
      asset: string,
      amount: string,
      [@bs.optional]
      opCode: string,
    };

    let make = t;
  };

  [@bs.deriving abstract]
  type t = {
    [@bs.optional]
    id: string,
    operations: Array.t(Operation.t),
  };

  external asTransfer: 'a => t = "%identity";

  let make = t;
};

module Endpoints = {
  open Js;

  module Routes = {
    let organizations = "/organizations";
    let accounts = "/accounts";
    let assets = "/assets";
    let transfers = "/transfers";

    let getAccount = id => {j|$accounts/$id|j};
    let getTransfer = id => {j|$transfers/$id|j};
  };

  type response = Nullable.t(Service.data);

  [@bs.deriving abstract]
  type t = {
    createAccount: unit => Promise.t(response),
    getAccount: string => Promise.t(response),
    getAllAccounts: unit => Promise.t(response),
    getAllAssets: unit => Promise.t(response),
    getOrganization: unit => Promise.t(response),
    makeTransfer:
      Array.t(TransferCompat.OperationCompat.t) =>
      Promise.t(Data.t(TransferCompat.t)),
    getTransfer: string => Promise.t(response),
  };

  let make = t;
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

    Endpoints.make(
      ~createAccount=() => postToRoute(Endpoints.Routes.accounts),
      ~getAccount=id => getRoute(Endpoints.Routes.getAccount(id)),
      ~getAllAccounts=() => getRoute(Endpoints.Routes.accounts),
      ~getAllAssets=() => getRoute(Endpoints.Routes.assets),
      ~getOrganization=() => getRoute(Endpoints.Routes.organizations),
      ~makeTransfer=
        ops_compat => {
          let operations =
            ops_compat
            |> Js.Array.map(op =>
                 Transfer.Operation.make(
                   ~from=TransferCompat.OperationCompat.from(op),
                   ~to_=TransferCompat.OperationCompat.to_(op),
                   ~asset=TransferCompat.OperationCompat.asset(op),
                   ~amount=
                     string_of_float(
                       TransferCompat.OperationCompat.amount(op),
                     ),
                   (),
                 )
               );

          postToRoute(
            Endpoints.Routes.transfers,
            ~body=JsonUtil.asJson(Transfer.make(~operations, ())),
          )
          |> Js.Promise.then_(a => Js.Promise.resolve(Data.asData(a)))
          |> Js.Promise.then_(data => {
               let transfer = Data.value(data) |> Transfer.asTransfer;
               let operations =
                 Transfer.operations(transfer)
                 |> Js.Array.map(op =>
                      TransferCompat.OperationCompat.make(
                        ~opCode=?Transfer.Operation.opCode(op),
                        ~from=Transfer.Operation.from(op),
                        ~to_=Transfer.Operation.to_(op),
                        ~asset=Transfer.Operation.asset(op),
                        ~amount=
                          float_of_string(Transfer.Operation.amount(op)),
                        (),
                      )
                    );

               let resData =
                 Data.make(
                   ~receipt=Data.receipt(data),
                   ~value=
                     TransferCompat.make(
                       ~id=?Transfer.id(transfer),
                       ~operations,
                       (),
                     ),
                 );

               Js.Promise.resolve(resData);
             });
        },
      ~getTransfer=id => getRoute(Endpoints.Routes.getTransfer(id)),
    );
  };