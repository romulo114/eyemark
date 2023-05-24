import { isPermissionAllowed } from "cypress-browser-permissions"

describe("Eyemark Discover Page", () => {
  beforeEach(() => {
    cy.visit("/citizen/discover")
  })

  it("[1] Test that ensures project are displayed when we navigate to the discover page", () => {
    cy.intercept({
      method: "GET",
      url: "/api/projects/?page=1&is_published=true&tags=Most%20Discussed"
    },
      {
        fixture: "discover/discuss-project.json"
      }).as("discuss-project")
    cy.getBySel("tag-MostDiscussed").click()
    cy.wait(['@discuss-project'])
    cy.getBySel("project-individual_MostDiscussed").should('exist')
  })

  it("[2] Test that ensures when projects are not loaded because of a network error, a network error page with a retry button is displayed", () => {
    cy.intercept({
      method: "GET",
      url: "/api/projects/?page=1&is_published=true&tags=Most%20Discussed"
    },
      {
        forceNetworkError: true
      }).as("discuss-project")
    cy.getBySel("tag-MostDiscussed").click()
    cy.wait(['@discuss-project'])
  })

  it("[3] Test that ensures we can display projects in a grid view", () => {
    cy.intercept({
      method: "GET",
      url: "/api/projects/?page=1&is_published=true&tags=Most%20Discussed"
    },
      {
        fixture: "discover/discuss-project.json"
      }).as("discuss-project")
    cy.getBySel("tag-MostDiscussed").click()
    cy.getBySel("set-view_grid").invoke('show')
    cy.getBySel("set-view_grid").click()
    cy.wait(['@discuss-project'])
    cy.getBySel("project-individual_MostDiscussed").should('exist')
  })

  it("[4] Test that ensures we can display projects in map view", () => {
    cy.intercept({
      method: "GET",
      url: "/api/projects/?page=1&is_published=true&tags=Most%20Discussed"
    },
      {
        fixture: "discover/discuss-project.json"
      }).as("discuss-project")
    cy.getBySel("tag-MostDiscussed").click()
    cy.wait(['@discuss-project'])
    cy.getBySel("set-view_map").invoke('show')
    cy.getBySel("set-view_map").click()
  })

  it("[5] Test that ensures when we click on a tag, only projects for that tag are displayed", () => {
    cy.intercept({
      method: "GET",
      url: "/api/projects/?page=1&is_published=true&tags=Most%20Discussed"
    },
      {
        fixture: "discover/discuss-project.json"
      }).as("discuss-project")
    cy.getBySel("set-view_grid").click()
    cy.getBySel("tag-MostDiscussed").click()
    cy.wait(['@discuss-project'])
    cy.getBySel("project-individual_MostDiscussed").should('exist')
  })

  it("[6] Test that ensures the current tag is in the active state and the others are in the inactive state", () => {
    cy.intercept({
      method: "GET",
      url: "/api/projects/?page=1&is_published=true&tags=Most%20Discussed"
    },
      {
        fixture: "discover/discuss-project.json"
      }).as("discuss-project")
    cy.getBySel("set-view_grid").click()
    cy.getBySel("tag-MostDiscussed").click()
    cy.wait(['@discuss-project'])
    cy.getBySel("project-individual_MostDiscussed").should('exist')
  })

  it("[7] Test that ensures we can search projects using the search form", () => {
    cy.visit("/search?q=ABIA")
    cy.wait(10000)
    cy.getBySel("project-search_ABIA").should('exist')
  })

  it("[8] Test that ensures when we click the 'Around You' pill, the location modal is displayed", () => {
    cy.getBySel("around-you_pill", { timeout: 10000 }).click()
    cy.getBySel("location-allow_btn").should('exist')
  })

  it("[9] Test that ensures when the allow button is clicked projects around the user is displayed", () => {

    cy.getBySel("around-you_pill", { timeout: 10000 }).click()
    cy.getBySel("location-allow_btn").should('exist')
  })

  it("[10] Test that ensures when the user location is not available, the state modal is displayed", () => {
    cy.getBySel("around-you_pill").click()
    cy.getBySel("location-allow_btn").click()
    it("should be disabled", () => {
      expect(isPermissionAllowed("notifications")).to.be.false
      cy.get(".text-sm > :nth-child(2)").should("exist")
      cy.getBySel('location-set_modal').should('exist')
    })
  })

  it("[11] Test that ensures when a user clicks the submit button in the state modal, the projects in the selected state are displayed", () => {
    cy.getBySel("around-you_pill").click()
    cy.getBySel("location-allow_btn").click()
    it("should be disabled", () => {
      expect(isPermissionAllowed("notifications")).to.be.false
      cy.getBySel("location-select").select("ABIA")
      cy.getBySel("location-submit_btn").invoke("click")
    })
  })
})