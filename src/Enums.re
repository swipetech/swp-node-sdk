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

module OpTypes = {
  [@bs.deriving abstract]
  type t = {
    [@bs.as "Payment"]
    payment: string,
    [@bs.as "CreateAccount"]
    createAccount: string,
    [@bs.as "CreateOrganization"]
    createOrganization: string,
    [@bs.as "IssueAsset"]
    issueAsset: string,
    [@bs.as "ChangeTrust"]
    changeTrust: string,
  };

  let enum =
    t(
      ~payment="payment",
      ~createAccount="create_account",
      ~createOrganization="create_organization",
      ~issueAsset="issue_asset",
      ~changeTrust="change_trust",
    );
};

module OpCodes = {
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
      ~ok="op_ok",
      ~success="op_success",
      ~underfunded="op_underfunded",
      ~notProcessed="op_not_processed",
    );
};