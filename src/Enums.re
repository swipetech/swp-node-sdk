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

  let enum =
    t(
      ~transfer="TRANSFER",
      ~createAccount="CREATE_ACC",
      ~destroyAccount="DESTROY_ACC",
      ~createOrganization="CREATE_ORG",
      ~issueAsset="ISSUE_ASSET",
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

  let enum = t(~ok="op_ok", ~success="op_success", ~underfunded="op_underfunded", ~notProcessed="op_not_processed");
};
