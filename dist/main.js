'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var CryptoJs = require('crypto-js');
var EncBase64 = require('crypto-js/enc-base64');
var Util = require('util');

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

function setHeaders(apiKey, secret, path, body, headers) {
  var strBody = stringifyOption(body);
  var timestamp = String(floor(Date.now() / 1000.0));
  var hmac = CryptoJs.HmacSHA384(timestamp + (path + strBody), secret);
  var signature = EncBase64.stringify(hmac);
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

var createAccount = "CREATE_ACC";

var destroyAccount = "DESTROY_ACC";

var issueAsset = "ISSUE_ASSET";

var createOrganization = "CREATE_ORG";

var $$enum$1 = {
  Transfer: transfer,
  CreateAccount: createAccount,
  DestroyAccount: destroyAccount,
  CreateOrganization: createOrganization,
  IssueAsset: issueAsset
};

var ActionTypes = /* module */[
  /* transfer */transfer,
  /* createAccount */createAccount,
  /* destroyAccount */destroyAccount,
  /* issueAsset */issueAsset,
  /* createOrganization */createOrganization,
  /* enum */$$enum$1
];

var $$enum$2 = {
  Ok: "op_ok",
  Success: "op_success",
  Underfunded: "op_underfunded",
  NotProcessed: "op_not_processed"
};

var OperationCodes = /* module */[/* enum */$$enum$2];
/* No side effect */

// Generated by BUCKLESCRIPT VERSION 4.0.18, PLEASE EDIT WITH CARE


var host = "https://0-8.api.swipetech.io";

var sandboxHost = "https://api-sandbox.swipetech.io";
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

var languages = Languages[/* enum */0];

var actionTypes = ActionTypes[/* enum */5];

var operationCodes = OperationCodes[/* enum */0];

var Options = /* module */[];

var organizations = "/organizations";

var accounts = "/accounts";

var assets = "/assets";

var transfers = "/transfers";

var actions = "/actions";

var revoke = "/revoke";

function getAccount(id) {
  return "" + (String(accounts) + ("/" + (String(id) + "")));
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

var Account = /* module */[];

var Asset = /* module */[];

var Transfer = /* module */[];

function createAccountAction(acc) {
  if (acc == null) {
    return {
            type: ActionTypes[/* createAccount */1]
          };
  } else {
    var tmp = {
      type: ActionTypes[/* createAccount */1]
    };
    var tmp$1 = undefined_to_opt(acc.tags);
    if (tmp$1 !== undefined) {
      tmp.tags = valFromOption(tmp$1);
    }
    var tmp$2 = undefined_to_opt(acc.starting_balances);
    if (tmp$2 !== undefined) {
      tmp.starting_balances = valFromOption(tmp$2);
    }
    return tmp;
  }
}

function issueAssetAction(asset) {
  var tmp = {
    type: ActionTypes[/* issueAsset */3],
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
  var partialSetAuthHeaders = function (param, param$1, param$2) {
    return setHeaders(partial_arg$1, partial_arg, param, param$1, param$2);
  };
  var arg = options.debug;
  var arg$1 = arg === undefined ? undefined : some(arg);
  var baseRequest = function (param) {
    var func = function (param$1, param$2, param$3, param$4) {
      var param$5 = param;
      var param$6 = partialSetAuthHeaders;
      var param$7 = param$1;
      var param$8 = param$2;
      var param$9 = param$3;
      var param$10 = param$4;
      var host$1$$1 = host$$1;
      var headers$1 = headers;
      var method_ = param$5;
      var setAuthHeaders = param$6;
      var body = param$7;
      var queryParams = param$8;
      var debug = param$9;
      var path = param$10;
      _3(setAuthHeaders, path, body, headers$1);
      return request(host$1$$1, headers$1, method_, body, queryParams, debug, path);
    };
    return (function (param, param$1) {
        return _3(func, param, param$1, arg$1);
      });
  };
  var get = baseRequest(/* Get */0);
  var post = baseRequest(/* Post */2);
  var $$delete = baseRequest(/* Delete */4);
  var put = baseRequest(/* Put */3);
  var prim = function (param) {
    return _3(get, undefined, undefined, organizations);
  };
  var prim$1 = function (param) {
    return _3(post, undefined, undefined, resetOrganization);
  };
  var prim$2 = function (id) {
    return _3(get, undefined, undefined, getAccount(id));
  };
  var prim$3 = function (queryParams) {
    return _3(get, undefined, (queryParams == null) ? undefined : some(queryParams), accounts);
  };
  var prim$4 = function (body) {
    return _3(post, (body == null) ? undefined : some(body), undefined, accounts);
  };
  var prim$5 = function (id) {
    return _3($$delete, undefined, undefined, getAccount(id));
  };
  var prim$6 = function (body) {
    return _3(post, some(body), undefined, assets);
  };
  var prim$7 = function (queryParams) {
    return _3(get, undefined, (queryParams == null) ? undefined : some(queryParams), assets);
  };
  var prim$8 = function (id) {
    return _3(get, undefined, undefined, getTransfer(id));
  };
  var prim$9 = function (id, queryParams) {
    return _3(get, undefined, (queryParams == null) ? undefined : some(queryParams), getAllTransfers(id));
  };
  var prim$10 = function (body) {
    return _3(post, some(body), undefined, transfers);
  };
  var prim$11 = function (id, tags) {
    return _3(put, {
                tags: tags
              }, undefined, updateTags(id));
  };
  var prim$12 = function (id) {
    return _3(get, undefined, undefined, getActions(id));
  };
  var prim$13 = function (body) {
    return _3(post, some(body), undefined, actions);
  };
  var prim$14 = function (param) {
    return _3(get, undefined, undefined, getRevokeToken);
  };
  var prim$15 = function (token) {
    return _3(post, undefined, undefined, revokeCredentials(token));
  };
  return {
          getOrganization: prim,
          resetOrganization: prim$1,
          getAccount: prim$2,
          getAllAccounts: prim$3,
          createAccount: prim$4,
          destroyAccount: prim$5,
          issueAsset: prim$6,
          getAllAssets: prim$7,
          getTransfer: prim$8,
          getAllTransfers: prim$9,
          makeTransfers: prim$10,
          updateTags: prim$11,
          getActionBatch: prim$12,
          makeActionBatch: prim$13,
          getRevokeToken: prim$14,
          revokeCredentials: prim$15
        };
}

var Endpoints = [];
/* resetOrganization Not a pure module */

exports.Options = Options;
exports.Endpoints = Endpoints;
exports.Account = Account;
exports.Asset = Asset;
exports.Transfer = Transfer;
exports.languages = languages;
exports.actionTypes = actionTypes;
exports.operationCodes = operationCodes;
exports.createAccountAction = createAccountAction;
exports.issueAssetAction = issueAssetAction;
exports.transferAction = transferAction;
exports.init = init;
