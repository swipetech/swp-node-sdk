let setHeaders = (~apiKey, ~secret, ~path, ~body=?, headers) => {
  let timestamp = string_of_int @@ Js.Math.floor(Js.Date.now() /. 1000.0);

  let strBody = JsonUtil.stringifyOption(body);

  let hmac = Crypto.hmacSHA384(timestamp ++ path ++ strBody, secret);
  let signature = Crypto.base64Stringify(hmac);

  Js.Dict.set(headers, "X-Swp-Api-Key", apiKey);
  Js.Dict.set(headers, "X-Swp-Signature", signature);
  Js.Dict.set(headers, "X-Swp-Timestamp", timestamp);

  ();
};