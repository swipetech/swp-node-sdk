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