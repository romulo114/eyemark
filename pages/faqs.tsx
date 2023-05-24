/** @format */

import { textElementType } from "@/@types/components/general.types"
import HomeLayout from "@/components/layouts/homeLayout"
import TextPrimary from "@/components/shared/textPrimary"
import { faqCategories, faqs } from "@/constants/general/faqs"
import { faqMotif } from "@/public/assets/SVG/faqs"
import { searchIcon } from "@/public/assets/SVG/general"
import { NextPage } from "next"
import Image from "next/image"
import { SyntheticEvent, useState } from "react"
import styles from "@/styles/faqs.module.scss"
import FAQCard from "@/components/shared/faqCard"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"

const FAQs: NextPage = () => {
	const [active, setActive] = useState<String>("")
	const [filteredFAQs, setfilteredFAQs] = useState(faqs)

	const onSearch = (event: SyntheticEvent<HTMLInputElement>) => {
		const query = event.currentTarget.value
		if (query === "") {
			setfilteredFAQs(faqs)
		} else {
			setfilteredFAQs(
				faqs.filter(
					(faq) =>
						faq?.title
							.toLowerCase()
							.includes(query.toLowerCase()) ||
						faq?.content.toLowerCase().includes(query.toLowerCase())
				)
			)
		}
	}

	const label = {
		"get-started": "Get Started",
		stakeholders: "Stakeholders",
		troubleshooting: "Troubleshooting",
		features: "Features",
	}

	return (
		<HomeLayout>
			<Head>
				<title>{`Eyemark  - FAQs`}</title>
			</Head>
			<div
				className={`${styles["faq-hero"]} relative py-28 overflow-hidden`}
			>
				<div className="relative z-10 flex flex-col items-center px-10">
					<TextPrimary
						translation="home"
						elementType={textElementType.heading}
						headingLevel={1}
						className="text-3xl lg:text-6xl text-center font-bold text-white"
					>
						Hello, how can we help?
					</TextPrimary>
					<div className="relative mt-12">
						<input
							type="text"
							className="text-sm lg:text-base py-2 px-4 rounded-full text-light-grey-6 focus:outline-none"
							placeholder="Ask a question"
							onChange={onSearch}
						/>
						<div className="absolute right-3 top-0 h-full flex items-center">
							<Image src={searchIcon} alt="search" />
						</div>
					</div>
					<TextPrimary
						className="text-sm lg:text-lg text-EB mt-12 text-center"
						translation="home"
					>
						Look below for answers to the frequently asked questions
						about Eyemark.
					</TextPrimary>
				</div>
				<div className="absolute -bottom-6 lg:-bottom-96 w-full right-0 z-0">
					<Image src={faqMotif} alt="" />
				</div>
			</div>

			<div className="px-5">
				<TextPrimary
					className="text-lg lg:text-2xl medium text-center text-dark-grey mt-16"
					translation="home"
				>
					Get familiar with Eyemark and be on your way to becoming a
					Patriot
				</TextPrimary>

				<div className="mt-16 flex flex-col sm:flex-wrap sm:flex-row justify-center xl:space-x-8 items-center">
					{faqCategories.map((category) => (
						<div
							key={category.name}
							className={`${styles["faq-categories"]} ${
								category.styles
							} ${
								active === category.state &&
								"border border-accepted"
							}`}
							onClick={() => setActive(category.state)}
						>
							<Image src={category.image} alt="eyemark" />
							<TextPrimary
								className="text-dark-grey text-xl text-center mt-5"
								translation="home"
							>
								{category.name}
							</TextPrimary>
							<TextPrimary
								className="text-light-grey-6 text-sm text-center"
								translation="home"
							>
								{category.desciption}
							</TextPrimary>
						</div>
					))}
				</div>

				<div className="mt-24 mb-20 lg:mt-32 lg:px-32">
					<TextPrimary
						className="text-xl lg:text-2xl medium"
						translation="home"
					>
						{active
							? label[active as keyof typeof label]
							: "Get Started"}
					</TextPrimary>

					{filteredFAQs.length ? (
						filteredFAQs.map((value) => (
							<div
								className={`py-7 px-8 rounded-2xl border border-grey-stoke mt-8 ${
									active
										? active === value.category
											? "block"
											: "hidden"
										: "block"
								}`}
								key={value.title}
							>
								<FAQCard {...value} />
							</div>
						))
					) : (
						<TextPrimary
							className="text-dark-grey text-xl text-center mt-5"
							translation="home"
						>
							No FAQs found
						</TextPrimary>
					)}
				</div>
			</div>
		</HomeLayout>
	)
}

export default FAQs

export async function getServerSideProps(context: any) {
	const { req, locale } = context

	return {
		props: {
			...(await serverSideTranslations(locale, ["home"])),
			// Will be passed to the page component as props
		},
	}
}
