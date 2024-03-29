const colorTogglerInput = document.querySelector('.sColorToggler input')
colorTogglerInput.addEventListener('change', function (e) {
	const status = this.checked
	if (status) {
		document.querySelector('body').classList.add('dark')
	} else {
		document.querySelector('body').classList.remove('dark')
	}
})

/* .sTemplateGallery */
document.querySelectorAll('.sTemplateGallery.swiper').forEach(function (each) {
	const index = each.dataset.swiper
	const mainSwiper = `.sTemplateGallery.swiper[data-swiper=${index}]`
	const thumbsSwiper = `.sTemplateGalleryThumbs.swiper[data-swiper=${index}]`
	if (document.querySelector(thumbsSwiper)) {
		const unicVariableUsingIndexThumb = new Swiper(thumbsSwiper, {
			slidesPerView: 3,
			spaceBetween: 8,
			watchSlidesProgress: true,
			breakpoints: {
				500: {
					slidesPerView: 4,
					spaceBetween: 8,
				},
			},
		})
		new Swiper(mainSwiper, {
			slidesPerView: 1,
			spaceBetween: 12,
			autoHeight: true,
			watchSlidesProgress: true,
			thumbs: {
				swiper: unicVariableUsingIndexThumb,
			},
		})
	} else {
		new Swiper(mainSwiper, {
			slidesPerView: 1,
			spaceBetween: 12,
			autoHeight: true,
			watchSlidesProgress: true,
		})
	}
})

/* Build - data-fx-tooltip */
document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll('[data-fx-tooltip]').forEach(function (each) {
		each.addEventListener('mouseenter', function () {
			if (!isMobileDevice()) {
				const tooltipArea = document.querySelector('.tooltipArea')
				if (!tooltipArea) {
					/* */
					let tooltipContent
					if (each.dataset.build) {
						const buildId = each.dataset.build
						const buildCurrent = builds[buildId]
						tooltipContent = `
						<div class="sBuild">
							<picture class="sBuild__image">
								<img src="${buildCurrent.imagePath}" alt="${buildCurrent.name}">
							</picture>
							<div class="sBuild__content">
								<h2 class="sTitle" data-styles="fzs cb">${buildCurrent.name}</h2>
								<p class="sBuild__content-description">${buildCurrent.description}</p>
								<div class="sBuild__content-params"><p>от <span>${fxCurrencyCalc(buildCurrent.price, ' $', '')}</span></p><p>от <span>${buildCurrent.area} м²</span></p></div>
								<div class="sBuild__content-action">Нажмите на объект, чтобы узнать больше</div>
							</div>
						</div>
						`
					} else {
						tooltipContent = each.dataset.fxTooltip
					}
					/* */
					document.body.insertAdjacentHTML('beforeend', `<dialog class="tooltipArea">${tooltipContent}</dialog>`)
				}
			}
		})
		each.addEventListener('mouseleave', function () {
			if (!isMobileDevice()) {
				const tooltipArea = document.querySelector('.tooltipArea')
				if (tooltipArea) {
					tooltipArea.remove()
				}
			}
		})
		each.addEventListener('mousemove', function (e) {
			if (!isMobileDevice()) {
				const tooltipArea = document.querySelector('.tooltipArea')
				if (tooltipArea) {
					const { innerWidth, innerHeight, scrollY } = window
					let posLeft = e.pageX + 5
					let posTop = e.pageY + 15
					const tooltipWidth = tooltipArea.offsetWidth
					const tooltipHeight = tooltipArea.offsetHeight
					if (innerWidth < posLeft + tooltipWidth) {
						posLeft = innerWidth - tooltipWidth
					}
					if (innerHeight + scrollY < posTop + tooltipHeight) {
						posTop = innerHeight + scrollY - tooltipHeight
					}
					tooltipArea.style.left = `${posLeft}px`
					tooltipArea.style.top = `${posTop}px`
				}
			}
		})
	})
})

document.querySelectorAll('.sAbout__more').forEach(function (each) {
	each.addEventListener('click', function (e) {
		fxShow(getSibling(this, '.sAbout__text.thisShort'), 'slide')
		getSibling(this, '.sAbout__text.thisShort').classList.add('thisFull')
		this.remove()
	})
})

// sHotels
const sTopswiperSwiper = new Swiper('.sTopSwiper.swiper', {
	slidesPerView: 1,
	// effect: 'slide',
	autoplay: {
		delay: 5000,
		disableOnInteraction: true,
		pauseOnMouseEnter: true,
	},
	navigation: {
		nextEl: '.sHotelsNext',
		prevEl: '.sHotelsPrev',
	},
})
const hotelsSwiper = new Swiper('.sHotels.swiper', {
	slidesPerView: 'auto',
	autoplay: {
		delay: 5000,
		disableOnInteraction: true,
		pauseOnMouseEnter: true,
	},
	navigation: {
		nextEl: '.sHotelsNext',
		prevEl: '.sHotelsPrev',
	},
})
const reviewsSwiper = new Swiper('.sReviews.swiper', {
	slidesPerView: 'auto',
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.sReviewsNext',
		prevEl: '.sReviewsPrev',
	},
})
const placesSwiper = new Swiper('.sPlaces.swiper', {
	slidesPerView: 'auto',
	autoplay: {
		delay: 5000,
		disableOnInteraction: true,
		pauseOnMouseEnter: true,
	},
	navigation: {
		nextEl: '.sPlacesNext',
		prevEl: '.sPlacesPrev',
	},
})


ymaps3.ready.then(() => {
	const map = new ymaps3.YMap(document.getElementById('yandexmap'), {
		location: {
			center: [55.18340765600578, 25.108969700416637],
			zoom: 13
		},
		mode: 'vector'
	})
	map.addChild(new ymaps3.YMapDefaultSchemeLayer())
	map.addChild(new ymaps3.YMapDefaultFeaturesLayer())

	//Добавление метки на карту
	const el = document.createElement('div')
	el.className = 'yandexMapMarker'
	// el.onclick = () => map.update({ location: { ...LOCATION, duration: 400 } })
	map.addChild(new ymaps3.YMapMarker({ coordinates: [55.1328533804931, 25.118503547518667] }, el))

	function yandexMapCheck() {
		let centerPosition = [55.18340765600578, 25.108969700416637]
		let zoom = 13
		if (window.innerWidth <= 1000) {
			centerPosition = [55.152285994873004, 25.113866807043095]
		}
		if (window.innerWidth <= 550) {
			centerPosition = [55.139325560913036, 25.113554221824185]
		}
		map.setLocation({
			center: centerPosition,
			zoom: zoom
		})
	}
	yandexMapCheck()
	window.addEventListener('resize', yandexMapCheck)
})



document.addEventListener('DOMContentLoaded', function () {


	const pins = document.querySelectorAll('.sMap__wrap-pin')
	const builds = document.querySelectorAll('.sMap__wrap-build')
	const caption = document.querySelector('.sMap__caption')
	function showPins() {
		pins.forEach(function (each) {
			fxShow(each, 'fade', 100)
		})
	}
	function hidePins() {
		pins.forEach(function (each) {
			fxHide(each, 'fade', 100)
		})
	}
	builds.forEach(function (each) {
		each.addEventListener('mouseenter', function (e) {
			caption.classList.add('thisOpacity')
			const id = each.dataset.build
			document.querySelectorAll(`[data-build="${id}"]`).forEach(function (each) {
				each.classList.add('thisHovered')
			})
		})
		each.addEventListener('mouseleave', function (e) {
			caption.classList.remove('thisOpacity')
			const id = each.dataset.build
			document.querySelectorAll(`[data-build="${id}"]`).forEach(function (each) {
				each.classList.remove('thisHovered')
			})
		})
	})
	if (window.width < 700) {
		var el = document.querySelector(".sMap")
		el.scrollLeft = 220
	}
})