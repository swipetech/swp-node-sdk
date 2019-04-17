module Options: {type t;};
module Endpoints: {type t;};
module Account: {type t;};
module Asset: {type t;};
module Transfer: {type t;};
module TrailTransfer: {type t;};

let languages: Enums.Languages.t;
let actionTypes: Enums.ActionTypes.t;
let actionCodes: Enums.ActionCodes.t;

let createAccountAction: Js.Nullable.t(Account.t) => Account.t;
let issueAssetAction: Asset.t => Asset.t;
let transferAction: Transfer.t => Transfer.t;
let trailTransferAction: TrailTransfer.t => TrailTransfer.t;
let init: Options.t => Endpoints.t;