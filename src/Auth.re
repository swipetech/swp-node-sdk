let setHeaders = (~apiKey, ~secret, ~path, ~body=?, headers) => {
  let strBody = JsonUtil.stringifyOption(body);

  let hmac = Crypto.hmacSHA384(path ++ strBody, secret);
  let signature = Crypto.base64Stringify(hmac);

  Js.Dict.set(headers, "X-Swp-Api-Key", apiKey);
  Js.Dict.set(headers, "X-Swp-Signature", signature);

  ();
};