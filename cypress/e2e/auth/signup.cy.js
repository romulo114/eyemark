import {
  citizenLoginCred,
  correctCode,
  interestData,
  signupCred,
  suggestionData,
} from "./cred";

describe("signup flow", () => {
  it("attempt to reach any other signup page directly redirects to user-type page", () => {
    //navigate to the signup/verify-code page
    cy.visit("/auth/signup/verify-code");

    //verify we're redirected to the user-type page
    cy.url().should("include", "/auth/signup/user-type");
  });

  it("signing up with exisiting email throws error", () => {
    //navigate to the signup/user-type page
    cy.visit("/auth/signup/user-type");

    //verify we re on the user-type page
    cy.findByText(/Step 0 of 6/i);

    //select the user type
    cy.get('[type="radio"]').check("citizen");

    //click the next button
    cy.findByRole("button", { name: /next/i }).click();

    // //verify we re on the user-type page
    cy.findByText(/Step 1 of 6/i);

    // //fill the email
    cy.findByLabelText(/email/i)
      .type(citizenLoginCred.email)
      .should("have.value", citizenLoginCred.email);

    // //fill the password
    cy.findByLabelText(/password/i)
      .type(citizenLoginCred.password)
      .should("have.value", citizenLoginCred.password);

    cy.findByRole("button", { name: /next/i }).click();

    cy.url().should("include", "/auth/signup/profile");

    cy.findByText(/A user is already registered with this e-mail address./i);
  });

  it("signing up with valid details navigates to verification code page", () => {
    cy.visit("/auth/signup/user-type");

    cy.findByText(/Step 0 of 6/i);

    cy.get('[type="radio"]').check("citizen");

    cy.findByRole("button", { name: /Next/i }).click();

    cy.findByText(/Step 1 of 6/i);

    cy.findByLabelText(/email/i)
      .type(signupCred.email)
      .should("have.value", signupCred.email);

    cy.findByLabelText(/password/i)
      .type(signupCred.password)
      .should("have.value", signupCred.password);

    cy.findByRole("button", { name: /Next/i }).click();

    //verify we re on the verify-code page
    cy.url().should("include", "/auth/signup/verify-code");

    //verify we re on the verify-code page
    cy.findByText(/Step 2 of 6/i);
  });

  it("verifying invalid code throws an error", () => {
    cy.visit("/auth/signup/user-type");

    cy.findByText(/Step 0 of 6/i);

    cy.get('[type="radio"]').check("citizen");

    cy.findByRole("button", { name: /Next/i }).click();

    cy.findByText(/Step 1 of 6/i);

    cy.findByLabelText(/email/i)
      .type(signupCred.email)
      .should("have.value", signupCred.email);

    cy.findByLabelText(/password/i)
      .type(signupCred.password)
      .should("have.value", signupCred.password);

    cy.findByRole("button", { name: /Next/i }).click();

    cy.url().should("include", "/auth/signup/verify-code");

    cy.findByText(/Step 2 of 6/i);

    // fill invalid code
    cy.findByLabelText(/Verification Code/i)
      .type("2344454")
      .should("have.value", "2344454");

    cy.findByRole("button", { name: /Next/i }).click();

    cy.findByText(/Given token not valid for any token type/i);
  });

  it("cso user type navigates to names page with three inputs", () => {
    cy.visit("/auth/signup/user-type");

    cy.findByText(/Step 0 of 6/i);

    cy.get('[type="radio"]').check("cso");

    cy.findByRole("button", { name: /Next/i }).click();

    cy.findByText(/Step 1 of 6/i);

    cy.findByLabelText(/email/i)
      .type(signupCred.email)
      .should("have.value", signupCred.email);

    cy.findByLabelText(/password/i)
      .type(signupCred.password)
      .should("have.value", signupCred.password);

    cy.findByRole("button", { name: /Next/i }).click();

    cy.url().should("include", "/auth/signup/verify-code");

    cy.findByText(/Step 2 of 6/i);

    cy.findByLabelText(/Verification Code/i)
      .type(correctCode)
      .should("have.value", correctCode);

    cy.findByRole("button", { name: /Next/i }).click();

    cy.findByText(/Step 3 of 6/i);

    cy.findByLabelText(/Company Name/i);
    cy.findByLabelText(/RC Number/i);
    cy.findByLabelText(/Contact's Phone Number/i);
  });

  it("complete signup flow", () => {
    cy.visit("/auth/signup/user-type");

    cy.findByText(/Step 0 of 6/i);

    cy.get('[type="radio"]').check("citizen");

    cy.findByRole("button", { name: /Next/i }).click();

    cy.findByText(/Step 1 of 6/i);

    cy.findByLabelText(/email/i)
      .type(signupCred.email)
      .should("have.value", signupCred.email);

    cy.findByLabelText(/password/i)
      .type(signupCred.password)
      .should("have.value", signupCred.password);

    cy.findByRole("button", { name: /Next/i }).click();

    cy.url().should("include", "/auth/signup/verify-code");

    cy.findByText(/Step 2 of 6/i);

    cy.findByLabelText(/Verification Code/i)
      .type(correctCode)
      .should("have.value", correctCode);

    cy.findByRole("button", { name: /Next/i }).click();

    cy.findByText(/Step 3 of 6/i);

    cy.findByLabelText(/Display Name/i)
      .type("noble")
      .should("have.value", "noble");

    cy.findByRole("button", { name: /Next/i }).click();

    cy.findByText(/Step 4 of 6/i);

    cy.findByRole("button", { name: /Skip for now/i }).click();

    cy.findByText(/Step 5 of 6/i);

    // select
    cy.findByRole("button", { name: interestData.locations[0] }).click();
    cy.findByRole("button", { name: interestData.sdgs[0] }).click();
    cy.findByRole("button", { name: interestData.ministries[0] }).click();

    // deselect
    cy.findByRole("button", { name: interestData.sdgs[0] }).click();

    cy.findByRole("button", { name: /Next/i }).click();

    cy.findByText(/Step 6 of 6/i);

    cy.get(`#${suggestionData.projects[0].id}`).click();

    cy.findByRole("button", { name: /Next/i }).click();

    cy.url().should("include", "/citizens");
  });
});
