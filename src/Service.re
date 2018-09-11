[%bs.raw {|require("cross-fetch/polyfill")|}];

let host = Config.host;
let sandboxHost = Config.sandboxHost;

type data;
type fieldError;

module Api = {
  module Error = {
    [@bs.deriving abstract]
    type t = {
      [@bs.optional]
      code: string,
      [@bs.optional]
      message: string,
      [@bs.optional] [@bs.as "field_errors"]
      fieldErrors: Js.Array.t(fieldError),
    };

    let make = t;
  };

  module Response = {
    [@bs.deriving abstract]
    type t = {
      data,
      [@bs.optional]
      error: Error.t,
    };

    external asResponse : Js.Json.t => t = "%identity";
  };
};

external asExn : 'a => exn = "%identity";

let handleResponse = res =>
  if (res |> Fetch.Response.status == 204) {
    Js.Promise.resolve(Js.Nullable.null);
  } else {
    res
    |> Fetch.Response.json
    |> Js.Promise.then_(body => {
         let body = Api.Response.asResponse(body);
         let error = body |> Api.Response.error;

         switch (error) {
         | Some(_) => Js.Promise.reject(asExn(body))
         | None =>
           Js.Promise.resolve(Js.Nullable.return(body |> Api.Response.data))
         };
       })
    |> Js.Promise.catch(err => Js.Promise.reject(asExn(err)));
  };

let handleError = (~debug=false, errorResponse) => {
  if (debug) {
    let errorLog = Js.Json.stringifyAny(errorResponse);
    switch (errorLog) {
    | Some(err) => Js.log2("[WalletSDK] Error:", err)
    | None => ()
    };
  };

  Js.Promise.reject(asExn(errorResponse));
};

let handleRequest = (~debug, req) =>
  Js.Promise.(req |> then_(handleResponse) |> catch(handleError(~debug)));

let sse = (~headers, ~sandbox=false, path) =>
  EventSource.make(
    (sandbox ? sandboxHost : host) ++ path,
    EventSource.Options.make(~headers),
  );

let get = (~headers, ~debug=false, ~sandbox=false, path) => {
  if (debug) {
    Js.log2("[WalletSDK] Path:", path);
    Js.log2("[WalletSDK] Headers:", headers);
  };

  Fetch.fetchWithInit(
    (sandbox ? sandboxHost : host) ++ path,
    Fetch.RequestInit.make(
      ~headers=Fetch.HeadersInit.makeWithDict(headers),
      (),
    ),
  )
  |> handleRequest(~debug);
};

let post = (~headers, ~body=?, ~debug=false, ~sandbox=false, path) => {
  let strBody = JsonUtil.stringifyOption(body);

  if (debug) {
    Js.log2("[WalletSDK] Path:", path);
    Js.log2("[WalletSDK] Headers:", headers);
    Js.log2("[WalletSDK] Body:", strBody);
  };

  Fetch.fetchWithInit(
    (sandbox ? sandboxHost : host) ++ path,
    Fetch.RequestInit.make(
      ~method_=Post,
      ~body=Fetch.BodyInit.make(strBody),
      ~headers=Fetch.HeadersInit.makeWithDict(headers),
      (),
    ),
  )
  |> handleRequest(~debug);
};