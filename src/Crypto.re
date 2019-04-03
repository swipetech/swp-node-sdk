type buffer;

[@bs.module "crypto-js"]
external hmacSHA256 : ('a, string) => buffer = "HmacSHA256";

[@bs.module "crypto-js/enc-base64"]
external base64Stringify : buffer => string = "stringify";
