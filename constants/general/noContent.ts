/** @format */

import { noContentPropTypes } from "@/@types/components/general.types"
import { noDiscoverProject } from "@/public/assets/SVG/general"
import { noEyemarked } from "@/public/assets/SVG/noContent"
import { citizensRoutes } from "../AppRoutes/citizens.routes"
import projectAssets from "@/public/assets/SVG/project"
import * as generalAssets from "@/public/assets/SVG/general"
import { notCitizen } from "@/helpers/general.helpers"

const discoverNoContent: noContentPropTypes = {
	title: "No projects",
	img: noEyemarked,
	body: "It seems that there aren't any projects on this tag. Select a different tag above to see projects with that tag",
}

const eyemarkedNoContent: noContentPropTypes = {
	title: "No eyemarked project",
	img: noEyemarked,
	body: "It seems that you aren’t keeping tabs on any project at the moment 😢. Click on the “Eyemark” button beside a project to get started!",
	buttonText: "Discover Projects to Eyemark",
	href: citizensRoutes.dashboard,
}

const discoverSearchNoContent: noContentPropTypes = {
	title: "No results found",
	img: noDiscoverProject,
	body: "We couldn't find what you were looking for, please check your spelling or try different keywords.",
}

const noProjectMediaContent: noContentPropTypes = {
	buttonText: "Add Photo Review",
	img: projectAssets["NoProjectMedia"],
	title: "No image yet",
	body: "It seems that no one has updated or reviewed this project with pictures. Why not upload some with your review.",
}

const noProjectReviewContent: noContentPropTypes = {
	// buttonText: "Review Project",
	img: projectAssets["noProjectReview"],
	title: "No reviews to show",
	body: "Looks like nobody has reviewed this project yet. Be the first!",
}

const noActivityContent: noContentPropTypes = {
	buttonText: "Back To Overview",
	img: projectAssets["noProjectActivity"],
	title: "Sorry! We don't have any updates available",
	body: "Unfortunately, we have not posted any update on this project. Kindly Eyemark and check back with us in the near future.",
}

const noProfilePostContent = (
	name?: string,
	notCitizen?: boolean
): noContentPropTypes => ({
	buttonText: name ? undefined : "Discover Projects to Review",
	img: generalAssets["NoReview"],
	title: "No review yet",
	body: `It seems that ${name || "you"} haven't ${
		notCitizen ? "updated a project yet 😢" : "reviewed a project yet 😢"
	}.${
		!notCitizen && !name
			? "Initiate a review by clicking the “pen” icon on a  project page or the comment counter on a project update."
			: ""
	}`,
})

const noProfileMediaContent = (
	name?: string,
	notCitizen?: boolean
): noContentPropTypes => ({
	buttonText: name ? undefined : "Discover Projects to Review",
	img: generalAssets["NoMedia"],
	title: "No image to show",
	body: `It seems that ${name || "you"} haven't made a photo review yet 😢. ${
		!name
			? "Click on “Add Image” while reviewing a project to share pictures with everyone."
			: ""
	}`,
})

const noProfileEyeMarkedContent = (
	name?: string,
	notCitizen?: boolean
): noContentPropTypes => ({
	buttonText: name ? undefined : "Discover Projects to Eyemark",
	img: generalAssets["NoEyeMarked"],
	title: notCitizen ? "No projects" : "No eyemarked project",
	body: `It seems that ${name || "you"} ${
		notCitizen
			? "isn't working on any project at the moment 😢."
			: "aren't keeping tabs on any project at the moment 😢."
	} ${
		!name
			? "Click on the “Eyemark” button beside a project to get started!"
			: ""
	}`,
})

export {
	eyemarkedNoContent,
	discoverSearchNoContent,
	noProjectMediaContent,
	noProjectReviewContent,
	noActivityContent,
	noProfilePostContent,
	noProfileMediaContent,
	noProfileEyeMarkedContent,
	discoverNoContent,
}
