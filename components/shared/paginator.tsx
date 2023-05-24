/** @format */

import { paginatorPropTypes } from "@/@types/components/general.types"
import { FC } from "react"
import ReactPaginate from "react-paginate"

const Paginator: FC<paginatorPropTypes> = ({ click, count, selected }) => {
	const pageCount = Math.ceil(count / 50)

	if (pageCount >= 2)
		return (
			<ReactPaginate
				breakLabel=".."
				nextLabel=">"
				onPageChange={click}
				pageRangeDisplayed={window.innerWidth <= 768 ? 2 : 3}
				pageCount={pageCount}
				previousLabel="<"
				containerClassName={
					"flex items-center justify-center pt-2 pb-5 lg:pb-10 text-dark-grey space-x-px"
				}
				pageClassName={
					"h-9 w-10 hover:bg-accepted hover:text-white transition ease-in-out duration-300 bg-accepted-light"
				}
				previousClassName={
					"h-9 w-10 rounded-l  flex items-center justify-center hover:bg-accepted hover:text-white transition ease-in-out duration-300 bg-accepted-light"
				}
				nextClassName={
					"h-9 w-10 rounded-r medium flex items-center justify-center hover:bg-accepted hover:text-white transition ease-in-out duration-300 bg-accepted-light"
				}
				breakClassName={
					"h-9 w-10 hover:bg-accepted hover:text-white transition ease-in-out duration-300 bg-accepted-light"
				}
				pageLinkClassName={
					"h-full w-full medium flex items-center justify-center overflow-hidden focus:outline-none"
				}
				nextLinkClassName={"medium"}
				previousLinkClassName={"medium"}
				breakLinkClassName={
					"h-full w-full flex items-center justify-center overflow-hidden focus:outline-none bg-accepted-light"
				}
				activeLinkClassName={
					"h-full w-full medium flex items-center bg-accepted text-white"
				}
				forcePage={selected}
			/>
		)
	return <></>
}

export default Paginator
