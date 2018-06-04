/* eslint-disable no-unused-vars */

// Hand rolled, but super useful for pulling radiator config from URLs
// Needs pulling out into a separate repo for easier re-use and testing
export function getQueryParams(queryString) {
	const resultParams = {}
	const keyValueStrings = queryString.replace(/^\?/, '').split('&')

	for (let i = 0; i < keyValueStrings.length; i++) {
		const keyValuePair = keyValueStrings[i].split('=')
		let key = decodeURIComponent(keyValuePair[0])
		const value = decodeURIComponent(keyValuePair[1]).replace(/\+/g, ' ')

		// Handle array style parameters
		if (key.substring(key.length - 2) === '[]') {
			// Strip [] to get the real param key
			key = key.replace(/\[\]$/, '')

			// Ensure the result is an array, if not set
			resultParams[key] = resultParams[key] || []
			resultParams[key].push(value)
		} else {
			resultParams[key] = value
		}
	}
	return resultParams
}
