module SignatureParams = {
  [@bs.deriving abstract]
  type t = {
    path: string,
    method: string,
    timestamp: string,
    bodyString: string,
  };

  let make = t;
};

let sign = (~secret, ~signatureParams) => {
  let method = signatureParams |> SignatureParams.methodGet;
  let timestamp = signatureParams |> SignatureParams.timestampGet;
  let path = signatureParams |> SignatureParams.pathGet;
  let bodyString = signatureParams |> SignatureParams.bodyStringGet;

  let stringToSign = method ++ timestamp ++ path ++ bodyString;

  let hmac = Crypto.hmacSHA256(stringToSign, secret);
  Crypto.base64Stringify(hmac);
};

let setHeaders = (~apiKey, ~secret, ~path, ~method, ~body=?, headers) => {
  let bodyString = JsonUtil.stringifyOption(body);
  let timestamp = string_of_int(Js.Math.floor(Js.Date.now() /. 1000.0));

  let signature =
    sign(
      ~secret,
      ~signatureParams=
        SignatureParams.make(
          ~method=Service.methodName(method),
          ~timestamp,
          ~path,
          ~bodyString,
        ),
    );

  Js.Dict.set(headers, "X-Swp-Api-Key", apiKey);
  Js.Dict.set(headers, "X-Swp-Signature", signature);
  Js.Dict.set(headers, "X-Swp-Timestamp", timestamp);

  ();
};
