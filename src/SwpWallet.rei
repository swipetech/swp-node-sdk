module Options: {type t;};
module Endpoints: {type t;};

let languages: Enums.Languages.t;
let actionTypes: Enums.ActionTypes.t;
let operationCodes: Enums.OperationCodes.t;

let init: Options.t => Endpoints.t;