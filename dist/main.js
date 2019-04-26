'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Util = require('util');
var CryptoJs = require('crypto-js');
var EncBase64 = require('crypto-js/enc-base64');

var out_of_memory = /* tuple */[
  "Out_of_memory",
  0
];

var sys_error = /* tuple */[
  "Sys_error",
  -1
];

var failure = /* tuple */[
  "Failure",
  -2
];

var invalid_argument = /* tuple */[
  "Invalid_argument",
  -3
];

var end_of_file = /* tuple */[
  "End_of_file",
  -4
];

var division_by_zero = /* tuple */[
  "Division_by_zero",
  -5
];

var not_found = /* tuple */[
  "Not_found",
  -6
];

var match_failure = /* tuple */[
  "Match_failure",
  -7
];

var stack_overflow = /* tuple */[
  "Stack_overflow",
  -8
];

var sys_blocked_io = /* tuple */[
  "Sys_blocked_io",
  -9
];

var assert_failure = /* tuple */[
  "Assert_failure",
  -10
];

var undefined_recursive_module = /* tuple */[
  "Undefined_recursive_module",
  -11
];

out_of_memory.tag = 248;

sys_error.tag = 248;

failure.tag = 248;

invalid_argument.tag = 248;

end_of_file.tag = 248;

division_by_zero.tag = 248;

not_found.tag = 248;

match_failure.tag = 248;

stack_overflow.tag = 248;

sys_blocked_io.tag = 248;

assert_failure.tag = 248;

undefined_recursive_module.tag = 248;
/*  Not a pure module */

function caml_array_sub(x, offset, len) {
  var result = new Array(len);
  var j = 0;
  var i = offset;
  while(j < len) {
    result[j] = x[i];
    j = j + 1 | 0;
    i = i + 1 | 0;
  }  return result;
}
/* No side effect */

function app(_f, _args) {
  while(true) {
    var args = _args;
    var f = _f;
    var arity = f.length;
    var len = args.length;
    var d = arity - len | 0;
    if (d === 0) {
      return f.apply(null, args);
    } else if (d < 0) {
      _args = caml_array_sub(args, arity, -d | 0);
      _f = f.apply(null, caml_array_sub(args, 0, arity));
      continue ;
    } else {
      return (function(f,args){
      return function (x) {
        return app(f, args.concat(/* array */[x]));
      }
      }(f,args));
    }
  }}

function curry_1(o, a0, arity) {
  switch (arity) {
    case 1 : 
        return o(a0);
    case 2 : 
        return (function (param) {
            return o(a0, param);
          });
    case 3 : 
        return (function (param, param$1) {
            return o(a0, param, param$1);
          });
    case 4 : 
        return (function (param, param$1, param$2) {
            return o(a0, param, param$1, param$2);
          });
    case 5 : 
        return (function (param, param$1, param$2, param$3) {
            return o(a0, param, param$1, param$2, param$3);
          });
    case 6 : 
        return (function (param, param$1, param$2, param$3, param$4) {
            return o(a0, param, param$1, param$2, param$3, param$4);
          });
    case 7 : 
        return (function (param, param$1, param$2, param$3, param$4, param$5) {
            return o(a0, param, param$1, param$2, param$3, param$4, param$5);
          });
    default:
      return app(o, /* array */[a0]);
  }
}

function _1(o, a0) {
  var arity = o.length;
  if (arity === 1) {
    return o(a0);
  } else {
    return curry_1(o, a0, arity);
  }
}

function curry_2(o, a0, a1, arity) {
  switch (arity) {
    case 1 : 
        return app(o(a0), /* array */[a1]);
    case 2 : 
        return o(a0, a1);
    case 3 : 
        return (function (param) {
            return o(a0, a1, param);
          });
    case 4 : 
        return (function (param, param$1) {
            return o(a0, a1, param, param$1);
          });
    case 5 : 
        return (function (param, param$1, param$2) {
            return o(a0, a1, param, param$1, param$2);
          });
    case 6 : 
        return (function (param, param$1, param$2, param$3) {
            return o(a0, a1, param, param$1, param$2, param$3);
          });
    case 7 : 
        return (function (param, param$1, param$2, param$3, param$4) {
            return o(a0, a1, param, param$1, param$2, param$3, param$4);
          });
    default:
      return app(o, /* array */[
                  a0,
                  a1
                ]);
  }
}

function _2(o, a0, a1) {
  var arity = o.length;
  if (arity === 2) {
    return o(a0, a1);
  } else {
    return curry_2(o, a0, a1, arity);
  }
}

function curry_3(o, a0, a1, a2, arity) {
  switch (arity) {
    case 1 : 
        return app(o(a0), /* array */[
                    a1,
                    a2
                  ]);
    case 2 : 
        return app(o(a0, a1), /* array */[a2]);
    case 3 : 
        return o(a0, a1, a2);
    case 4 : 
        return (function (param) {
            return o(a0, a1, a2, param);
          });
    case 5 : 
        return (function (param, param$1) {
            return o(a0, a1, a2, param, param$1);
          });
    case 6 : 
        return (function (param, param$1, param$2) {
            return o(a0, a1, a2, param, param$1, param$2);
          });
    case 7 : 
        return (function (param, param$1, param$2, param$3) {
            return o(a0, a1, a2, param, param$1, param$2, param$3);
          });
    default:
      return app(o, /* array */[
                  a0,
                  a1,
                  a2
                ]);
  }
}

function _3(o, a0, a1, a2) {
  var arity = o.length;
  if (arity === 3) {
    return o(a0, a1, a2);
  } else {
    return curry_3(o, a0, a1, a2, arity);
  }
}
/* No side effect */

var undefinedHeader = /* array */[];

function some(x) {
  if (x === undefined) {
    var block = /* tuple */[
      undefinedHeader,
      0
    ];
    block.tag = 256;
    return block;
  } else if (x !== null && x[0] === undefinedHeader) {
    var nid = x[1] + 1 | 0;
    var block$1 = /* tuple */[
      undefinedHeader,
      nid
    ];
    block$1.tag = 256;
    return block$1;
  } else {
    return x;
  }
}

function undefined_to_opt(x) {
  if (x === undefined) {
    return undefined;
  } else {
    return some(x);
  }
}

function valFromOption(x) {
  if (x !== null && x[0] === undefinedHeader) {
    var depth = x[1];
    if (depth === 0) {
      return undefined;
    } else {
      return /* tuple */[
              undefinedHeader,
              depth - 1 | 0
            ];
    }
  } else {
    return x;
  }
}
/* No side effect */

var max = 2147483647;

var min = -2147483648;
/* No side effect */

function floor_int(f) {
  if (f > max) {
    return max;
  } else if (f < min) {
    return min;
  } else {
    return Math.floor(f);
  }
}

var floor = floor_int;
/* No side effect */

function encodeRequestMethod(param) {
  if (typeof param === "number") {
    switch (param) {
      case 0 : 
          return "GET";
      case 1 : 
          return "HEAD";
      case 2 : 
          return "POST";
      case 3 : 
          return "PUT";
      case 4 : 
          return "DELETE";
      case 5 : 
          return "CONNECT";
      case 6 : 
          return "OPTIONS";
      case 7 : 
          return "TRACE";
      case 8 : 
          return "PATCH";
      
    }
  } else {
    return param[0];
  }
}

function encodeReferrerPolicy(param) {
  switch (param) {
    case 0 : 
        return "";
    case 1 : 
        return "no-referrer";
    case 2 : 
        return "no-referrer-when-downgrade";
    case 3 : 
        return "same-origin";
    case 4 : 
        return "origin";
    case 5 : 
        return "strict-origin";
    case 6 : 
        return "origin-when-cross-origin";
    case 7 : 
        return "strict-origin-when-cross-origin";
    case 8 : 
        return "unsafe-url";
    
  }
}

function encodeRequestMode(param) {
  switch (param) {
    case 0 : 
        return "navigate";
    case 1 : 
        return "same-origin";
    case 2 : 
        return "no-cors";
    case 3 : 
        return "cors";
    
  }
}

function encodeRequestCredentials(param) {
  switch (param) {
    case 0 : 
        return "omit";
    case 1 : 
        return "same-origin";
    case 2 : 
        return "include";
    
  }
}

function encodeRequestCache(param) {
  switch (param) {
    case 0 : 
        return "default";
    case 1 : 
        return "no-store";
    case 2 : 
        return "reload";
    case 3 : 
        return "no-cache";
    case 4 : 
        return "force-cache";
    case 5 : 
        return "only-if-cached";
    
  }
}

function encodeRequestRedirect(param) {
  switch (param) {
    case 0 : 
        return "follow";
    case 1 : 
        return "error";
    case 2 : 
        return "manual";
    
  }
}

function map(f, param) {
  if (param !== undefined) {
    return some(_1(f, valFromOption(param)));
  }
  
}

function make(method_, headers, body, referrer, $staropt$star, mode, credentials, cache, redirect, $staropt$star$1, keepalive) {
  var referrerPolicy = $staropt$star !== undefined ? $staropt$star : /* None */0;
  var integrity = $staropt$star$1 !== undefined ? $staropt$star$1 : "";
  var partial_arg = integrity;
  var partial_arg$1 = map(encodeRequestRedirect, redirect);
  var partial_arg$2 = map(encodeRequestCache, cache);
  var partial_arg$3 = map(encodeRequestCredentials, credentials);
  var partial_arg$4 = map(encodeRequestMode, mode);
  var partial_arg$5 = encodeReferrerPolicy(referrerPolicy);
  var partial_arg$6 = map(encodeRequestMethod, method_);
  return (function (param) {
      var tmp = { };
      if (partial_arg$6 !== undefined) {
        tmp.method = valFromOption(partial_arg$6);
      }
      if (headers !== undefined) {
        tmp.headers = valFromOption(headers);
      }
      if (body !== undefined) {
        tmp.body = valFromOption(body);
      }
      if (referrer !== undefined) {
        tmp.referrer = valFromOption(referrer);
      }
      if (partial_arg$5 !== undefined) {
        tmp.referrerPolicy = valFromOption(partial_arg$5);
      }
      if (partial_arg$4 !== undefined) {
        tmp.mode = valFromOption(partial_arg$4);
      }
      if (partial_arg$3 !== undefined) {
        tmp.credentials = valFromOption(partial_arg$3);
      }
      if (partial_arg$2 !== undefined) {
        tmp.cache = valFromOption(partial_arg$2);
      }
      if (partial_arg$1 !== undefined) {
        tmp.redirect = valFromOption(partial_arg$1);
      }
      if (partial_arg !== undefined) {
        tmp.integrity = valFromOption(partial_arg);
      }
      if (keepalive !== undefined) {
        tmp.keepalive = valFromOption(keepalive);
      }
      return tmp;
    });
}

var RequestInit = [make];
/* No side effect */

function get(dict, k) {
  if ((k in dict)) {
    return some(dict[k]);
  }
  
}
/* No side effect */

// Generated by BUCKLESCRIPT VERSION 4.0.18, PLEASE EDIT WITH CARE


var host = "https://0-9.api.swipetech.io";

var sandboxHost = "https://api-sandbox.swipetech.io";
/* No side effect */

// Generated by BUCKLESCRIPT VERSION 4.0.18, PLEASE EDIT WITH CARE

var blue = "\x1b[34m";

var red = "\x1b[31m";

var reset = "\x1b[0m";

function log(flag, value) {
  console.log("" + (String(blue) + ("[swp] " + (String(flag) + (":" + (String(reset) + ""))))), Util.inspect(value, false, null, true));
  return /* () */0;
}

function error(flag, value) {
  console.log("" + (String(red) + ("[swp] " + (String(flag) + (":" + (String(reset) + ""))))), Util.inspect(value, false, null, true));
  return /* () */0;
}
/* util Not a pure module */

// Generated by BUCKLESCRIPT VERSION 4.0.18, PLEASE EDIT WITH CARE

function stringifyOption(op) {
  if (op !== undefined) {
    var match = JSON.stringify(valFromOption(op));
    if (match !== undefined) {
      return match;
    } else {
      return "";
    }
  } else {
    return "";
  }
}
/* No side effect */

// Generated by BUCKLESCRIPT VERSION 4.0.18, PLEASE EDIT WITH CARE

((require("cross-fetch/polyfill")));

function handleResponse($staropt$star, res) {
  var debug = $staropt$star !== undefined ? $staropt$star : false;
  if (res.status === 204) {
    if (debug) {
      console.log("");
      log("Response", {
            url: res.url,
            status: res.status,
            statusText: res.statusText,
            headers: res.headers,
            body: "No content"
          });
    }
    return Promise.resolve(null);
  } else {
    return res.json().then((function (body) {
                    if (debug) {
                      console.log("");
                      log("Response", {
                            url: res.url,
                            status: res.status,
                            statusText: res.statusText,
                            headers: res.headers,
                            body: body
                          });
                    }
                    var error$$1 = body.error;
                    if (error$$1 == null) {
                      return Promise.resolve(body);
                    } else {
                      return Promise.reject(error$$1);
                    }
                  })).catch((function (err) {
                  if (debug) {
                    console.log("");
                    log("Response", {
                          url: res.url,
                          status: res.status,
                          statusText: res.statusText,
                          headers: res.headers
                        });
                  }
                  return Promise.reject(err);
                }));
  }
}

function handleError($staropt$star, errorResponse) {
  var debug = $staropt$star !== undefined ? $staropt$star : false;
  if (debug) {
    var errorLog = JSON.stringify(errorResponse);
    if (errorLog !== undefined) {
      console.log("");
      error("Error", errorLog);
    }
    
  }
  return Promise.reject(errorResponse);
}

function handleRequest(debug, req) {
  var partial_arg = debug;
  var partial_arg$1 = debug;
  return req.then((function (param) {
                  return handleResponse(partial_arg$1, param);
                })).catch((function (param) {
                return handleError(partial_arg, param);
              }));
}

function formatQueryParams(params) {
  return Object.keys(params).reduce((function (acc, key) {
                var match = get(params, key);
                if (match !== undefined) {
                  return "" + (String(acc) + ("" + (String(key) + ("=" + (String(valFromOption(match)) + "&")))));
                } else {
                  return acc;
                }
              }), "?");
}

function methodName(method_) {
  if (typeof method_ === "number") {
    switch (method_) {
      case 0 : 
          return "GET";
      case 2 : 
          return "POST";
      case 3 : 
          return "PUT";
      case 4 : 
          return "DELETE";
      case 1 : 
      case 5 : 
      case 6 : 
      case 7 : 
      case 8 : 
          return "Other";
      
    }
  } else {
    return "Other";
  }
}

function request(host$$1, headers, method_, body, queryParams, $staropt$star, path) {
  var debug = $staropt$star !== undefined ? $staropt$star : false;
  var queryParamsString = queryParams !== undefined ? formatQueryParams(valFromOption(queryParams)) : "";
  var strBody = stringifyOption(body);
  if (debug) {
    console.log("");
    log("Request", {
          method: methodName(method_),
          path: path,
          headers: headers,
          body: strBody,
          queryParams: queryParamsString
        });
  }
  var partial_arg = some(headers);
  var partial_arg$1 = method_;
  var partial_arg$2 = RequestInit[/* make */0];
  var baseOptions = function (param, param$1, param$2, param$3, param$4, param$5, param$6, param$7, param$8) {
    return partial_arg$2(partial_arg$1, partial_arg, param, param$1, param$2, param$3, param$4, param$5, param$6, param$7, param$8);
  };
  var options;
  var exit = 0;
  if (typeof method_ === "number" && method_ < 2) {
    options = app(baseOptions, [
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          /* () */0
        ]);
  } else {
    exit = 1;
  }
  if (exit === 1) {
    options = app(baseOptions, [
          some(strBody),
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          /* () */0
        ]);
  }
  return handleRequest(debug, fetch(host$$1 + (path + queryParamsString), options));
}
/*  Not a pure module */

// Generated by BUCKLESCRIPT VERSION 4.0.18, PLEASE EDIT WITH CARE

function make$2(prim, prim$1, prim$2, prim$3) {
  return {
          path: prim,
          method: prim$1,
          timestamp: prim$2,
          bodyString: prim$3
        };
}

function sign(secret, signatureParams) {
  var method_ = signatureParams.method;
  var timestamp = signatureParams.timestamp;
  var path = signatureParams.path;
  var bodyString = signatureParams.bodyString;
  var stringToSign = method_ + (timestamp + (path + bodyString));
  return EncBase64.stringify(CryptoJs.HmacSHA256(stringToSign, secret));
}

function setHeaders(apiKey, secret, path, method_, body, headers) {
  var bodyString = stringifyOption(body);
  var timestamp = String(floor(Date.now() / 1000.0));
  var signature = sign(secret, make$2(path, methodName(method_), timestamp, bodyString));
  headers["X-Swp-Api-Key"] = apiKey;
  headers["X-Swp-Signature"] = signature;
  headers["X-Swp-Timestamp"] = timestamp;
  return /* () */0;
}
/* crypto-js Not a pure module */

// Generated by BUCKLESCRIPT VERSION 4.0.18, PLEASE EDIT WITH CARE


var $$enum = {
  PT_BR: "pt-BR",
  EN_US: "en-US"
};

var Languages = /* module */[/* enum */$$enum];

var transfer = "TRANSFER";

var trailTransfer = "TRAIL_TRANSFER";

var createAccount = "CREATE_ACC";

var destroyAccount = "DESTROY_ACC";

var issueAsset = "ISSUE_ASSET";

var createOrganization = "CREATE_ORG";

var $$enum$1 = {
  Transfer: transfer,
  TrailTransfer: trailTransfer,
  CreateAccount: createAccount,
  DestroyAccount: destroyAccount,
  CreateOrganization: createOrganization,
  IssueAsset: issueAsset
};

var ActionTypes = /* module */[
  /* transfer */transfer,
  /* trailTransfer */trailTransfer,
  /* createAccount */createAccount,
  /* destroyAccount */destroyAccount,
  /* issueAsset */issueAsset,
  /* createOrganization */createOrganization,
  /* enum */$$enum$1
];

var text = "TEXT";

var hash = "HASH";

var $$enum$2 = {
  Text: text,
  Hash: hash
};

var MemoTypes = /* module */[
  /* text */text,
  /* hash */hash,
  /* enum */$$enum$2
];

var $$enum$3 = {
  Ok: "action_ok",
  Success: "action_success",
  Underfunded: "action_underfunded",
  NotProcessed: "action_not_processed"
};

var ActionCodes = /* module */[/* enum */$$enum$3];
/* No side effect */

// Generated by BUCKLESCRIPT VERSION 4.0.18, PLEASE EDIT WITH CARE

var languages = Languages[/* enum */0];

var actionTypes = ActionTypes[/* enum */6];

var actionCodes = ActionCodes[/* enum */0];

var memoTypes = MemoTypes[/* enum */2];

var Options = /* module */[];

var organizations = "/organizations";

var accounts = "/accounts";

var assets = "/assets";

var transfers = "/transfers";

var actions = "/actions";

var revoke = "/revoke";

var webhooks = "/webhooks";

function getAccount(id) {
  return "" + (String(accounts) + ("/" + (String(id) + "")));
}

function getAccountByAlias(alias) {
  return "" + (String(accounts) + ("/alias/" + (String(alias) + "")));
}

function getTransfer(id) {
  return "" + (String(transfers) + ("/" + (String(id) + "")));
}

function getAllTransfers(id) {
  return "" + (String(accounts) + ("/" + (String(id) + "/transfers")));
}

function updateTags(id) {
  return "" + (String("/tags") + ("/" + (String(id) + "")));
}

var resetOrganization = "" + (String(organizations) + "/reset");

var getRevokeToken = "" + (String(organizations) + ("" + (String(revoke) + "")));

function revokeCredentials(token) {
  return "" + (String(organizations) + ("" + (String(revoke) + ("/" + (String(token) + "")))));
}

function getActions(id) {
  return "" + (String(actions) + ("/" + (String(id) + "")));
}

function deleteWebhook(id) {
  return "" + (String(webhooks) + ("/" + (String(id) + "")));
}

function getWebhook(id) {
  return "" + (String(webhooks) + ("/" + (String(id) + "")));
}

function getUserPSPInfo(instantID) {
  return "/dns/" + (String(instantID) + "");
}

var Account = /* module */[];

var Asset = /* module */[];

var Transfer = /* module */[];

var Memo = /* module */[];

var TrailTransfer = /* module */[];

function memoHash(value) {
  return {
          type: MemoTypes[/* hash */1],
          value: value
        };
}

function memoText(value) {
  return {
          type: MemoTypes[/* text */0],
          value: value
        };
}

function sha256(value) {
  return CryptoJs.SHA256(value).toString();
}

function createAccountAction(acc) {
  if (acc == null) {
    return {
            type: ActionTypes[/* createAccount */2]
          };
  } else {
    var tmp = {
      type: ActionTypes[/* createAccount */2]
    };
    var tmp$1 = undefined_to_opt(acc.tags);
    if (tmp$1 !== undefined) {
      tmp.tags = valFromOption(tmp$1);
    }
    var tmp$2 = undefined_to_opt(acc.starting_balances);
    if (tmp$2 !== undefined) {
      tmp.starting_balances = valFromOption(tmp$2);
    }
    var tmp$3 = undefined_to_opt(acc.fields);
    if (tmp$3 !== undefined) {
      tmp.fields = valFromOption(tmp$3);
    }
    var tmp$4 = undefined_to_opt(acc.alias);
    if (tmp$4 !== undefined) {
      tmp.alias = valFromOption(tmp$4);
    }
    return tmp;
  }
}

function issueAssetAction(asset) {
  var tmp = {
    type: ActionTypes[/* issueAsset */4],
    code: asset.code
  };
  var tmp$1 = undefined_to_opt(asset.limit);
  if (tmp$1 !== undefined) {
    tmp.limit = valFromOption(tmp$1);
  }
  var tmp$2 = undefined_to_opt(asset.tags);
  if (tmp$2 !== undefined) {
    tmp.tags = valFromOption(tmp$2);
  }
  return tmp;
}

function transferAction(transfer) {
  return {
          type: ActionTypes[/* transfer */0],
          from: transfer.from,
          to: transfer.to,
          asset: transfer.asset,
          amount: transfer.amount
        };
}

function trailTransferAction(transfer) {
  return {
          type: ActionTypes[/* trailTransfer */1],
          from: transfer.from,
          to: transfer.to,
          asset: transfer.asset,
          amount: transfer.amount
        };
}

function init(options) {
  var match = options.customHost;
  var host$$1;
  if (match !== undefined) {
    host$$1 = match;
  } else {
    var match$1 = options.sandbox;
    host$$1 = match$1 !== undefined && match$1 ? sandboxHost : host;
  }
  var match$2 = options.language;
  var language = match$2 !== undefined ? match$2 : languages.PT_BR;
  var headers = { };
  headers["Content-Type"] = "application/json";
  headers["Accept-Language"] = language;
  var partial_arg = options.secret;
  var partial_arg$1 = options.apiKey;
  var partialSetAuthHeaders = function (param, param$1, param$2, param$3) {
    return setHeaders(partial_arg$1, partial_arg, param, param$1, param$2, param$3);
  };
  var arg = options.debug;
  var arg$1 = arg === undefined ? undefined : some(arg);
  var baseRequest = function (param) {
    var func = function (param$1, param$2, param$3, param$4, param$5) {
      var param$6 = param;
      var param$7 = param$1;
      var param$8 = param$2;
      var param$9 = param$3;
      var param$10 = param$4;
      var param$11 = param$5;
      var host$1$$1 = host$$1;
      var headers$1 = headers;
      var method_ = param$6;
      var setAuthHeaders = param$7;
      var body = param$8;
      var queryParams = param$9;
      var debug = param$10;
      var path = param$11;
      _3(setAuthHeaders, path, body, headers$1);
      return request(host$1$$1, headers$1, method_, body, queryParams, debug, path);
    };
    return (function (param) {
        var func$1 = _1(func, param);
        return (function (param, param$1) {
            return _3(func$1, param, param$1, arg$1);
          });
      });
  };
  var get = baseRequest(/* Get */0)((function (param) {
          return _2(partialSetAuthHeaders, param, /* Get */0);
        }));
  var post = baseRequest(/* Post */2)((function (param) {
          return _2(partialSetAuthHeaders, param, /* Post */2);
        }));
  var $$delete = baseRequest(/* Delete */4)((function (param) {
          return _2(partialSetAuthHeaders, param, /* Delete */4);
        }));
  var put = baseRequest(/* Put */3)((function (param) {
          return _2(partialSetAuthHeaders, param, /* Put */3);
        }));
  var prim = function (signature, signatureParams) {
    return signature === sign(options.secret, signatureParams);
  };
  var prim$1 = function (param) {
    return _3(get, undefined, undefined, organizations);
  };
  var prim$2 = function (param) {
    return _3(post, undefined, undefined, resetOrganization);
  };
  var prim$3 = function (id) {
    return _3(get, undefined, undefined, getAccount(id));
  };
  var prim$4 = function (alias) {
    return _3(get, undefined, undefined, getAccountByAlias(alias));
  };
  var prim$5 = function (queryParams) {
    return _3(get, undefined, (queryParams == null) ? undefined : some(queryParams), accounts);
  };
  var prim$6 = function (body) {
    return _3(post, (body == null) ? undefined : some(body), undefined, accounts);
  };
  var prim$7 = function (id) {
    return _3($$delete, undefined, undefined, getAccount(id));
  };
  var prim$8 = function (body) {
    return _3(post, some(body), undefined, assets);
  };
  var prim$9 = function (queryParams) {
    return _3(get, undefined, (queryParams == null) ? undefined : some(queryParams), assets);
  };
  var prim$10 = function (id) {
    return _3(get, undefined, undefined, getTransfer(id));
  };
  var prim$11 = function (id, queryParams) {
    return _3(get, undefined, (queryParams == null) ? undefined : some(queryParams), getAllTransfers(id));
  };
  var prim$12 = function (body) {
    return _3(post, some(body), undefined, transfers);
  };
  var prim$13 = function (id, tags) {
    return _3(put, {
                tags: tags
              }, undefined, updateTags(id));
  };
  var prim$14 = function (id) {
    return _3(get, undefined, undefined, getActions(id));
  };
  var prim$15 = function (body) {
    return _3(post, some(body), undefined, actions);
  };
  var prim$16 = function (param) {
    return _3(get, undefined, undefined, getRevokeToken);
  };
  var prim$17 = function (token) {
    return _3(post, undefined, undefined, revokeCredentials(token));
  };
  var prim$18 = function (body) {
    return _3(post, some(body), undefined, webhooks);
  };
  var prim$19 = function (id) {
    return _3($$delete, undefined, undefined, deleteWebhook(id));
  };
  var prim$20 = function (id) {
    return _3(get, undefined, undefined, getWebhook(id));
  };
  var prim$21 = function (instantID) {
    return _3(get, undefined, undefined, getUserPSPInfo(instantID));
  };
  return {
          checkSignature: prim,
          getOrganization: prim$1,
          resetOrganization: prim$2,
          getAccount: prim$3,
          getAccountByAlias: prim$4,
          getAllAccounts: prim$5,
          createAccount: prim$6,
          destroyAccount: prim$7,
          issueAsset: prim$8,
          getAllAssets: prim$9,
          getTransfer: prim$10,
          getAllTransfers: prim$11,
          makeTransfers: prim$12,
          updateTags: prim$13,
          getActionBatch: prim$14,
          makeActionBatch: prim$15,
          getRevokeToken: prim$16,
          revokeCredentials: prim$17,
          createWebhook: prim$18,
          deleteWebhook: prim$19,
          getWebhook: prim$20,
          getUserPSPInfo: prim$21
        };
}

var Endpoints = [];
/* resetOrganization Not a pure module */

exports.Options = Options;
exports.Endpoints = Endpoints;
exports.Account = Account;
exports.Asset = Asset;
exports.Transfer = Transfer;
exports.TrailTransfer = TrailTransfer;
exports.Memo = Memo;
exports.languages = languages;
exports.actionTypes = actionTypes;
exports.actionCodes = actionCodes;
exports.memoTypes = memoTypes;
exports.memoHash = memoHash;
exports.memoText = memoText;
exports.sha256 = sha256;
exports.createAccountAction = createAccountAction;
exports.issueAssetAction = issueAssetAction;
exports.transferAction = transferAction;
exports.trailTransferAction = trailTransferAction;
exports.init = init;
