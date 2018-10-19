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

let handleResponse = (~debug=false, res) => {
  if (debug) {
    Js.log("");
    Logger.log(
      "Fetch response",
      {
        "url": res |> Fetch.Response.url,
        "status": res |> Fetch.Response.status,
        "statusText": res |> Fetch.Response.statusText,
        "headers": res |> Fetch.Response.headers,
      },
    );
    Js.log("");
  };

  if (res |> Fetch.Response.status == 204) {
    if (debug) {
      Logger.log("Response body", "No content");
      Js.log("");
    };

    Js.Promise.resolve(Js.Nullable.null);
  } else {
    res
    |> Fetch.Response.json
    |> Js.Promise.then_(body => {
         if (debug) {
           Logger.log("Response body", body);
           Js.log("");
         };

         let body = Api.Response.asResponse(body);
         let error = body |> Api.Response.error;

         switch (Js.Nullable.toOption(error)) {
         | Some(e) => Js.Promise.reject(asExn(e))
         | None =>
           Js.Promise.resolve(Js.Nullable.return(body |> Api.Response.data))
         };
       })
    |> Js.Promise.catch(err => Js.Promise.reject(asExn(err)));
  };
};

let handleError = (~debug=false, errorResponse) => {
  if (debug) {
    let errorLog = Js.Json.stringifyAny(errorResponse);
    switch (errorLog) {
    | Some(err) => Logger.error("Error", err)
    | None => ()
    };
  };

  Js.Promise.reject(asExn(errorResponse));
};

let handleRequest = (~debug, req) =>
  Js.Promise.(
    req |> then_(handleResponse(~debug)) |> catch(handleError(~debug))
  );

let sse = (~headers, ~sandbox=false, path) =>
  EventSource.make(
    (sandbox ? sandboxHost : host) ++ path,
    EventSource.Options.make(~headers),
  );

let get = (~host, ~headers, ~debug=false, path) => {
  if (debug) {
    Js.log("");
    Logger.log("Path", path);
    Logger.log("Headers", headers);
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
    Logger.log("Path", path);
    Logger.log("Headers", headers);
    Logger.log("Body", strBody);
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