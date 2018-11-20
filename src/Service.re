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
         | None =>
           Js.Promise.resolve(Js.Nullable.return(body |> Api.Response.data))
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

let get = (~host, ~headers, ~debug=false, path) => {
  if (debug) {
    Js.log("");
    Logger.log("Request", {"path": path, "headers": headers});
  };

  Fetch.fetchWithInit(
    host ++ path,
    Fetch.RequestInit.make(
      ~headers=Fetch.HeadersInit.makeWithDict(headers),
      (),
    ),
  )
  |> handleRequest(~debug);
};

let post = (~host, ~headers, ~body=?, ~debug=false, path) => {
  let strBody = JsonUtil.stringifyOption(body);

  if (debug) {
    Js.log("");
    Logger.log(
      "Request",
      {"path": path, "headers": headers, "body": strBody},
    );
  };

  Fetch.fetchWithInit(
    host ++ path,
    Fetch.RequestInit.make(
      ~method_=Post,
      ~body=Fetch.BodyInit.make(strBody),
      ~headers=Fetch.HeadersInit.makeWithDict(headers),
      (),
    ),
  )
  |> handleRequest(~debug);
};