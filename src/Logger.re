/* let cyan = "\x1b[36m"; */
let blue = "\x1b[34m";
let reset = "\x1b[0m";

let log = (flag, text) => Js.log2({j|$blue[swp] $flag:$reset|j}, text);