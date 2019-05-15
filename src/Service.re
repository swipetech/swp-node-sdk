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
      error: Js.Nullable.t(Error.t),
    };

    external asResponse: Js.Json.t => t = "%identity";
  };
};

external asExn: 'a => exn = "%identity";

let handleResponse = (~debug=false, res) =>
  if (res |> Fetch.Response.status == 204) {
    if (debug) {
      Js.log("");
      Logger.log(
        "Response",
        {
          "url": res |> Fetch.Response.url,
          "status": res |> Fetch.Response.status,
          "statusText": res |> Fetch.Response.statusText,
          "headers": res |> Fetch.Response.headers,
          "body": "No content",
        },
      );
    };

    Js.Promise.resolve(Js.Nullable.null);
  } else {
    res
    |> Fetch.Response.json
    |> Js.Promise.then_(body => {
         if (debug) {
           Js.log("");
           Logger.log(
             "Response",
             {
               "url": res |> Fetch.Response.url,
               "status": res |> Fetch.Response.status,
               "statusText": res |> Fetch.Response.statusText,
               "headers": res |> Fetch.Response.headers,
               "body": body,
             },
           );
         };

         let body = Api.Response.asResponse(body);
         let error = body |> Api.Response.error;

         switch (Js.Nullable.toOption(error)) {
         | Some(e) => Js.Promise.reject(asExn(e))
         | None => Js.Promise.resolve(Js.Nullable.return(body))
         };
       })
    |> Js.Promise.catch(err => {
         if (debug) {
           Js.log("");
           Logger.log(
             "Response",
             {
               "url": res |> Fetch.Response.url,
               "status": res |> Fetch.Response.status,
               "statusText": res |> Fetch.Response.statusText,
               "headers": res |> Fetch.Response.headers,
             },
           );
         };
         Js.Promise.reject(asExn(err));
       });
  };

let handleError = (~debug=false, errorResponse) => {
  if (debug) {
    let errorLog = Js.Json.stringifyAny(errorResponse);
    switch (errorLog) {
    | Some(err) =>
      Js.log("");
      Logger.error("Error", err);
    | None => ()
    };
  };

  Js.Promise.reject(asExn(errorResponse));
};

let handleRequest = (~debug, req) =>
  Js.Promise.(
    req |> then_(handleResponse(~debug)) |> catch(handleError(~debug))
  );

let formatQueryParams = params =>
  params
  |> Js.Dict.keys
  |> Js.Array.reduce(
       (acc, key) =>
         switch (Js.Dict.get(params, key)) {
         | Some(k) => {j|$acc$key=$k&|j}
         | None => acc
         },
       "?",
     );

let methodName = method =>
  switch (method) {
  | Fetch.Post => "POST"
  | Fetch.Put => "PUT"
  | Fetch.Delete => "DELETE"
  | Fetch.Get => "GET"
  | _ => "Other"
  };

let request =
    (~host, ~headers, ~method, ~body=?, ~queryParams=?, ~debug=false, path) => {
  let queryParamsString =
    switch (queryParams) {
    | Some(q) => formatQueryParams(q)
    | None => ""
    };

  let strBody = JsonUtil.stringifyOption(body);

  if (debug) {
    Js.log("");
    Logger.log(
      "Request",
      {
        "method": methodName(method),
        "host": host,
        "path": path,
        "headers": headers,
        "body": strBody,
        "queryParams": queryParamsString,
      },
    );
  };

  let baseOptions =
    Fetch.RequestInit.make(
      ~method_=method,
      ~headers=Fetch.HeadersInit.makeWithDict(headers),
    );

  let options =
    switch (method) {
    | Fetch.Head
    | Fetch.Get => baseOptions()
    | _ => baseOptions(~body=Fetch.BodyInit.make(strBody), ())
    };

  Fetch.fetchWithInit(host ++ path ++ queryParamsString, options)
  |> handleRequest(~debug);
};
