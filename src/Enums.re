module Languages = {
  [@bs.deriving abstract]
  type t = {
    [@bs.as "PT_BR"]
    ptBr: string,
    [@bs.as "EN_US"]
    enUs: string,
  };

  let enum = t(~ptBr="pt-BR", ~enUs="en-US");
};

module ActionTypes = {
  [@bs.deriving abstract]
  type t = {
    [@bs.as "Transfer"]
    transfer: string,
    [@bs.as "TrailTransfer"]
    trailTransfer: string,
    [@bs.as "CreateAccount"]
    createAccount: string,
    [@bs.as "DestroyAccount"]
    destroyAccount: string,
    [@bs.as "CreateOrganization"]
    createOrganization: string,
    [@bs.as "IssueAsset"]
    issueAsset: string,
  };

  let transfer = "TRANSFER";
  let trailTransfer = "TRAIL_TRANSFER";
  let createAccount = "CREATE_ACC";
  let destroyAccount = "DESTROY_ACC";
  let issueAsset = "ISSUE_ASSET";
  let createOrganization = "CREATE_ORG";

  let enum = t(~transfer, ~trailTransfer, ~createAccount, ~destroyAccount, ~createOrganization, ~issueAsset);
};

module MemoTypes = {
  [@bs.deriving abstract]
  type t = {
    [@bs.as "Text"]
    text: string,
    [@bs.as "Hash"]
    hash: string,
  };

  let text = "TEXT";
  let hash = "HASH";

  let enum = t(~text, ~hash);
};

module ActionCodes = {
  [@bs.deriving abstract]
  type t = {
    [@bs.as "Ok"]
    ok: string,
    [@bs.as "Success"]
    success: string,
    [@bs.as "Underfunded"]
    underfunded: string,
    [@bs.as "NotProcessed"]
    notProcessed: string,
  };

  let enum =
    t(
      ~ok="action_ok",
      ~success="action_success",
      ~underfunded="action_underfunded",
      ~notProcessed="action_not_processed",
    );
};
