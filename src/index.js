import './index.scss'
import $ from 'jquery'
import { getQueryParams } from './getQueryParams'

let myWindow

function centerWindow() {
	const width = 1920
	const height = 1080
	window.resizeBy(width, height)
	const left = parseInt(screen.availWidth / 2 - width / 2)
	const top = parseInt(screen.availHeight / 2 - height / 2)
	const windowFeatures = `width=${width},height=${height},status,resizable,left=${left},top=${top}screenX=${left},screenY=${top}`
	myWindow = window.open(url, 'subWind', windowFeatures)
}

class FrameView {
	constructor($root) {
		this.$root = $root
	}

	render(layout, urls, title) {
		if (!urls) {
			return
		}

		this.$root.parents('body').addClass('js-enabled')

		this.$root
			.parents('html')
			.find('title')
			.text(title || 'Frame Splits')

		this.$root
			.empty()
			.removeClass(`layout-${this.$root.attr('data-layout-class')}`)
			.addClass(`layout-${layout}`)
			.attr('data-layout-class', layout)

		this.$root.append(
			$(urls).map(
				(index, url) =>
					$('<iframe>')
						.attr('src', url)
						.addClass(`item item-${index + 1}`)[0]
			)
		)

		const editLink = this.$root.parent().find('.build a')
		editLink.attr('href', editLink.attr('href') + document.location.search)
	}
}

const view = new FrameView($('.container .layout'))
const params = getQueryParams(document.location.search)

view.render(params.layout, params.url, params.title)
