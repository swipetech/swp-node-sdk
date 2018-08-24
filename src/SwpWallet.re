let get = (~headers, ~setAuthHeaders, ~debug=?, ~sandbox=?, path) => {
  setAuthHeaders(~path, ~body=?None, headers);

  Service.get(~headers, ~debug?, ~sandbox?, path);
};

let post = (~headers, ~body=?, ~setAuthHeaders, ~debug=?, ~sandbox=?, path) => {
  setAuthHeaders(~path, ~body?, headers);

  Service.post(~headers, ~body?, ~debug?, ~sandbox?, path);
};

let sse =
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

  (.) => es |> EventSource.close();
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
    };
};

module Payment = {
  open Js;

  type t;

  [@bs.deriving abstract]
  type batch = {payments: Array.t(t)};
};

module Endpoints = {
  open Js;

  module Routes = {
    let accounts = "/accounts";
    let getAccount = id => {j|$accounts/$id|j};
    let organizations = "/organizations";
    let assets = {j|$organizations/assets|j};
    let payments = "/payments";
    let paymentBatches = "/payment-batches";
    let streamPayments = id => {j|/streams$accounts/$id|j};
  };

  type response = Nullable.t(Service.data);
  type stream;

  [@bs.deriving abstract]
  type t = {
    createAccount: unit => Promise.t(response),
    getAccount: string => Promise.t(response),
    getAllAccounts: unit => Promise.t(response),
    getAssets: unit => Promise.t(response),
    getOrganization: unit => Promise.t(response),
    paymentBatch: Array.t(Payment.t) => Promise.t(response),
    makePayment: Payment.t => Promise.t(response),
    streamPayments: (string, Json.t => unit) => (. unit) => unit,
  };

  let make = t;
};

let init: Options.t => Endpoints.t =
  options => {
    let language =
      switch (options |> Options.language) {
      | None => "pt-br"
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
        ~headers,
        ~setAuthHeaders=partialSetAuthHeaders,
        ~debug=?options |> Options.debug,
        ~sandbox=?options |> Options.sandbox,
      );

    let postToRoute =
      post(
        ~headers,
        ~setAuthHeaders=partialSetAuthHeaders,
        ~debug=?options |> Options.debug,
        ~sandbox=?options |> Options.sandbox,
      );

    let openSse =
      sse(
        ~headers,
        ~setAuthHeaders=partialSetAuthHeaders,
        ~debug=?options |> Options.debug,
        ~sandbox=?options |> Options.sandbox,
      );

    Endpoints.make(
      ~createAccount=() => postToRoute(Endpoints.Routes.accounts),
      ~getAccount=id => getRoute(Endpoints.Routes.getAccount(id)),
      ~getAllAccounts=() => getRoute(Endpoints.Routes.accounts),
      ~getAssets=() => getRoute(Endpoints.Routes.assets),
      ~getOrganization=() => getRoute(Endpoints.Routes.organizations),
      ~makePayment=
        body =>
          postToRoute(
            ~body=JsonUtil.asJson(body),
            Endpoints.Routes.payments,
          ),
      ~paymentBatch=
        payments =>
          postToRoute(
            ~body=JsonUtil.asJson(Payment.batch(~payments)),
            Endpoints.Routes.paymentBatches,
          ),
      ~streamPayments=
        (id, callback) =>
          openSse(
            Endpoints.Routes.streamPayments(id),
            ~eventName="payment",
            ~callback,
          ),
    );
  };