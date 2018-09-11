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