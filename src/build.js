import $ from 'jquery'
import { getQueryParams } from './getQueryParams'

class BuildView {
	constructor($root) {
		this.$root = $root

		// Scope for progressively enhanced styling
		$root.addClass('js-enhanced')

		this.setupLayouts()
		this.setupUrls()

		$('input[name=layout]:radio').change(
			$.proxy(
				(event) => this.onLayoutChange($(event.target).attr('value')),
				this
			)
		)

		this.updateLayout(
			$('input[name=layout]:radio')
				.first()
				.attr('value')
		)
	}

	setupLayouts() {
		$("input[name='layout']").map(function() {
			const $this = $(this)
			$this
				.parent('label')
				.append(
					$(`<div class="layout layout-thumb layout-${$this.val()}">`).append(
						$(
							'<div class="item item-1"></div><div class="item item-2"></div>' +
								'<div class="item item-3"></div><div class="item item-4"></div>'
						)
					)
				)
		})
	}

	setupUrls() {
		$('section.urls ol')
			.addClass('layout')
			.find('> li')
			.each((index, item) => {
				$(item).addClass(`item item-${index + 1}`)
			})
			.find('input')
			.attr('placeholder', 'Insert valid URL')
	}

	update(params) {
		if (params.title) {
			this.updateTitle(params.title)
		}
		if (params.url) {
			this.updateUrls(params.url)
		}
		if (params.layout) {
			this.updateLayout(params.layout)
		}
	}

	updateTitle(title) {
		$('input[name=title]').attr('value', title)
	}

	updateLayout(layout) {
		$(`input[name=layout][value='${layout}']:radio`)
			.prop('checked', true)
			.trigger('change')
	}

	updateUrls(urls) {
		$('section.urls ol > li').each((index, item) => {
			if (urls[index]) {
				$(item)
					.find('input')
					.attr('value', urls[index])
			}
		})
	}

	onLayoutChange(layout) {
		$('section.urls ol').attr('class', `layout layout-${layout}`)
		this.setSelectedLayout(layout)
	}

	setSelectedLayout(layout) {
		$('section.layouts ol > li').removeClass('selected')
		$(`input[name=layout][value='${layout}']:radio`)
			.parents('li')
			.addClass('selected')
	}
}

const params = getQueryParams(document.location.search)
const view = new BuildView($('body'))

view.update(params)
