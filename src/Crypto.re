type buffer;

[@bs.module "crypto-js"]
external hmacSHA384 : ('a, string) => buffer = "HmacSHA384";

[@bs.module "crypto-js/enc-base64"]
external base64Stringify : buffer => string = "stringify";