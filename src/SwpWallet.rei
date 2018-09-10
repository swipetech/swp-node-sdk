module Options: {type t;};
module Endpoints: {type t;};

let languages: Enums.Languages.t;

let init: Options.t => Endpoints.t;