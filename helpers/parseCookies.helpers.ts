/** @format */

import cookie from "cookie"

export function parseCookie(req: any) {
	return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
}
