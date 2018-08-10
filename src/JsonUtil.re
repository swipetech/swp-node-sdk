let stringifyOption = op =>
  switch (op) {
  | Some(o) =>
    switch (Js.Json.stringifyAny(o)) {
    | Some(str) => str
    | None => ""
    }
  | None => ""
  };