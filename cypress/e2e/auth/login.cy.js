/** @format */
import { citizenLoginCred, mdaLoginCred, contractorLoginCred } from "./cred"

describe("login flow", () => {
	it("logging in with a valid citizens credential routes to the citizens dashboard", () => {
		//navigate to the login page
		cy.visit("/auth/login")

		//verify we re on the login page
		cy.findByText(/Enter your email address and password to log in./i)

		//fill the email
		cy.findByLabelText(/email/i)
			.type(citizenLoginCred.email)
			.should("have.value", citizenLoginCred.email)

		//fill the password
		cy.findByLabelText(/password/i)
			.type(citizenLoginCred.password)
			.should("have.value", citizenLoginCred.password)

		cy.findByRole("button", { name: /log in/i }).click()

		cy.url().should("include", "/citizens")

		cy.findByText(/welcome to citizens dashboard/i)
	})

	it("logging in with a valid mda credential routes to the mda's dashboard", () => {
		//navigate to the login page
		cy.visit("/auth/login")

		//verify we re on the login page
		cy.findByText(/Enter your email address and password to log in./i)

		//fill the email
		cy.findByLabelText(/email/i)
			.type(mdaLoginCred.email)
			.should("have.value", mdaLoginCred.email)

		//fill the password
		cy.findByLabelText(/password/i)
			.type(mdaLoginCred.password)
			.should("have.value", mdaLoginCred.password)

		cy.findByRole("button", { name: /log in/i }).click()

		cy.url().should("include", "/mda")
		cy.findByText(/welcome to mda dashboard/i)
	})

	it("logging in with a valid contractor credential routes to the contractors dashboard", () => {
		//navigate to the login page
		cy.visit("/auth/login")

		//verify we re on the login page
		cy.findByText(/Enter your email address and password to log in./i)

		//fill the email
		cy.findByLabelText(/email/i)
			.type(contractorLoginCred.email)
			.should("have.value", contractorLoginCred.email)

		//fill the password
		cy.findByLabelText(/password/i)
			.type(contractorLoginCred.password)
			.should("have.value", contractorLoginCred.password)

		cy.findByRole("button", { name: /log in/i }).click()

		cy.url().should("include", "/contractors")

		cy.findByText(/welcome to contractors dashboard/i)
	})

	it("logging in with an invalid cred throws an error", () => {
		//navigate to the login page
		cy.visit("/auth/login")

		//verify we re on the login page
		cy.findByText(/Enter your email address and password to log in./i)

		//fill the email
		cy.findByLabelText(/email/i)
			.type(contractorLoginCred.email)
			.should("have.value", contractorLoginCred.email)

		//fill the password
		cy.findByLabelText(/password/i)
			.type(mdaLoginCred.password)
			.should("have.value", mdaLoginCred.password)

		cy.findByRole("button", { name: /log in/i }).click()

		cy.url().should("include", "/auth/login")

		cy.findByText(/Unable to log in with provided credentials./i)
	})

	it("navigating to mda or contractor dashboard without login in should navigate to login page", () => {
		//navigate to the login page
		cy.visit("/mda")

		//verify we re on the login page
		cy.findByText(/Enter your email address and password to log in./i)
		cy.url().should("include", "/auth/login")

		//navigate to the login page
		cy.visit("/contractors")

		//verify we re on the login page
		cy.findByText(/Enter your email address and password to log in./i)
		cy.url().should("include", "/auth/login")
	})
})
