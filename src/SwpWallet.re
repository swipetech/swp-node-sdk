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

/* let sse =
       (
         ~headers,
         ~setAuthHeaders,
         ~callback,
         ~eventName,
         ~debug=false,
         ~sandbox=?,
         path,
       ) => {
     setAuthHeaders(~path, ~body=?None, headers);

     let es = Service.sse(~headers, ~sandbox?, path);

     es
     |> EventSource.(
          addEventListener(
            eventName,
            e => {
              if (debug) {
                Js.log(e);
              };

              callback(e |> Event.data);
            },
          )
        );

     es;
   }; */

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

module Payment = {
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
    let payments = "/payments";

    let getAccount = id => {j|$accounts/$id|j};
    let getPayment = id => {j|$payments/$id|j};
    /* let accountPayments = id => {j|$accounts/$id/payments|j}; */
  };

  type response = Nullable.t(Service.data);

  [@bs.deriving abstract]
  type t = {
    createAccount: unit => Promise.t(response),
    getAccount: string => Promise.t(response),
    getAllAccounts: unit => Promise.t(response),
    getAllAssets: unit => Promise.t(response),
    getOrganization: unit => Promise.t(response),
    makePayment: Array.t(Payment.t) => Promise.t(response),
    getPayment: string => Promise.t(response),
    /* monitorPaymentsToAccount: (string, Json.t => unit) => EventSource.t,
       monitorPaymentsToOrg: (Json.t => unit) => EventSource.t, */
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

    /* let openSse =
       sse(
         ~host,
         ~headers,
         ~setAuthHeaders=partialSetAuthHeaders,
         ~debug=?options |> Options.debug,
       ); */

    Endpoints.make(
      ~createAccount=() => postToRoute(Endpoints.Routes.accounts),
      ~getAccount=id => getRoute(Endpoints.Routes.getAccount(id)),
      ~getAllAccounts=() => getRoute(Endpoints.Routes.accounts),
      ~getAllAssets=() => getRoute(Endpoints.Routes.assets),
      ~getOrganization=() => getRoute(Endpoints.Routes.organizations),
      ~makePayment=
        operations =>
          postToRoute(
            Endpoints.Routes.payments,
            ~body=JsonUtil.asJson(Payment.batch(~operations)),
          ),
      ~getPayment=id => getRoute(Endpoints.Routes.getPayment(id)),
      /* ~monitorPaymentsToAccount=
           (id, callback) =>
             openSse(
               Endpoints.Routes.accountPayments(id),
               ~eventName="payment",
               ~callback,
             ),
         ~monitorPaymentsToOrg=
           callback =>
             openSse(Endpoints.Routes.payments, ~eventName="payment", ~callback), */
    );
  };