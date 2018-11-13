'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var CryptoJs = require('crypto-js');
var EncBase64 = require('crypto-js/enc-base64');
var Util = require('util');
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

function curry_2(o, a0, a1, arity) {
  if (arity > 7 || arity < 0) {
    return app(o, /* array */[
                a0,
                a1
              ]);
  } else {
    switch (arity) {
      case 0 : 
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
      
    }
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

/* node_std_output Not a pure module */

/* No side effect */

var imul = ( Math.imul || function (x,y) {
  y |= 0; return ((((x >> 16) * y) << 16) + (x & 0xffff) * y)|0; 
}
);
/* imul Not a pure module */

/* repeat Not a pure module */

/* No side effect */

/* two_ptr_32_dbl Not a pure module */

function caml_failwith(s) {
  throw [
        failure,
        s
      ];
}

function lowercase(c) {
  if (c >= /* "A" */65 && c <= /* "Z" */90 || c >= /* "\192" */192 && c <= /* "\214" */214 || c >= /* "\216" */216 && c <= /* "\222" */222) {
    return c + 32 | 0;
  } else {
    return c;
  }
}

function parse_format(fmt) {
  var len = fmt.length;
  if (len > 31) {
    throw [
          invalid_argument,
          "format_int: format too long"
        ];
  }
  var f = /* record */[
    /* justify */"+",
    /* signstyle */"-",
    /* filter */" ",
    /* alternate */false,
    /* base : Dec */2,
    /* signedconv */false,
    /* width */0,
    /* uppercase */false,
    /* sign */1,
    /* prec */-1,
    /* conv */"f"
  ];
  var _i = 0;
  while(true) {
    var i = _i;
    if (i >= len) {
      return f;
    } else {
      var c = fmt.charCodeAt(i);
      var exit = 0;
      if (c >= 69) {
        if (c >= 88) {
          if (c >= 121) {
            exit = 1;
          } else {
            switch (c - 88 | 0) {
              case 0 : 
                  f[/* base */4] = /* Hex */1;
                  f[/* uppercase */7] = true;
                  _i = i + 1 | 0;
                  continue ;
              case 13 : 
              case 14 : 
              case 15 : 
                  exit = 5;
                  break;
              case 12 : 
              case 17 : 
                  exit = 4;
                  break;
              case 23 : 
                  f[/* base */4] = /* Oct */0;
                  _i = i + 1 | 0;
                  continue ;
              case 29 : 
                  f[/* base */4] = /* Dec */2;
                  _i = i + 1 | 0;
                  continue ;
              case 1 : 
              case 2 : 
              case 3 : 
              case 4 : 
              case 5 : 
              case 6 : 
              case 7 : 
              case 8 : 
              case 9 : 
              case 10 : 
              case 11 : 
              case 16 : 
              case 18 : 
              case 19 : 
              case 20 : 
              case 21 : 
              case 22 : 
              case 24 : 
              case 25 : 
              case 26 : 
              case 27 : 
              case 28 : 
              case 30 : 
              case 31 : 
                  exit = 1;
                  break;
              case 32 : 
                  f[/* base */4] = /* Hex */1;
                  _i = i + 1 | 0;
                  continue ;
              
            }
          }
        } else if (c >= 72) {
          exit = 1;
        } else {
          f[/* signedconv */5] = true;
          f[/* uppercase */7] = true;
          f[/* conv */10] = String.fromCharCode(lowercase(c));
          _i = i + 1 | 0;
          continue ;
        }
      } else {
        var switcher = c - 32 | 0;
        if (switcher > 25 || switcher < 0) {
          exit = 1;
        } else {
          switch (switcher) {
            case 3 : 
                f[/* alternate */3] = true;
                _i = i + 1 | 0;
                continue ;
            case 0 : 
            case 11 : 
                exit = 2;
                break;
            case 13 : 
                f[/* justify */0] = "-";
                _i = i + 1 | 0;
                continue ;
            case 14 : 
                f[/* prec */9] = 0;
                var j = i + 1 | 0;
                while((function(j){
                    return function () {
                      var w = fmt.charCodeAt(j) - /* "0" */48 | 0;
                      return w >= 0 && w <= 9;
                    }
                    }(j))()) {
                  f[/* prec */9] = (imul(f[/* prec */9], 10) + fmt.charCodeAt(j) | 0) - /* "0" */48 | 0;
                  j = j + 1 | 0;
                }                _i = j;
                continue ;
            case 1 : 
            case 2 : 
            case 4 : 
            case 5 : 
            case 6 : 
            case 7 : 
            case 8 : 
            case 9 : 
            case 10 : 
            case 12 : 
            case 15 : 
                exit = 1;
                break;
            case 16 : 
                f[/* filter */2] = "0";
                _i = i + 1 | 0;
                continue ;
            case 17 : 
            case 18 : 
            case 19 : 
            case 20 : 
            case 21 : 
            case 22 : 
            case 23 : 
            case 24 : 
            case 25 : 
                exit = 3;
                break;
            
          }
        }
      }
      switch (exit) {
        case 1 : 
            _i = i + 1 | 0;
            continue ;
        case 2 : 
            f[/* signstyle */1] = String.fromCharCode(c);
            _i = i + 1 | 0;
            continue ;
        case 3 : 
            f[/* width */6] = 0;
            var j$1 = i;
            while((function(j$1){
                return function () {
                  var w = fmt.charCodeAt(j$1) - /* "0" */48 | 0;
                  return w >= 0 && w <= 9;
                }
                }(j$1))()) {
              f[/* width */6] = (imul(f[/* width */6], 10) + fmt.charCodeAt(j$1) | 0) - /* "0" */48 | 0;
              j$1 = j$1 + 1 | 0;
            }            _i = j$1;
            continue ;
        case 4 : 
            f[/* signedconv */5] = true;
            f[/* base */4] = /* Dec */2;
            _i = i + 1 | 0;
            continue ;
        case 5 : 
            f[/* signedconv */5] = true;
            f[/* conv */10] = String.fromCharCode(c);
            _i = i + 1 | 0;
            continue ;
        
      }
    }
  }}

function finish_formatting(param, rawbuffer) {
  var justify = param[/* justify */0];
  var signstyle = param[/* signstyle */1];
  var filter = param[/* filter */2];
  var alternate = param[/* alternate */3];
  var base = param[/* base */4];
  var signedconv = param[/* signedconv */5];
  var width = param[/* width */6];
  var uppercase = param[/* uppercase */7];
  var sign = param[/* sign */8];
  var len = rawbuffer.length;
  if (signedconv && (sign < 0 || signstyle !== "-")) {
    len = len + 1 | 0;
  }
  if (alternate) {
    if (base === /* Oct */0) {
      len = len + 1 | 0;
    } else if (base === /* Hex */1) {
      len = len + 2 | 0;
    }
    
  }
  var buffer = "";
  if (justify === "+" && filter === " ") {
    for(var i = len ,i_finish = width - 1 | 0; i <= i_finish; ++i){
      buffer = buffer + filter;
    }
  }
  if (signedconv) {
    if (sign < 0) {
      buffer = buffer + "-";
    } else if (signstyle !== "-") {
      buffer = buffer + signstyle;
    }
    
  }
  if (alternate && base === /* Oct */0) {
    buffer = buffer + "0";
  }
  if (alternate && base === /* Hex */1) {
    buffer = buffer + "0x";
  }
  if (justify === "+" && filter === "0") {
    for(var i$1 = len ,i_finish$1 = width - 1 | 0; i$1 <= i_finish$1; ++i$1){
      buffer = buffer + filter;
    }
  }
  buffer = uppercase ? buffer + rawbuffer.toUpperCase() : buffer + rawbuffer;
  if (justify === "-") {
    for(var i$2 = len ,i_finish$2 = width - 1 | 0; i$2 <= i_finish$2; ++i$2){
      buffer = buffer + " ";
    }
  }
  return buffer;
}

function caml_format_float(fmt, x) {
  var f = parse_format(fmt);
  var prec = f[/* prec */9] < 0 ? 6 : f[/* prec */9];
  var x$1 = x < 0 ? (f[/* sign */8] = -1, -x) : x;
  var s = "";
  if (isNaN(x$1)) {
    s = "nan";
    f[/* filter */2] = " ";
  } else if (isFinite(x$1)) {
    var match = f[/* conv */10];
    switch (match) {
      case "e" : 
          s = x$1.toExponential(prec);
          var i = s.length;
          if (s[i - 3 | 0] === "e") {
            s = s.slice(0, i - 1 | 0) + ("0" + s.slice(i - 1 | 0));
          }
          break;
      case "f" : 
          s = x$1.toFixed(prec);
          break;
      case "g" : 
          var prec$1 = prec !== 0 ? prec : 1;
          s = x$1.toExponential(prec$1 - 1 | 0);
          var j = s.indexOf("e");
          var exp = Number(s.slice(j + 1 | 0)) | 0;
          if (exp < -4 || x$1 >= 1e21 || x$1.toFixed().length > prec$1) {
            var i$1 = j - 1 | 0;
            while(s[i$1] === "0") {
              i$1 = i$1 - 1 | 0;
            }            if (s[i$1] === ".") {
              i$1 = i$1 - 1 | 0;
            }
            s = s.slice(0, i$1 + 1 | 0) + s.slice(j);
            var i$2 = s.length;
            if (s[i$2 - 3 | 0] === "e") {
              s = s.slice(0, i$2 - 1 | 0) + ("0" + s.slice(i$2 - 1 | 0));
            }
            
          } else {
            var p = prec$1;
            if (exp < 0) {
              p = p - (exp + 1 | 0) | 0;
              s = x$1.toFixed(p);
            } else {
              while((function () {
                      s = x$1.toFixed(p);
                      return s.length > (prec$1 + 1 | 0);
                    })()) {
                p = p - 1 | 0;
              }            }
            if (p !== 0) {
              var k = s.length - 1 | 0;
              while(s[k] === "0") {
                k = k - 1 | 0;
              }              if (s[k] === ".") {
                k = k - 1 | 0;
              }
              s = s.slice(0, k + 1 | 0);
            }
            
          }
          break;
      default:
        
    }
  } else {
    s = "inf";
    f[/* filter */2] = " ";
  }
  return finish_formatting(f, s);
}

var float_of_string = (
  function (s, caml_failwith) {
    var res = +s;
    if ((s.length > 0) && (res === res))
        return res;
    s = s.replace(/_/g, "");
    res = +s;
    if (((s.length > 0) && (res === res)) || /^[+-]?nan$/i.test(s)) {
        return res;
    }
    if (/^ *0x[0-9a-f_]+p[+-]?[0-9_]+/i.test(s)) {
        var pidx = s.indexOf('p');
        pidx = (pidx == -1) ? s.indexOf('P') : pidx;
        var exp = +s.substring(pidx + 1);
        res = +s.substring(0, pidx);
        return res * Math.pow(2, exp);
    }
    if (/^\+?inf(inity)?$/i.test(s))
        return Infinity;
    if (/^-inf(inity)?$/i.test(s))
        return -Infinity;
    caml_failwith("float_of_string");
}

);

function caml_float_of_string(s) {
  return _2(float_of_string, s, caml_failwith);
}
/* float_of_string Not a pure module */

function get(s, i) {
  if (i < 0 || i >= s.length) {
    throw [
          invalid_argument,
          "index out of bounds"
        ];
  } else {
    return s.charCodeAt(i);
  }
}
/* No side effect */

var id = [0];

function get_id() {
  id[0] += 1;
  return id[0];
}

function create(str) {
  var v_001 = get_id(/* () */0);
  var v = /* tuple */[
    str,
    v_001
  ];
  v.tag = 248;
  return v;
}
/* No side effect */

/* No side effect */

/* No side effect */

/* No side effect */

var Exit = create("Pervasives.Exit");

function valid_float_lexem(s) {
  var l = s.length;
  var _i = 0;
  while(true) {
    var i = _i;
    if (i >= l) {
      return s + ".";
    } else {
      var match = get(s, i);
      if (match >= 48) {
        if (match >= 58) {
          return s;
        } else {
          _i = i + 1 | 0;
          continue ;
        }
      } else if (match !== 45) {
        return s;
      } else {
        _i = i + 1 | 0;
        continue ;
      }
    }
  }}

function string_of_float(f) {
  return valid_float_lexem(caml_format_float("%.12g", f));
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

var max$1 = 2147483647;

var min$1 = -2147483648;
/* No side effect */

function floor_int(f) {
  if (f > max$1) {
    return max$1;
  } else if (f < min$1) {
    return min$1;
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
  Transfer: "transfer",
  CreateAccount: "create_account",
  CreateOrganization: "create_organization",
  IssueAsset: "issue_asset",
  ChangeTrust: "change_trust"
};

var OpTypes = /* module */[/* enum */$$enum$1];

var $$enum$2 = {
  Ok: "op_ok",
  Success: "op_success",
  Underfunded: "op_underfunded",
  NotProcessed: "op_not_processed"
};

var OpCodes = /* module */[/* enum */$$enum$2];
/* No side effect */

// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE


var host = "https://api.swipetech.io";

var sandboxHost = "https://api.sandbox.swipetech.io";
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
/* No side effect */

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
                      return Promise.resolve(body.data);
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

function get$1(host$$1, headers, $staropt$star, path) {
  var debug = $staropt$star ? $staropt$star[0] : false;
  if (debug) {
    console.log("");
    log("Request", {
          path: path,
          headers: headers
        });
  }
  return handleRequest(debug, fetch(host$$1 + path, RequestInit[/* make */0](/* None */0, /* Some */[headers], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0)(/* () */0)));
}

function post(host$$1, headers, body, $staropt$star, path) {
  var debug = $staropt$star ? $staropt$star[0] : false;
  var strBody = stringifyOption(body);
  if (debug) {
    console.log("");
    log("Request", {
          path: path,
          headers: headers,
          body: strBody
        });
  }
  return handleRequest(debug, fetch(host$$1 + path, RequestInit[/* make */0](/* Some */[/* Post */2], /* Some */[headers], /* Some */[strBody], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0)(/* () */0)));
}
/*  Not a pure module */

// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE

var languages = Languages[/* enum */0];

var operationTypes = OpTypes[/* enum */0];

var operationCodes = OpCodes[/* enum */0];

var Options$1 = /* module */[];

function make$3(prim, prim$1, prim$2, prim$3, prim$4, _) {
  var tmp = {
    from: prim,
    to: prim$1,
    asset: prim$2,
    amount: prim$3
  };
  if (prim$4) {
    tmp.opCode = prim$4[0];
  }
  return tmp;
}

function make$1$1(prim, prim$1, prim$2, prim$3, prim$4, _) {
  var tmp = {
    from: prim,
    to: prim$1,
    asset: prim$2,
    amount: prim$3
  };
  if (prim$4) {
    tmp.opCode = prim$4[0];
  }
  return tmp;
}

var accounts = "/accounts";

var transfers = "/transfers";

function getAccount(id) {
  return "" + (String(accounts) + ("/" + (String(id) + "")));
}

function getTransfer(id) {
  return "" + (String(transfers) + ("/" + (String(id) + "")));
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
  var partial_arg$2 = undefined_to_opt(options.debug);
  var getRoute = function (param) {
    var host$1$$1 = host$$1;
    var headers$1 = headers;
    var setAuthHeaders = partialSetAuthHeaders;
    var debug = partial_arg$2;
    var path = param;
    _3(setAuthHeaders, path, /* None */0, headers$1);
    return get$1(host$1$$1, headers$1, debug, path);
  };
  var func = function (param, param$1, param$2, param$3) {
    var host$1$$1 = host$$1;
    var headers$1 = headers;
    var body = param;
    var setAuthHeaders = param$1;
    var debug = param$2;
    var path = param$3;
    _3(setAuthHeaders, path, body, headers$1);
    return post(host$1$$1, headers$1, body, debug, path);
  };
  var arg = options.debug;
  var arg$1 = arg === undefined ? /* None */0 : [arg];
  var prim = function () {
    return func(/* None */0, partialSetAuthHeaders, arg$1, accounts);
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
  var prim$5 = function (ops_compat) {
    var operations = ops_compat.map((function (op) {
            return make$1$1(op.from, op.to, op.asset, string_of_float(op.amount), /* None */0, /* () */0);
          }));
    var partial_arg = /* Some */[{
        operations: operations
      }];
    return (function (param) {
                    return func(partial_arg, partialSetAuthHeaders, arg$1, param);
                  })(transfers).then((function (a) {
                    return Promise.resolve(a);
                  })).then((function (data) {
                  var transfer = data.value;
                  var operations = transfer.operations.map((function (op) {
                          return make$3(op.from, op.to, op.asset, caml_float_of_string(op.amount), undefined_to_opt(op.opCode), /* () */0);
                        }));
                  var tmp = {
                    operations: operations
                  };
                  var tmp$1 = undefined_to_opt(transfer.id);
                  if (tmp$1) {
                    tmp.id = tmp$1[0];
                  }
                  return Promise.resolve({
                              receipt: data.receipt,
                              value: tmp
                            });
                }));
  };
  var prim$6 = function (id) {
    return _1(getRoute, getTransfer(id));
  };
  return {
          createAccount: prim,
          getAccount: prim$1,
          getAllAccounts: prim$2,
          getAllAssets: prim$3,
          getOrganization: prim$4,
          makeTransfer: prim$5,
          getTransfer: prim$6
        };
}

var Endpoints = [];
/* Auth-SwpWalletSdk Not a pure module */

exports.Options = Options$1;
exports.Endpoints = Endpoints;
exports.languages = languages;
exports.operationTypes = operationTypes;
exports.operationCodes = operationCodes;
exports.init = init;
