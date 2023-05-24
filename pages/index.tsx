/** @format */

import HomeLayout from "@/components/layouts/homeLayout"
import type { NextPage } from "next"
import styles from "@/styles/home.module.scss"
import TextPrimary from "@/components/shared/textPrimary"
import { textElementType } from "@/@types/components/general.types"
import {
	appstore,
	eyeEmoji,
	featuresMotif,
	featuresMotifMobile,
	goldGradientCaret,
	greenGradientCaret,
	heroMotif,
	landingMotif,
	playstore,
	scrollDown,
} from "@/public/assets/SVG/home"
import { Link as Scroll } from "react-scroll"
import Image from "next/image"
import {
	landing1,
	landing2,
	landing3a,
	landing3b,
	landing3c,
	landing4,
} from "@/public/assets/PNG"
import Link from "next/link"
import { citizensRoutes } from "@/constants/AppRoutes/citizens.routes"
import { authRoutes } from "@/constants/AppRoutes/auth.routes"
import { whiteCaret } from "@/public/assets/SVG/general"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useAppDispatch, useAppSelector } from "@/hooks/redux.hooks"
import { filterSelector, setFrom, setQuery } from "@/store/slices/filter.slice"
import { KeyboardEvent, SyntheticEvent, useEffect } from "react"
import { useRouter } from "next/router"
import { generalRoutes } from "@/constants/AppRoutes/general.routes"

const Home: NextPage = () => {
	const dispatch = useAppDispatch()
	const {
		search: { query },
	} = useAppSelector(filterSelector)
	const router = useRouter()
	const features = [
		{
			name: "Eyemark (Follow) projects and never miss out on project updates",
			image: landing3a,
			height: 207,
			width: 381,
		},
		{
			name: "Discover projects close to you",
			image: landing3b,
			height: 282,
			width: 381,
		},
		{
			name: "Post reviews and live photos of projects",
			image: landing3c,
			height: 384,
			width: 381,
		},
	]

	const _handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget
		dispatch(setQuery(value))
	}

	const _handleExplore = () => {
		if (query.length > 0)
			return router.push(`${generalRoutes.search}?q=${query}`)
		router.push(citizensRoutes.dashboard)
	}

	const _handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && query.length > 0) _handleExplore()
	}

	useEffect(() => {
		dispatch(setFrom("search"))
		dispatch(setQuery(""))
	}, [])

	return (
		<HomeLayout>
			<div className={styles["landing-hero"]}>
				<div className="lg:w-5/12 sm:w-7/12 mx-auto relative z-20">
					<TextPrimary
						translation="home"
						elementType={textElementType.heading}
						headingLevel={1}
						className="xl:text-7xl sm:text-5xl text-4xl text-white text-center w-full font-bold"
					>
						The new way to track projects
					</TextPrimary>
					<TextPrimary
						translation="home"
						className="mt-6 text-sm xl:w-10/12 mx-auto w-full text-center text-lightGreen2"
					>
						Eyemark is the easiest way to discover and track
						government projects anytime, anywhere in Nigeria
					</TextPrimary>

					<div className="flex justify-center w-full lg:absolute -bottom-24">
						<div className={styles["explore-input"]}>
							<input
								type="text"
								id="discover"
								placeholder="Search for any Project, LGA, State or Contractor"
								className="text-xs text-light-grey-6 medium focus:outline-none flex-grow truncate"
								onChange={_handleChange}
								onKeyDown={_handleEnter}
								value={query}
							/>
							<button
								className="bg-accepted medium text-xs rounded-full px-4 py-2.5 text-white flex items-center"
								onClick={_handleExplore}
							>
								<TextPrimary
									elementType={textElementType.Span}
									translation="home"
								>
									Explore
								</TextPrimary>
								<TextPrimary
									translation="home"
									elementType={textElementType.Span}
									className="hidden lg:block ml-1"
								>
									Projects
								</TextPrimary>
							</button>
						</div>
					</div>

					<div className="mt-16 lg:mt-12">
						<TextPrimary
							translation="home"
							className="uppercase text-sm text-center medium text-white"
						>
							our partners:
						</TextPrimary>
						<div className="xl:w-9/12 lg:w-11/12 mx-auto mt-6 flex items-center justify-center">
							<span
								className={`${styles["partners"]} ${styles["partner1"]}`}
							/>
						</div>
					</div>
				</div>

				<div className="absolute -top-20 sm:top-0 h-full bottom-0 -right-40 lg:right-0 z-0 overflow-hidden">
					<Image src={heroMotif} alt="motif" />
				</div>
			</div>

			{/* ministries and contractors */}
			<div className={`${styles["landing-section"]} xl:py-36 py-24`}>
				<div className="absolute w-full justify-center top-16 right-0 hidden lg:flex">
					<Scroll
						to="first-section"
						className="cursor-pointer"
						smooth={true}
					>
						<Image src={scrollDown} />
					</Scroll>
				</div>

				<div
					className={`${styles["image-section"]} flex flex-col items-center order-2 lg:order-1`}
					id="first-section"
				>
					<Image
						src={landing1}
						height={1000}
						width={1000}
						alt="ministries&contractors"
					/>
					<Link href={citizensRoutes.dashboard}>
						<a className="lg:hidden inline-block">
							<div className={styles["explore-projects-green"]}>
								<TextPrimary
									translation="home"
									className={`medium ${styles["green-explore-projects-button"]} mr-5`}
								>
									Explore all projects
								</TextPrimary>
								<Image
									src={greenGradientCaret}
									alt="right-icon"
									className="ml-5"
								/>
							</div>
						</a>
					</Link>
				</div>
				<div className={`${styles["text-section"]} order-1 lg:order-2`}>
					<TextPrimary
						translation="home"
						className={`${styles["text-head"]} text-accepted medium`}
					>
						Ministries & Contractors
					</TextPrimary>
					<TextPrimary
						translation="home"
						elementType={textElementType.heading}
						headingLevel={1}
						className={`${styles["text-title"]} medium`}
					>
						Explore MDA Projects
					</TextPrimary>
					<TextPrimary
						translation="home"
						className={styles["text-subtitle"]}
					>
						Do you want to know what’s happening with specific
						Ministries, Departments, Agencies or contractor
						projects? Create an account and be one of the first to
						get all the updates you need straight from MDAs and
						Contractors.
					</TextPrimary>

					<Link href={citizensRoutes.dashboard}>
						<a className="hidden lg:inline-block mt-10">
							<div
								className={`${styles["explore-projects-green"]} transform hover:-translate-y-1 transition duration-1000 ease-in-out`}
							>
								<TextPrimary
									translation="home"
									className={`medium ${styles["green-explore-projects-button"]} mr-5`}
								>
									Explore all projects
								</TextPrimary>
								<Image
									src={greenGradientCaret}
									alt="right-icon"
								/>
							</div>
						</a>
					</Link>
				</div>

				<div className="absolute bottom-0 -mb-56 inset-x-0 w-full z-0">
					<Image src={landingMotif} alt="motif" />
				</div>
			</div>

			{/* citizens and csos */}
			<div className={`${styles["landing-section"]} pb-16`}>
				<div className={styles["text-section"]}>
					<TextPrimary
						className={`${styles["text-head"]} medium text-pending`}
						translation="home"
					>
						citizens &cso
					</TextPrimary>
					<TextPrimary
						translation="home"
						elementType={textElementType.heading}
						headingLevel={1}
						className={`${styles["text-title"]} medium`}
					>
						Review and engage with users on projects
					</TextPrimary>
					<TextPrimary
						translation="home"
						className={styles["text-subtitle"]}
					>
						You can post text and media reviews on projects and also
						view and engage with reviews from other citizens.
					</TextPrimary>

					<Link href={authRoutes.createAccount}>
						<a>
							<button className="hidden lg:block mt-10">
								<div
									className={`${styles["explore-projects-gold"]} transform hover:-translate-y-1 transition duration-1000 ease-in-out`}
								>
									<TextPrimary
										translation="home"
										className={`medium ${styles["gold-explore-projects-button"]} mr-5`}
									>
										Sign up to Review Projects
									</TextPrimary>
									<Image
										src={goldGradientCaret}
										alt="right-icon"
									/>
								</div>
							</button>
						</a>
					</Link>
				</div>
				<div
					className={`${styles["image-section"]} flex flex-col items-center`}
				>
					<Image
						src={landing2}
						height={1000}
						width={1150}
						alt="citizens&cso"
					/>
					<Link href={authRoutes.createAccount}>
						<a>
							<button className="lg:hidden">
								<div
									className={`${styles["explore-projects-gold"]} transform hover:-translate-y-1 transition duration-1000 ease-in-out`}
								>
									<TextPrimary
										translation="home"
										className={`medium ${styles["gold-explore-projects-button"]} mr-5`}
									>
										Sign up to Review Projects
									</TextPrimary>
									<Image
										src={goldGradientCaret}
										alt="right-icon"
									/>
								</div>
							</button>
						</a>
					</Link>
				</div>
			</div>

			{/* features */}
			<div className="xl:px-32 sm:px-20 px-7 xl:pt-16 pt-12 xl:pb-72 lg:pb-60 pb-10 relative bg-features-brown">
				<div className="relative z-20">
					<Link href={citizensRoutes.dashboard}>
						<a>
							<button className="flex items-center px-6 py-3 rounded-full bg-accepted text-sm text-white mx-auto transform hover:-translate-y-1 transition duration-1000 ease-in-out">
								<TextPrimary
									translation="home"
									className="medium"
								>
									Preview Eyemark Features
								</TextPrimary>
								<div className="ml-5 transform rotate-180">
									<Image height={10} src={whiteCaret} />
								</div>
							</button>
						</a>
					</Link>

					<div className="mt-11 lg:mt-9 flex flex-nowrap items-end justify-center">
						<TextPrimary
							translation="home"
							elementType={textElementType.heading}
							headingLevel={1}
							className="xl:text-4xl text-2xl text-white text-center whitespace-nowrap"
						>
							More Features? Ofcourse!
						</TextPrimary>
						<span className="ml-1 sm:ml-2">
							<Image
								height={25}
								width={25}
								src={eyeEmoji}
								alt="caret"
							/>
						</span>
					</div>

					<TextPrimary
						translation="home"
						className={styles["feature-sub"]}
					>
						Do more with Eyemark! Keep up with projects, fill out
						surveys, and discover the most talked about projects in
						the country.
					</TextPrimary>
				</div>

				<div className="hidden sm:block absolute top-0 right-0 h-full inset-x-0 w-full z-0 overflow-hidden">
					<Image src={featuresMotif} layout="fill" alt="motif" />
				</div>
				<div className="sm:hidden absolute top-0 right-0 h-full inset-x-0 w-full z-0">
					<Image src={featuresMotifMobile} alt="motif" />
				</div>
			</div>

			<div className="lg:-mt-44 lg:px-24 flex flex-col lg:flex-row relative z-20 lg:overflow-x-auto pb-10 bg-features-brown lg:bg-transparent">
				{features.map((feature) => (
					<div
						className="lg:w-4/12 w-full flex-shrink-0"
						key={feature.name}
					>
						<TextPrimary
							translation="home"
							className="text-xs text-center mx-auto xl:w-7/12 w-8/12 text-white"
						>
							{feature.name}
						</TextPrimary>
						<div className="flex justify-center sm:w-11/12 mx-auto mt-3">
							<Image
								src={feature.image}
								width={feature.width}
								height={feature.height}
								alt="feature"
							/>
						</div>
					</div>
				))}
			</div>

			{/* mobile app */}
			<div className="xl:px-32 sm:px-20 px-7 xl:py-32 py-12">
				<div className="sm:px-16 px-5 flex flex-col lg:flex-row items-center lg:items-start bg-grey-white rounded-3xl relative">
					<div className="lg:w-6/12 sm:w-9/12 lg:py-14 pt-6 flex flex-col">
						<div className="mb-5">
							<TextPrimary
								translation="home"
								className="mt-2 uppercase text-accepted tracking-sectionhead text-xs"
							>
								SIGN UP
							</TextPrimary>
							<TextPrimary
								translation="home"
								elementType={textElementType.heading}
								headingLevel={1}
								className="mt-5 xl:text-4xl lg:text-3xl text-2xl text-black medium"
							>
								Take Eyemark with you everywhere you go
							</TextPrimary>

							<TextPrimary
								translation="home"
								className="mt-4 text-sub-text text-sm xl:w-9/12 w-11/12"
							>
								Collaborate, monitor, track and give feedback on
								the go with Eyemark mobile
							</TextPrimary>
							<TextPrimary
								translation="home"
								className="mt-10 uppercase text-pending tracking-sectionhead text-xs"
							>
								MOBILE APP
							</TextPrimary>

							<div className="flex items-center mt-6 sm:space-x-8 space-x-4">
								<button>
									<Image src={playstore} alt="playstore" />
									<TextPrimary
										translation="home"
										className="text-3-xs text-pending tracking-wider uppercase mt-1 ml-4 medium"
									>
										coming soon
									</TextPrimary>
								</button>
								<button>
									<Image src={appstore} alt="appstore" />
									<TextPrimary
										translation="home"
										className="text-3-xs text-pending tracking-wider uppercase mt-1 ml-4 medium"
									>
										coming soon
									</TextPrimary>
								</button>
							</div>
						</div>
						<img
							src={landing4}
							alt=""
							className="xl:w-4/12 lg:w-5/12 lg:absolute right-16 bottom-0 hidden lg:flex justify-center"
						/>
					</div>
				</div>
				<Link href={citizensRoutes.dashboard} className="text-sm">
					<button className="flex items-center justify-center w-full lg:w-auto lg:px-32 py-3 lg:py-5 mt-8 lg:mt-16 medium rounded-full bg-accepted text-sm text-white mx-auto transform hover:-translate-y-1 transition duration-1000 ease-in-out">
						Jump Right Into Eyemark{" "}
						<div className="ml-5 transform rotate-180">
							<Image height={10} src={whiteCaret} />
						</div>
					</button>
				</Link>
			</div>
		</HomeLayout>
	)
}

export default Home

export async function getServerSideProps(context: any) {
	const { req, locale } = context

	return {
		props: {
			...(await serverSideTranslations(locale, ["home"])),
			// Will be passed to the page component as props
		},
	}
}
