import { useRouter } from "next/router"
import { useState, useEffect } from "react"

const useNetworkConnection = () => {
	const { pathname } = useRouter()
	const [online, setOnline] = useState(true)
	const [noInternetConnection, setNoInternetConnection] = useState(false)
	const [currentPathname, setCurrentPathname] = useState("")

	const handleInternetConnectionChange = () => {
		setOnline(navigator.onLine)
	}

	useEffect(() => {
		if (online) {
			setCurrentPathname(pathname)
		} else {
			if (pathname !== currentPathname) {
				setNoInternetConnection(true)
			}
		}
	}, [pathname])

	useEffect(() => {
		if (online) {
			setNoInternetConnection(false)
		}
	}, [online])

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("online", handleInternetConnectionChange)
			window.addEventListener("offline", handleInternetConnectionChange)
			handleInternetConnectionChange()
		}
		return () => {
			if (typeof window !== "undefined") {
				window.removeEventListener(
					"online",
					handleInternetConnectionChange
				)
				window.removeEventListener(
					"offline",
					handleInternetConnectionChange
				)
			}
		}
	}, [])

	return { noInternetConnection }
}

export default useNetworkConnection
