/** @format */

const distance: number[] = [10, 20, 50]
const distanceRange = [
	{ label: "10KM", distance: 10000 },
	{ label: "20KM", distance: 20000 },
	{ label: "50KM", distance: 50000 },
]
const formatRange = { 10000: "10KM", 20000: "20KM", 50000: "50KM" }
const locationOptions = {
	enableHighAccuracy: false,
	timeout: 5000,
	maximumAge: 0,
}
export { distance, distanceRange, formatRange, locationOptions }
