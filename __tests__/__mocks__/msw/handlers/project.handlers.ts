// src/mocks/handlers.js
import { rest } from "msw"
import {
	project,
	projectMedia,
	projectReviews,
	projectUpdates,
} from "__tests__/__mocks__/Response/projectRes"

const BASE_URL = "https://staging.eyemark.ng/api"

export const projectHandlers = [
	//get project
	rest.get(
		`${BASE_URL}/projects/renovations-of-fish-technology-offices-and-outstation-offices-re-roofing-of-delapitated-japanese-d-ergp5100788/`,
		async (req, res, ctx) => {
			return res(ctx.status(200), ctx.json(project))
		}
	),

	//get images
	rest.get(
		`${BASE_URL}/projects/renovations-of-fish-technology-offices-and-outstation-offices-re-roofing-of-delapitated-japanese-d-ergp5100788/media/`,
		async (req, res, ctx) => {
			return res(ctx.status(200), ctx.json(projectMedia))
		}
	),

	//get reviews
	rest.get(
		`${BASE_URL}/projects/renovations-of-fish-technology-offices-and-outstation-offices-re-roofing-of-delapitated-japanese-d-ergp5100788/reviews/`,
		async (req, res, ctx) => {
			return res(ctx.status(200), ctx.json(projectReviews))
		}
	),

	//get updates
	rest.get(
		`${BASE_URL}/projects/renovations-of-fish-technology-offices-and-outstation-offices-re-roofing-of-delapitated-japanese-d-ergp5100788/updates/`,
		async (req, res, ctx) => {
			return res(ctx.status(200), ctx.json(projectUpdates))
		}
	),

	//test for new project id
	rest.get(
		`${BASE_URL}/projects/renovations-of-fish-technology-offices-and-outstation-offices-re-roofing-of-delapitated-japanese-d-ergp51007888/`,
		async (req, res, ctx) => {
			return res(ctx.status(200), ctx.json(project))
		}
	),

	//get images
	rest.get(
		`${BASE_URL}/projects/renovations-of-fish-technology-offices-and-outstation-offices-re-roofing-of-delapitated-japanese-d-ergp51007888/media/`,
		async (req, res, ctx) => {
			return res(ctx.status(200), ctx.json([]))
		}
	),

	//get reviews
	rest.get(
		`${BASE_URL}/projects/renovations-of-fish-technology-offices-and-outstation-offices-re-roofing-of-delapitated-japanese-d-ergp51007888/reviews/`,
		async (req, res, ctx) => {
			return res(ctx.status(200), ctx.json([]))
		}
	),

	//get updates
	rest.get(
		`${BASE_URL}/projects/renovations-of-fish-technology-offices-and-outstation-offices-re-roofing-of-delapitated-japanese-d-ergp51007888/updates/`,
		async (req, res, ctx) => {
			return res(ctx.status(200), ctx.json([]))
		}
	),
]
