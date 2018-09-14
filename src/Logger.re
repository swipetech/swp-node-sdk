[@bs.module "util"]
external inspect : ('a, bool, Js.Nullable.t('b), bool) => string = "";

let blue = "\x1b[34m";
let red = "\x1b[31m";
let reset = "\x1b[0m";

let log = (flag, value) =>
  Js.log2(
    {j|$blue[swp] $flag:$reset|j},
    inspect(value, false, Js.Nullable.null, true),
  );

let error = (flag, value) =>
  Js.log2(
    {j|$red[swp] $flag:$reset|j},
    inspect(value, false, Js.Nullable.null, true),
  );