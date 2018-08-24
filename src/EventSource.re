type t;

module Options = {
  [@bs.deriving abstract]
  type t = {headers: Js.Dict.t(string)};

  let make = t;
};

module Event = {
  [@bs.deriving abstract]
  type t = {data: Js.Json.t};
};

type handler = Event.t => unit;

[@bs.new] [@bs.module]
external make : (string, Options.t) => t = "eventsource";

[@bs.send.pipe: t] external addEventListener : (string, handler) => unit = "";
[@bs.send.pipe: t] external close : unit => unit = "";