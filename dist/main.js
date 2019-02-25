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
  var timestamp = String(floor(Date.now() / 1000.0));
  var hmac = CryptoJs.HmacSHA384(timestamp + (path + strBody), secret);
  var signature = EncBase64.stringify(hmac);
  headers["X-Swp-Api-Key"] = apiKey;
  headers["X-Swp-Signature"] = signature;
  headers["X-Swp-Timestamp"] = timestamp;
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
  Transfer: "TRANSFER",
  CreateAccount: "CREATE_ACC",
  DestroyAccount: "DESTROY_ACC",
  CreateOrganization: "CREATE_ORG",
  IssueAsset: "ISSUE_ASSET"
};

var ActionTypes = /* module */[/* enum */$$enum$1];

var $$enum$2 = {
  Ok: "op_ok",
  Success: "op_success",
  Underfunded: "op_underfunded",
  NotProcessed: "op_not_processed"
};

var OperationCodes = /* module */[/* enum */$$enum$2];
/* No side effect */

// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE


var host = "https://api.swipetech.io";

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

// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE

((require("cross-fetch/polyfill")));

function handleResponse($staropt$star, res) {
  var debug = $staropt$star ? $staropt$star[0] : false;
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
  var debug = $staropt$star ? $staropt$star[0] : false;
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
  var partial_arg = /* Some */[debug];
  var partial_arg$1 = /* Some */[debug];
  return req.then((function (param) {
                  return handleResponse(partial_arg$1, param);
                })).catch((function (param) {
                return handleError(partial_arg, param);
              }));
}

function formatQueryParams(params) {
  return Object.keys(params).reduce((function (acc, key) {
                var match = params[key];
                if (match !== undefined) {
                  return "" + (String(acc) + ("" + (String(key) + ("=" + (String(match) + "&")))));
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
  var debug = $staropt$star ? $staropt$star[0] : false;
  var queryParamsString = queryParams ? formatQueryParams(queryParams[0]) : "";
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
  var partial_arg = /* Some */[headers];
  var partial_arg$1 = /* Some */[method_];
  var partial_arg$2 = RequestInit[/* make */0];
  var baseOptions = function (param, param$1, param$2, param$3, param$4, param$5, param$6, param$7, param$8) {
    return partial_arg$2(partial_arg$1, partial_arg, param, param$1, param$2, param$3, param$4, param$5, param$6, param$7, param$8);
  };
  var options;
  var exit = 0;
  if (typeof method_ === "number" && method_ < 2) {
    options = app(baseOptions, [
          /* None */0,
          /* None */0,
          /* None */0,
          /* None */0,
          /* None */0,
          /* None */0,
          /* None */0,
          /* None */0,
          /* None */0,
          /* () */0
        ]);
  } else {
    exit = 1;
  }
  if (exit === 1) {
    options = app(baseOptions, [
          /* Some */[strBody],
          /* None */0,
          /* None */0,
          /* None */0,
          /* None */0,
          /* None */0,
          /* None */0,
          /* None */0,
          /* None */0,
          /* () */0
        ]);
  }
  return handleRequest(debug, fetch(host$$1 + (path + queryParamsString), options));
}
/*  Not a pure module */

// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE

var languages = Languages[/* enum */0];

var actionTypes = ActionTypes[/* enum */0];

var operationCodes = OperationCodes[/* enum */0];

var Options = /* module */[];

var organizations = "/organizations";

var accounts = "/accounts";

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
  var arg$1 = arg === undefined ? /* None */0 : [arg];
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
  var prim = function (body) {
    return _3(post, (body == null) ? /* None */0 : [body], /* None */0, accounts);
  };
  var prim$1 = function (id) {
    return _3(get, /* None */0, /* None */0, getAccount(id));
  };
  var prim$2 = function (queryParams) {
    return _3(get, /* None */0, (queryParams == null) ? /* None */0 : [queryParams], accounts);
  };
  var prim$3 = function (queryParams) {
    return _3(get, /* None */0, (queryParams == null) ? /* None */0 : [queryParams], "/assets");
  };
  var prim$4 = function () {
    return _3(get, /* None */0, /* None */0, organizations);
  };
  var prim$5 = function (body) {
    return _3(post, /* Some */[body], /* None */0, transfers);
  };
  var prim$6 = function (id) {
    return _3(get, /* None */0, /* None */0, getTransfer(id));
  };
  var prim$7 = function (id, queryParams) {
    return _3(get, /* None */0, (queryParams == null) ? /* None */0 : [queryParams], getAllTransfers(id));
  };
  var prim$8 = function (id) {
    return _3($$delete, /* None */0, /* None */0, getAccount(id));
  };
  var prim$9 = function (id, tags) {
    return _3(put, /* Some */[{
                  tags: tags
                }], /* None */0, updateTags(id));
  };
  var prim$10 = function () {
    return _3(post, /* None */0, /* None */0, resetOrganization);
  };
  var prim$11 = function (body) {
    return _3(post, /* Some */[body], /* None */0, actions);
  };
  var prim$12 = function (id) {
    return _3(get, /* None */0, /* None */0, getActions(id));
  };
  var prim$13 = function () {
    return _3(get, /* None */0, /* None */0, getRevokeToken);
  };
  var prim$14 = function (token) {
    return _3(post, /* None */0, /* None */0, revokeCredentials(token));
  };
  return {
          createAccount: prim,
          getAccount: prim$1,
          getAllAccounts: prim$2,
          getAllAssets: prim$3,
          getOrganization: prim$4,
          makeTransfers: prim$5,
          getTransfer: prim$6,
          getAllTransfers: prim$7,
          destroyAccount: prim$8,
          updateTags: prim$9,
          resetOrganization: prim$10,
          makeActionBatch: prim$11,
          getActionBatch: prim$12,
          getRevokeToken: prim$13,
          revokeCredentials: prim$14
        };
}

var Endpoints = [];
/* resetOrganization Not a pure module */

exports.Options = Options;
exports.Endpoints = Endpoints;
exports.languages = languages;
exports.actionTypes = actionTypes;
exports.operationCodes = operationCodes;
exports.init = init;
