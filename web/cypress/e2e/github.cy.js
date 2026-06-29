describe("Gerenciamento de Perfis no Github", () => {
  beforeEach(() => {
    cy.login();
    cy.goTo("Tabela", "Perfis do GitHub");
  });

  it("Deve poder cadastrar um novo eprfil do github", () => {
    cy.get("#name").type("Ryan Rafael");
    cy.get("#username").type("qaRyan");
    cy.get("#profile").type("QA");

    cy.contains("button", "Adicionar Perfil").click();

    cy.get("#name").type("Ryan Rafael");
    cy.get("#username").type("RyanRafaelA");
    cy.get("#profile").type("QA");

    cy.contains("button", "Adicionar Perfil").click();

    cy.contains("table tbody tr", "RyanRafaelA")
      .should("be.visible")
      .as("trProfile");

    cy.get("@trProfile").contains("td", "Ryan Rafael").should("be.visible");

    cy.get("@trProfile").contains("td", "QA").should("be.visible");
  });

  it("Deve poder remover um perfil dop github", () => {
    const profile = {
      name: "Ryan Rafael",
      username: "RyanRafaelA",
      profile: "QA",
    };

    cy.get("#name").type(profile.name);
    cy.get("#username").type(profile.username);
    cy.get("#profile").type(profile.profile);

    cy.contains("button", "Adicionar Perfil").click();

    cy.contains("table tbody tr", profile.username)
      .should("be.visible")
      .as("trProfile");

    cy.get("@trProfile").find("button[title='Remover perfil']").click();

    cy.contains("table tbody", profile.username).should("not.exist");
  });

  it.only("Deve validar o link do github", () => {
    const profile = {
      name: "Ryan Rafael",
      username: "RyanRafaelA",
      profile: "QA",
    };

    cy.get("#name").type(profile.name);
    cy.get("#username").type(profile.username);
    cy.get("#profile").type(profile.profile);

    cy.contains("button", "Adicionar Perfil").click();

    cy.contains("table tbody tr", profile.username)
      .should("be.visible")
      .as("trProfile");

    cy.get("@trProfile")
      .find("a")
      .should("have.attr", "href", "https://github.com/" + profile.username)
      .and("have.attr", "target", "_blank");
  });
});
