import adress from "../fixtures/cep.json";

describe("CEP", () => {
  beforeEach(() => {
    cy.login();
    cy.goTo("Integração", "Consulta de CEP");
  });

  it("Deve validar a consulta de CEP", () => {
    cy.intercept("GET", `https://viacep.com.br/ws/${adress.cep}/json/`, {
      statusCode: 200,
      body: {
        logradouro: adress.street,
        bairro: adress.neighborhood,
        localidade: adress.city,
        uf: adress.state,
      },
    }).as("getCep");

    cy.get("#cep").type(adress.cep);
    cy.contains("button", "Buscar").click();

    cy.wait("@getCep");

    cy.get("#street").should("have.value", adress.street);

    cy.get("#neighborhood").should("have.value", adress.neighborhood);

    cy.get("#city").should("have.value", adress.city);

    cy.get("#state").should("have.value", adress.state);
  });
});
