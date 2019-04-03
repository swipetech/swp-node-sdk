let setHeaders = (~apiKey, ~secret, ~path, ~method, ~body=?, headers) => {
  let strBody = JsonUtil.stringifyOption(body);
  let timestamp = string_of_int(Js.Math.floor(Js.Date.now() /. 1000.0));

  let hmac = Crypto.hmacSHA256(Service.methodName(method) ++ timestamp ++ path ++ strBody, secret);
  let signature = Crypto.base64Stringify(hmac);

  Js.Dict.set(headers, "X-Swp-Api-Key", apiKey);
  Js.Dict.set(headers, "X-Swp-Signature", signature);
  Js.Dict.set(headers, "X-Swp-Timestamp", timestamp);

  ();
};
