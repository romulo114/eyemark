/** @format */

import "@/styles/globals.scss"
import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import { persistor, store } from "@/store/index"
import { appWithTranslation } from "next-i18next"
import { PersistGate } from "redux-persist/integration/react"
import { ToastContainer } from "react-toastify"
import { contextClass } from "@/constants/general/defaults"
import "react-toastify/dist/ReactToastify.css"
import Loader from "@/components/shared/loader"
import Head from "next/head"
import { ErrorBoundary } from "react-error-boundary"
import Page500 from "@/components/layouts/500page"
import useNetworkConnection from "@/hooks/networkConnection"
import NoInternet from "@/components/layouts/noInternet"
import Script from "next/script"

export const storeRef = store
function MyApp({ Component, pageProps }: AppProps) {
	const { noInternetConnection } = useNetworkConnection()

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Loader />
				<Script
					id="my-script"
					strategy="lazyOnload"
					src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
				/>

				<Script strategy="lazyOnload" id="my-script2">
					{`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
				</Script>
				<Head>
					<title>
						Eyemark - the easiest way to discover and track
						government projects anytime, anywhere in Nigeria
					</title>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
					/>
					<meta
						name="msapplication-config"
						content="/browserconfig.xml"
					/>
					<meta name="msapplication-TileColor" content="#ffffff" />
					<meta name="theme-color" content="#ffffff" />
					<meta name="og:title" content="Eyemark" />
					<meta
						name="og:image"
						content="https://img.mailinblue.com/4578382/images/content_library/original/623c46d8a67b4d63cc2f00a2.png"
					/>
					<meta
						name="og:description"
						content="Eyemark is an application that enables you to discover and engage on public projects in Nigeria."
					/>
					<meta
						name="keywords"
						content="Eyemark, Discover Projects, Government Projects, Projects in Nigeria, Discover Projects in Nigeria, Projects in Lagos, Construction projects in Nigeria, eye mark, i mac, imac, nigeria budget"
					/>

					<meta name="twitter:card" content="summary_large_image" />
					<meta name="twitter:title" content="Eyemark" />
					<meta
						name="twitter:description"
						content="Eyemark is an application that enables you to discover and engage on public projects in Nigeria."
					/>
					<meta
						name="twitter:image"
						content="https://img.mailinblue.com/4578382/images/content_library/original/623c46d8a67b4d63cc2f00a2.png"
					/>
				</Head>
				<ToastContainer
					toastClassName={(className) =>
						contextClass[className?.type || "default"] +
						" relative flex p-1 z-above-modal min-h-10 rounded-md overflow-hidden cursor-pointer bg-dark-grey mb-4"
					}
					bodyClassName={() =>
						"text-sm flex font-white medium block p-3"
					}
					position="top-right"
					autoClose={3000}
					hideProgressBar
				/>
				<ErrorBoundary
					FallbackComponent={Page500}
					onReset={() => {
						// reset the state of your app so the error doesn't happen again
					}}
				>
					{noInternetConnection ? (
						<NoInternet />
					) : (
						<Component {...pageProps} />
					)}
				</ErrorBoundary>
			</PersistGate>
		</Provider>
	)
}

export default appWithTranslation(MyApp)
