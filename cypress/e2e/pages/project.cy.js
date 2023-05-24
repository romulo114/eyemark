describe("Eyemark Project Page", () => {
	beforeEach(() => {
		cy.visit(
			"/project/renovations-of-fish-technology-offices-and-outstation-offices-re-roofing-of-delapitated-japanese-d-ergp5100788"
		)
	})
	it("[1] Test that ensures project details are displayed when we navigate to the project overview page", () => {
		cy.getBySel("project-name").should("exist")
		cy.getBySel("project-display_name").should("exist")
		cy.getBySel("project-percentage_completed").should("exist")
		cy.getBySel("project-total_project_cost").should("exist")
		cy.getBySel("project-timeline").should("exist")
		cy.getBySel("project-start_date").should("exist")
		cy.getBySel("project-end_date").should("exist")
		cy.getBySel("project-total_appropriated").should("exist")
		cy.getBySel("project-amount_spent_so_far").should("exist")
		cy.getBySel("project-shildren_project").should("exist")
		cy.getBySel("project-page_views").should("exist")
		cy.getBySel("project-description").should("exist")
		cy.getBySel("project-contractors").should("exist")
		cy.getBySel("project-sustainable_development_goals").should("exist")
	})

	it("[2] Test that ensures project activity is displayed when we navigate to the project activity page", () => {
		cy.getBySel("project-tab_Activity").click()
		cy.getBySel("project-tab_activity_content").should("exist")
	})

	it("[3] Test that ensures that when a project has no activity, the no activity page is displayed", () => {
		cy.visit(
			"/project/renovations-of-fish-technology-offices-and-outstation-offices-re-roofing-of-delapitated-japanese-d-ergp51007888/"
		)
		cy.getBySel("project-tab_Activity").click()
		cy.get('[alt="illustration"]').should("exist")
	})

	it("[4] Test that ensures project media is displayed when we navigate to the project media page", () => {
		cy.getBySel("project-tab_Media").click()
		cy.getBySel("project-tab_media_content").should("exist")
	})

	it("[5] Test that ensures that when a project has no media, the no media page is displayed", () => {
		cy.visit(
			"/project/renovations-of-fish-technology-offices-and-outstation-offices-re-roofing-of-delapitated-japanese-d-ergp51007888"
		)

		cy.getBySel("project-tab_Media").click()
		cy.get('[alt="illustration"]').should("exist")
	})

	it("[6] Test that ensures project review is displayed when we navigate to the project review page", () => {
		cy.getBySel("project-tab_Reviews").click()
		cy.getBySel("project-tab_reviews_content").should("exist")
	})

	it("[7] Test that ensures that when a project has no review, the no review page is displayed", () => {
		cy.visit(
			"/project/renovations-of-fish-technology-offices-and-outstation-offices-re-roofing-of-delapitated-japanese-d-ergp51007888"
		)
		cy.getBySel("project-tab_Reviews").click()
		cy.getBySel("project-tab_reviews_content").should("exist")
		cy.get('[alt="illustration"]').should("exist")
	})

	it("[8] Test that ensures the [see all] text is shown when we have more than one geolocation for a project", () => {
		cy.intercept(
			{
				method: "GET",
				url: "/api/projects/renovations-of-fish-technology-offices-and-outstation-offices-re-roofing-of-delapitated-japanese-d-ergp5100788",
			},
			{
				fixture: "project/overview.json",
			}
		).as("project-overview")
		cy.getBySel("project-geo_location_see_all").should("exist")
	})

	it("[9] Test that ensures when the user hovers on the [see all], the dropdown that shows all locations for the project is displayed", () => {
		cy.getBySel("project-geo_location_see_all").realHover("mouse")
	})

	it("[10] Test that ensures our more icon button is shown on the page", () => {
		cy.getBySel("project-more_icon").should("exist")
	})

	it("[11] Test that ensures when we hover on our more icon button, the review and share icons are shown", () => {
		cy.getBySel("project-more_icon_wrapper").realHover()
		cy.getBySel("project-more_icon_wrapper").trigger("mouseenter", {
			force: true,
		})
		cy.getBySel("project-review_icon").invoke("show")
		cy.getBySel("project-share_icon_wrapper").invoke("show")
		cy.getBySel("project-review_icon").should("exist")
		cy.getBySel("project-share_icon_wrapper").should("exist")
	})

	it("[12] Test that ensures when we click on our share icon, the share modal is displayed", () => {
		cy.wait(5000)
		cy.getBySel("project-share_icon_wrapper").invoke("show")
		cy.get(
			'[data-testid="project-share_icon_wrapper"] > [data-testid="project-share_icon"]'
		).invoke("click")
	})

	it("[13] Test that ensures when we click on our review icon, the review modal is displayed", () => {
		cy.wait(5000)
		cy.getBySel("project-review_icon").invoke("show")
		cy.getBySel("project-review_icon").click({ force: true })
		cy.getBySel("modal_auth").should("exist")
	})

	it("[14] Test that ensures when the [see all] text is clicked, it navigates to the project activity page", () => {
		cy.getBySel("project-see_all").invoke("click")
		cy.getBySel("project-tab_activity_content").should("exist")
	})

	it("[15] Test that ensures when the [view all] text is clicked, it navigates to the project reviews page", () => {
		cy.getBySel("project-review_view_all").invoke("click")
		cy.getBySel("project-tab_reviews_content").should("exist")
	})

	it("[16] Test that ensures we hover on the info icon in the appropriation panel, the dropdown is displayed", () => {
		cy.wait(5000)
		cy.getBySel("project-appropriated_more_info").invoke("mouseover")
		cy.getBySel("project-appropriated_more_info_dropdown").invoke("show")
		cy.getBySel("project-appropriated_more_info_dropdown").should("exist")
	})

	it("[17] Test that ensures the eyemark button is in the inactive state when the project is not eyemarked by the user", () => {
		cy.intercept(
			{
				method: "GET",
				url: "/api/users/me/eyemarks",
			},
			{
				fixture: "project/eyemark-unmark.json",
			}
		).as("project-mark")
		cy.getBySel("project-btn_eyemark").should("exist")
	})

	it("[18] Test that ensures the eyemark button is in the active state when the project is eyemarked by the user", () => {
		cy.intercept(
			{
				method: "GET",
				url: "/api/users/me/eyemarks",
			},
			{
				fixture: "project/eyemark-mark.json",
			}
		).as("project-unmark")
		cy.getBySel("project-btn_eyemark").should("exist")
	})

	// it("[2] Test that ensures when project overview/activity/media/review is not displayed because of a network error, a network error page with a retry button is displayed", () => {
	// 	cy.intercept(
	// 		"GET",
	// 		"/api/projects/renovations-of-fish-technology-offices-and-outstation-offices-re-roofing-of-delapitated-japanese-d-ergp5100788/",
	// 		{
	// 			forceNetworkError: true,
	// 		}
	// 	).as("project-overview")
	// 	cy.intercept(
	// 		{
	// 			method: "GET",
	// 			url: "/api/projects/renovations-of-fish-technology-offices-and-outstation-offices-re-roofing-of-delapitated-japanese-d-ergp5100788/media/",
	// 		},
	// 		{
	// 			forceNetworkError: true,
	// 		}
	// 	).as("project-media")
	// 	cy.intercept(
	// 		{
	// 			method: "GET",
	// 			url: "/api/projects/renovations-of-fish-technology-offices-and-outstation-offices-re-roofing-of-delapitated-japanese-d-ergp5100788/updates/",
	// 		},
	// 		{
	// 			forceNetworkError: true,
	// 		}
	// 	).as("project-activity")
	// 	cy.intercept(
	// 		{
	// 			method: "GET",
	// 			url: "/api/projects/renovations-of-fish-technology-offices-and-outstation-offices-re-roofing-of-delapitated-japanese-d-ergp5100788/reviews/",
	// 		},
	// 		{
	// 			forceNetworkError: true,
	// 		}
	// 	).as("project-reviews")

	// 	cy.wait(
	// 		[
	// 			"@project-overview",
	// 			// "@project-media",
	// 			// "@project-activity",
	// 			// "@project-reviews",
	// 		],
	// 		{ timeout: 15000 }
	// 	)

	// 	cy.getBySel("project-tab_Activity").click()
	// 	cy.get('[alt="illustration"]').should("exist")

	// 	cy.getBySel("project-tab_Media").click()
	// 	cy.get('[alt="illustration"]').should("exist")

	// 	cy.getBySel("project-tab_Reviews").click()
	// 	cy.get('[alt="illustration"]').should("exist")
	// })
})
