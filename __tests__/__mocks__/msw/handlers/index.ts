/** @format */

import { authHandlers } from "./auth.handlers"
import { projectHandlers } from "./project.handlers"

export default [...authHandlers, ...projectHandlers]
