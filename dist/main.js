'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var CryptoJs = require('crypto-js');
var EncBase64 = require('crypto-js/enc-base64');
require('eventsource');

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
    var arity$1 = arity === 0 ? 1 : arity;
    var len = args.length;
    var d = arity$1 - len | 0;
    if (d === 0) {
      return f.apply(null, args);
    } else if (d < 0) {
      _args = caml_array_sub(args, arity$1, -d | 0);
      _f = f.apply(null, caml_array_sub(args, 0, arity$1));
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
  if (arity > 7 || arity < 0) {
    return app(o, /* array */[a0]);
  } else {
    switch (arity) {
      case 0 : 
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
      
    }
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

function curry_3(o, a0, a1, a2, arity) {
  var exit = 0;
  if (arity > 7 || arity < 0) {
    return app(o, /* array */[
                a0,
                a1,
                a2
              ]);
  } else {
    switch (arity) {
      case 0 : 
      case 1 : 
          exit = 1;
          break;
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
      
    }
  }
  if (exit === 1) {
    return app(o(a0), /* array */[
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

function undefined_to_opt(x) {
  if (x === undefined) {
    return /* None */0;
  } else {
    return /* Some */[x];
  }
}
/* No side effect */

// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE


function stringifyOption(op) {
  if (op) {
    var match = JSON.stringify(op[0]);
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

// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE

function setHeaders(apiKey, secret, path, body, headers) {
  var strBody = stringifyOption(body);
  var hmac = CryptoJs.HmacSHA384(path + strBody, secret);
  var signature = EncBase64.stringify(hmac);
  headers["X-Swp-Api-Key"] = apiKey;
  headers["X-Swp-Signature"] = signature;
  return /* () */0;
}
/* crypto-js Not a pure module */

// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE


var $$enum = {
  PT_BR: "pt-BR",
  EN_US: "en-US"
};

var Languages = /* module */[/* enum */$$enum];

var $$enum$1 = {
  Payment: "payment",
  CreateAccount: "create_account",
  CreateOrganization: "create_organization",
  IssueAsset: "issue_asset",
  ChangeTrust: "change_trust"
};

var OpTypes = /* module */[/* enum */$$enum$1];
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
  if (param) {
    return /* Some */[_1(f, param[0])];
  } else {
    return /* None */0;
  }
}

function make(method_, headers, body, referrer, $staropt$star, mode, credentials, cache, redirect, $staropt$star$1, keepalive) {
  var referrerPolicy = $staropt$star ? $staropt$star[0] : /* None */0;
  var integrity = $staropt$star$1 ? $staropt$star$1[0] : "";
  var partial_arg = /* Some */[integrity];
  var partial_arg$1 = map(encodeRequestRedirect, redirect);
  var partial_arg$2 = map(encodeRequestCache, cache);
  var partial_arg$3 = map(encodeRequestCredentials, credentials);
  var partial_arg$4 = map(encodeRequestMode, mode);
  var partial_arg$5 = /* Some */[encodeReferrerPolicy(referrerPolicy)];
  var partial_arg$6 = map(encodeRequestMethod, method_);
  return (function () {
      var tmp = { };
      if (partial_arg$6) {
        tmp.method = partial_arg$6[0];
      }
      if (headers) {
        tmp.headers = headers[0];
      }
      if (body) {
        tmp.body = body[0];
      }
      if (referrer) {
        tmp.referrer = referrer[0];
      }
      if (partial_arg$5) {
        tmp.referrerPolicy = partial_arg$5[0];
      }
      if (partial_arg$4) {
        tmp.mode = partial_arg$4[0];
      }
      if (partial_arg$3) {
        tmp.credentials = partial_arg$3[0];
      }
      if (partial_arg$2) {
        tmp.cache = partial_arg$2[0];
      }
      if (partial_arg$1) {
        tmp.redirect = partial_arg$1[0];
      }
      if (partial_arg) {
        tmp.integrity = partial_arg[0];
      }
      if (keepalive) {
        tmp.keepalive = keepalive[0];
      }
      return tmp;
    });
}

var RequestInit = [make];
/* No side effect */

// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE


var host = "https://api.swipetech.com.br";

var sandboxHost = "https://swp-staging.herokuapp.com";
/* No side effect */

// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE
/* No side effect */

// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE

((require("cross-fetch/polyfill")));

function handleResponse(res) {
  if (res.status === 204) {
    return Promise.resolve(null);
  } else {
    return res.json().then((function (body) {
                    var error = body.error;
                    if (error !== undefined) {
                      return Promise.reject(body);
                    } else {
                      return Promise.resolve(body.data);
                    }
                  })).catch((function (err) {
                  return Promise.reject(err);
                }));
  }
}

function handleError($staropt$star, errorResponse) {
  var debug = $staropt$star ? $staropt$star[0] : false;
  if (debug) {
    var errorLog = JSON.stringify(errorResponse);
    if (errorLog !== undefined) {
      console.log("[WalletSDK] Error:", errorLog);
    }
    
  }
  return Promise.reject(errorResponse);
}

function handleRequest(debug, req) {
  var partial_arg = /* Some */[debug];
  return req.then(handleResponse).catch((function (param) {
                return handleError(partial_arg, param);
              }));
}

function get(headers, $staropt$star, $staropt$star$1, path) {
  var debug = $staropt$star ? $staropt$star[0] : false;
  var sandbox = $staropt$star$1 ? $staropt$star$1[0] : false;
  if (debug) {
    console.log("[WalletSDK] Path:", path);
    console.log("[WalletSDK] Headers:", headers);
  }
  return handleRequest(debug, fetch((
                  sandbox ? sandboxHost : host
                ) + path, RequestInit[/* make */0](/* None */0, /* Some */[headers], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0)(/* () */0)));
}

function post(headers, body, $staropt$star, $staropt$star$1, path) {
  var debug = $staropt$star ? $staropt$star[0] : false;
  var sandbox = $staropt$star$1 ? $staropt$star$1[0] : false;
  var strBody = stringifyOption(body);
  if (debug) {
    console.log("[WalletSDK] Path:", path);
    console.log("[WalletSDK] Headers:", headers);
    console.log("[WalletSDK] Body:", strBody);
  }
  return handleRequest(debug, fetch((
                  sandbox ? sandboxHost : host
                ) + path, RequestInit[/* make */0](/* Some */[/* Post */2], /* Some */[headers], /* Some */[strBody], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0)(/* () */0)));
}
/*  Not a pure module */

// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE

var languages = Languages[/* enum */0];

var operationTypes = OpTypes[/* enum */0];

var Options$1 = /* module */[];

var accounts = "/accounts";

var payments = "/payments";

function getAccount(id) {
  return "" + (String(accounts) + ("/" + (String(id) + "")));
}

function getPayment(id) {
  return "" + (String(payments) + ("/" + (String(id) + "")));
}

function init(options) {
  var match = options.language;
  var language = match !== undefined ? match : languages.PT_BR;
  var headers = { };
  headers["Content-Type"] = "application/json";
  headers["Accept-Language"] = language;
  var partial_arg = options.secret;
  var partial_arg$1 = options.apiKey;
  var partialSetAuthHeaders = function (param, param$1, param$2) {
    return setHeaders(partial_arg$1, partial_arg, param, param$1, param$2);
  };
  var partial_arg$2 = undefined_to_opt(options.sandbox);
  var partial_arg$3 = undefined_to_opt(options.debug);
  var getRoute = function (param) {
    var headers$1 = headers;
    var setAuthHeaders = partialSetAuthHeaders;
    var debug = partial_arg$3;
    var sandbox = partial_arg$2;
    var path = param;
    _3(setAuthHeaders, path, /* None */0, headers$1);
    return get(headers$1, debug, sandbox, path);
  };
  var arg = options.debug;
  var arg$1 = arg === undefined ? /* None */0 : [arg];
  var arg$2 = options.sandbox;
  var arg$3 = arg$2 === undefined ? /* None */0 : [arg$2];
  var postToRoute = function (param) {
    return (function (param$1) {
        var param$2 = param;
        var param$3 = partialSetAuthHeaders;
        var param$4 = arg$1;
        var param$5 = arg$3;
        var param$6 = param$1;
        var headers$1 = headers;
        var body = param$2;
        var setAuthHeaders = param$3;
        var debug = param$4;
        var sandbox = param$5;
        var path = param$6;
        _3(setAuthHeaders, path, body, headers$1);
        return post(headers$1, body, debug, sandbox, path);
      });
  };
  var prim = function () {
    return postToRoute(/* None */0)(accounts);
  };
  var prim$1 = function (id) {
    return _1(getRoute, getAccount(id));
  };
  var prim$2 = function () {
    return _1(getRoute, accounts);
  };
  var prim$3 = function () {
    return _1(getRoute, "/assets");
  };
  var prim$4 = function () {
    return _1(getRoute, "/organizations");
  };
  var prim$5 = function (payments$1) {
    return postToRoute(/* Some */[{
                    payments: payments$1
                  }])(payments);
  };
  var prim$6 = function (id) {
    return _1(getRoute, getPayment(id));
  };
  return {
          createAccount: prim,
          getAccount: prim$1,
          getAllAccounts: prim$2,
          getAllAssets: prim$3,
          getOrganization: prim$4,
          makePayment: prim$5,
          getPayment: prim$6
        };
}

var Endpoints = [];
/* Auth-SwpWalletSdk Not a pure module */

exports.Options = Options$1;
exports.Endpoints = Endpoints;
exports.languages = languages;
exports.operationTypes = operationTypes;
exports.init = init;
