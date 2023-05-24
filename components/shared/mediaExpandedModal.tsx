/** @format */

import React, { FC, SyntheticEvent } from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { mediaExpandModalPropTypes } from "@/@types/components/modal.types"
import projectAssets from "@/public/assets/SVG/project"
import Image from "next/image"
import styles from "@/styles/modal.module.scss"

const MediaExpandedModal: FC<mediaExpandModalPropTypes> = ({
	close,
	images,
	activeIndex,
}) => {
	const prevent = (e: SyntheticEvent<HTMLDivElement>) => {
		e.stopPropagation()
	}

	return (
		<div className="h-full z-10 overflow-hidden" onClick={prevent}>
			<div className="h-full w-full">
				{images.length > 0 && (
					<div className="h-full w-full relative">
						<div className="bg-transparent h-full w-full relative z-50">
							<Carousel
								selectedItem={activeIndex}
								autoPlay={false}
								className="h-full w-full"
								renderArrowPrev={(clickHandler, hasPrev) => {
									return (
										hasPrev && (
											<button
												className="z-50 absolute left-2 sm:left-0 top-1/2"
												onClick={clickHandler}
											>
												<Image
													src={
														projectAssets[
															"previous"
														]
													}
													className="w-9"
												/>
											</button>
										)
									)
								}}
								renderArrowNext={(clickHandler, hasNext) => {
									return (
										hasNext && (
											<button
												className="z-50 absolute right-2 sm:right-0 top-1/2"
												onClick={clickHandler}
											>
												<Image
													src={projectAssets["next"]}
													className="w-9"
												/>
											</button>
										)
									)
								}}
								showIndicators={false}
								showThumbs={false}
							>
								{images.map(
									(
										{
											id,
											image,
											is_live_photo,
											latitude,
											longitude,
											state,
										},
										index
									) => (
										<div
											key={index}
											className="relative z-50 max-h-screen h-full"
										>
											<div className="h-full sm:11/12 w-full mx-auto object-contain object-center rounded-lg">
												<Image
													src={image}
													alt={id}
													layout="fill"
													objectFit="contain"
												/>
											</div>
											{is_live_photo && (
												<div className="flex justify-center items-center">
													<div
														className={
															styles["live-photo"]
														}
													>
														<Image
															src={
																projectAssets[
																	"livePhoto"
																]
															}
															className="h-4"
														/>
														<p className="text-2-xs text-white whitespace-nowrap">
															Live Photo
														</p>
													</div>
												</div>
											)}
											{state && (
												<div className="w-full flex justify-center bg-transparent absolute bottom-20">
													<div
														className={`rounded-lg p-3 ${styles["long-lat"]}`}
													>
														<p className="text-2-xs">
															{state}
														</p>
														<div className="mt-2 text-3-xs flex space-x-4">
															<p>
																<span className="text-light-grey-2">
																	Lat:
																</span>{" "}
																{latitude}°
															</p>
															<p>
																<span className="text-light-grey-2">
																	Long:
																</span>{" "}
																{longitude}°
															</p>
														</div>
													</div>
												</div>
											)}
										</div>
									)
								)}
							</Carousel>
						</div>
						<div className="flex absolute top-20 sm:top-4 right-4 z-50">
							<button className="" onClick={close}>
								<Image src={projectAssets["removeIcon"]} />
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default MediaExpandedModal
