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
  let createAccount = "CREATE_ACC";
  let destroyAccount = "DESTROY_ACC";
  let issueAsset = "ISSUE_ASSET";
  let createOrganization = "CREATE_ORG";

  let enum =
    t(
      ~transfer,
      ~createAccount,
      ~destroyAccount,
      ~createOrganization,
      ~issueAsset,
    );
};

module OperationCodes = {
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
      ~ok="transfer_ok",
      ~success="transfer_success",
      ~underfunded="transfer_underfunded",
      ~notProcessed="transfer_not_processed",
    );
};