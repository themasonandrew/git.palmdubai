/* Build - data-fx-clone */
document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll('[data-fx-clone]').forEach(function (each) {
		const cloneCount = each.dataset.fxClone
		for (let i = 0; i < cloneCount; i++) {
			const cloneBlock = each.cloneNode(true)
			each.insertAdjacentElement('beforebegin', cloneBlock)
		}
	})
})

/* isMobileDevice(), isTouchDevice() */
function isMobileDevice() {
	const mobileDevices = /Mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i
	return mobileDevices.test(navigator.userAgent)
}
function isTouchDevice() {
	return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}
function isDarkDevice() {
	return window.matchMedia('(prefers-color-scheme: dark').matches
}

/* getClosest(), getSibling(), getSiblings(), getChild(), getChildren()  */
function getClosest(element, selector) {
	if (!element) {
		return null
	}
	if (!selector) {
		return element.parentNode
	}
	return element.closest(selector) || null
}
function getSibling(element, selector) {
	if (!element) {
		return null
	}
	const siblings = Array.from(element.parentNode.children).filter(child => child !== element)
	if (!selector) {
		return siblings[0] || null
	}
	return siblings.find(sibling => sibling.matches(selector)) || null
}
function getSiblings(element, selector) {
	if (!element) {
		return []
	}
	const siblings = Array.from(element.parentNode.children).filter(child => child !== element)
	if (!selector) {
		return siblings
	}
	return siblings.filter(sibling => sibling.matches(selector))
}
function getChild(element, selector) {
	if (!element) {
		return null
	}
	const children = Array.from(element.children)
	if (!selector) {
		return children[0] || null
	}
	return children.find(child => child.matches(selector)) || null
}
function getChildren(element, selector) {
	if (!element) {
		return []
	}
	const children = Array.from(element.children)
	if (!selector) {
		return children
	}
	return children.filter(child => child.matches(selector))
}

/* fxCurrencyCalc() && fxCurrencyCheck() */
function fxCurrencyCalc(number, after = '', before = '') {
	return before + number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + after
}
function fxCurrencyCheck() {
	document.querySelectorAll('[data-fx-currency]').forEach(each => {
		const number = each.textContent.toString().replace(/\D/g, '')
		if (number) {
			each.dataset.fxCurrency = number
			each.textContent = fxCurrencyCalc(number, each.dataset.fxCurrencyAfter, each.dataset.fxCurrencyBefore)
		}
	})
}
document.addEventListener('DOMContentLoaded', () => fxCurrencyCheck())

/* fxNumwordCalc() && fxNumwordCheck() */
function fxNumwordCalc(number, words) {
	number = number
	words = words.split(',')
	let n1 = number % 10
	let n2 = number % 100
	if (n1 == 1 && n2 != 11) {
		return number + ' ' + words[0]
	} else if (n1 >= 2 && n1 <= 4 && (n2 < 10 || n2 >= 20)) {
		return number + ' ' + words[1]
	} else {
		return number + ' ' + words[2]
	}
}
function fxNumwordCheck() {
	document.querySelectorAll('[data-fx-numword]').forEach(each => {
		const number = parseInt(each.innerText.toString().replace(/\D/g, ''))
		if (!isNaN(number)) {
			each.dataset.fxNumword = number
			each.textContent = fxNumwordCalc(number, each.dataset.fxNumwordAfter)
		}
	})
}
document.addEventListener('DOMContentLoaded', () => fxNumwordCheck())

/* fxShow() && fxHide() */
const fxShowHideMap = new Map()
function fxShowHandler(element, animationType, animationDuration, animationDisplay) {
	const allAnimations = {
		default: function (el) {
			el.removeAttribute('style')
			el.style.display = animationDisplay
		},
		fade: function (el, animationDuration) {
			let currentOpacity
			if (window.getComputedStyle(el).display === 'none') {
				currentOpacity = 0
			} else {
				currentOpacity = parseFloat(window.getComputedStyle(el).getPropertyValue('opacity'))
			}
			el.removeAttribute('style')
			el.style.transition = window.getComputedStyle(el).transition + ', opacity .1s !important'
			el.style.opacity = currentOpacity
			el.style.display = animationDisplay
			let start = Date.now()
			const loop = function () {
				let progress = (Date.now() - start) / animationDuration
				progress = Math.max(0, Math.min(1, progress))
				el.style.opacity = currentOpacity + progress
				if (progress < 1 || el.style.opacity < 1) {
					fxShowHideMap.set(el, window.requestAnimationFrame(loop))
				} else {
					el.style.transition = ''
					el.style.opacity = ''
					el.style.display = animationDisplay
				}
			}
			fxShowHideMap.set(el, window.requestAnimationFrame(loop))
		},
		slide: function (el, animationDuration) {
			const currentIsHidden = window.getComputedStyle(el).display === 'none'
			const currentStyles = {
				paddingTop: currentIsHidden ? 0 : parseFloat(window.getComputedStyle(el).paddingTop),
				paddingBottom: currentIsHidden ? 0 : parseFloat(window.getComputedStyle(el).paddingBottom),
				marginTop: currentIsHidden ? 0 : parseFloat(window.getComputedStyle(el).marginTop),
				marginBottom: currentIsHidden ? 0 : parseFloat(window.getComputedStyle(el).marginBottom),
				borderTopWidth: currentIsHidden ? 0 : parseFloat(window.getComputedStyle(el).borderTopWidth),
				borderBottomWidth: currentIsHidden ? 0 : parseFloat(window.getComputedStyle(el).borderBottomWidth),
				height: currentIsHidden ? 0 : parseFloat(window.getComputedStyle(el).height)
			}
			el.removeAttribute('style')
			el.style.position = 'absolute'
			el.style.overflow = 'hidden'
			el.style.transition = 'none'
			el.style.display = animationDisplay
			const originalStyles = {
				paddingTop: parseFloat(window.getComputedStyle(el).paddingTop),
				paddingBottom: parseFloat(window.getComputedStyle(el).paddingBottom),
				marginTop: parseFloat(window.getComputedStyle(el).marginTop),
				marginBottom: parseFloat(window.getComputedStyle(el).marginBottom),
				borderTopWidth: parseFloat(window.getComputedStyle(el).borderTopWidth),
				borderBottomWidth: parseFloat(window.getComputedStyle(el).borderBottomWidth),
				height: parseFloat(window.getComputedStyle(el).height)
			}
			el.removeAttribute('style')
			el.style.height = currentStyles.height + 'px'
			el.style.marginTop = currentStyles.marginTop + 'px'
			el.style.marginBottom = currentStyles.marginBottom + 'px'
			el.style.paddingTop = currentStyles.paddingTop + 'px'
			el.style.paddingBottom = currentStyles.paddingBottom + 'px'
			el.style.borderTopWidth = currentStyles.borderTopWidth + 'px'
			el.style.borderBottomWidth = currentStyles.borderBottomWidth + 'px'
			el.style.overflow = 'hidden'
			el.style.transition = window.getComputedStyle(el).transition + ', height .1s, margin-top .1s, margin-bottom .1s, padding-top .1s, padding-bottom .1s, border-top-width .1s, border-bottom-width .1s !important'
			el.style.display = animationDisplay
			let start = Date.now()
			const loop = function () {
				let progress = (Date.now() - start) / animationDuration
				progress = Math.max(0, Math.min(1, progress))
				el.style.height = (progress * originalStyles.height + currentStyles.height) + 'px'
				el.style.marginTop = (progress * originalStyles.marginTop + currentStyles.marginTop) + 'px'
				el.style.marginBottom = (progress * originalStyles.marginBottom + currentStyles.marginBottom) + 'px'
				el.style.paddingTop = (progress * originalStyles.paddingTop + currentStyles.paddingTop) + 'px'
				el.style.paddingBottom = (progress * originalStyles.paddingBottom + currentStyles.paddingBottom) + 'px'
				el.style.borderTopWidth = (progress * originalStyles.borderTopWidth + currentStyles.borderTopWidth) + 'px'
				el.style.borderBottomWidth = (progress * originalStyles.borderBottomWidth + currentStyles.borderBottomWidth) + 'px'
				let temp = parseFloat(window.getComputedStyle(el).height)
				if (progress < 1 && temp <= originalStyles.height) {
					fxShowHideMap.set(el, window.requestAnimationFrame(loop))
				} else {
					el.removeAttribute('style')
					el.style.display = animationDisplay
				}
			}
			fxShowHideMap.set(el, window.requestAnimationFrame(loop))
		}
	}
	const currentAnimation = allAnimations[animationType] || allAnimations.default
	currentAnimation(element, animationDuration)
}
function fxHideHandler(element, animationType, animationDuration, animationDisplay) {
	const allAnimations = {
		default: function (el) {
			el.removeAttribute('style')
			el.style.display = 'none'
		},
		fade: function (el, animationDuration) {
			let defaultOpacity = parseFloat(window.getComputedStyle(el).getPropertyValue('opacity'))
			el.style.transition = window.getComputedStyle(el).transition + ', opacity .1s !important'
			el.style.opacity = defaultOpacity
			el.style.display = animationDisplay
			let start = Date.now()
			const loop = function () {
				let progress = (Date.now() - start) / animationDuration
				progress = Math.max(0, Math.min(1, progress))
				el.style.opacity = defaultOpacity - progress
				let temp = parseFloat(el.style.opacity)
				if (progress < 1 && temp > 0) {
					fxShowHideMap.set(el, window.requestAnimationFrame(loop))
				} else {
					el.removeAttribute('style')
					el.style.display = 'none'
				}
			}
			fxShowHideMap.set(el, window.requestAnimationFrame(loop))
		},
		slide: function (el, animationDuration) {
			const currentStyles = {
				paddingTop: parseFloat(window.getComputedStyle(el).paddingTop),
				paddingBottom: parseFloat(window.getComputedStyle(el).paddingBottom),
				marginTop: parseFloat(window.getComputedStyle(el).marginTop),
				marginBottom: parseFloat(window.getComputedStyle(el).marginBottom),
				borderTopWidth: parseFloat(window.getComputedStyle(el).borderTopWidth),
				borderBottomWidth: parseFloat(window.getComputedStyle(el).borderBottomWidth),
				height: parseFloat(window.getComputedStyle(el).height)
			}
			el.removeAttribute('style')
			el.style.position = 'absolute'
			el.style.overflow = 'hidden'
			el.style.transition = 'none'
			el.style.display = animationDisplay
			const originalStyles = {
				paddingTop: parseFloat(window.getComputedStyle(el).paddingTop),
				paddingBottom: parseFloat(window.getComputedStyle(el).paddingBottom),
				marginTop: parseFloat(window.getComputedStyle(el).marginTop),
				marginBottom: parseFloat(window.getComputedStyle(el).marginBottom),
				borderTopWidth: parseFloat(window.getComputedStyle(el).borderTopWidth),
				borderBottomWidth: parseFloat(window.getComputedStyle(el).borderBottomWidth),
				height: parseFloat(window.getComputedStyle(el).height)
			}
			el.removeAttribute('style')
			el.style.height = currentStyles.height + 'px'
			el.style.marginTop = currentStyles.marginTop + 'px'
			el.style.marginBottom = currentStyles.marginBottom + 'px'
			el.style.paddingTop = currentStyles.paddingTop + 'px'
			el.style.paddingBottom = currentStyles.paddingBottom + 'px'
			el.style.borderTopWidth = currentStyles.borderTopWidth + 'px'
			el.style.borderBottomWidth = currentStyles.borderBottomWidth + 'px'
			el.style.overflow = 'hidden'
			el.style.transition = window.getComputedStyle(el).transition + ', height 0s, margin-top 0s, margin-bottom 0s, padding-top 0s, padding-bottom 0s, border-top-width 0s, border-bottom-width 0s'
			el.style.display = animationDisplay
			let start = Date.now()
			const loop = function () {
				let progress = (Date.now() - start) / animationDuration
				progress = Math.max(0, Math.min(1, progress))
				el.style.height = Math.max((currentStyles.height - originalStyles.height * progress), 0) + 'px'
				el.style.marginTop = (currentStyles.marginTop - originalStyles.marginTop * progress) + 'px'
				el.style.marginBottom = (currentStyles.marginBottom - originalStyles.marginBottom * progress) + 'px'
				el.style.paddingTop = (currentStyles.paddingTop - originalStyles.paddingTop * progress) + 'px'
				el.style.paddingBottom = (currentStyles.paddingBottom - originalStyles.paddingBottom * progress) + 'px'
				el.style.borderTopWidth = (currentStyles.borderTopWidth - originalStyles.borderTopWidth * progress) + 'px'
				el.style.borderBottomWidth = (currentStyles.borderBottomWidth - originalStyles.borderBottomWidth * progress) + 'px'
				let temp = parseFloat(el.style.height)
				if (progress < 1 && temp > 0) {
					fxShowHideMap.set(el, window.requestAnimationFrame(loop))
				} else {
					el.removeAttribute('style')
					el.style.display = 'none'
				}
			}
			fxShowHideMap.set(el, window.requestAnimationFrame(loop))
		}
	}
	const currentAnimation = allAnimations[animationType] || allAnimations.default
	currentAnimation(element, animationDuration)
}
function fxShowHide(functionName, element, animationType, animationDuration, animationDisplay) {
	if (!element) { return }
	if (fxShowHideMap.has(element)) {
		window.cancelAnimationFrame(fxShowHideMap.get(element))
	}
	if (isNaN(animationDuration)) { animationDuration = 200 }
	functionName(element, animationType, animationDuration, animationDisplay)
}
function fxShow(element, animationType = 'default', animationDuration = 200, animationDisplay = 'flex') {
	fxShowHide(fxShowHandler, element, animationType, animationDuration, animationDisplay)
}
function fxHide(element, animationType = 'default', animationDuration = 200, animationDisplay = 'flex') {
	if (window.getComputedStyle(element).display === 'none') { return }
	fxShowHide(fxHideHandler, element, animationType, animationDuration, animationDisplay)
}

/* Build - data-fx-sub */
document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll('[data-fx-sub]').forEach(function (each) {
		each.querySelectorAll('[data-fx-sub-start]').forEach(function (each) {
			each.classList.add('active')
			each.querySelector('[data-fx-sub-button]').classList.add('active')
			fxShow(each.querySelector('[data-fx-sub-block]'))
		})
	})
	document.querySelectorAll('[data-fx-sub-button]').forEach(function (each) {
		each.addEventListener('click', function (e) {
			e.preventDefault()
			const subWrap = getClosest(this, '[data-fx-sub]')
			const subItem = getClosest(this, '[data-fx-sub-item]')
			const subBlock = getSibling(this, '[data-fx-sub-block]')
			const subType = subWrap.dataset.fxSub
			const subAnimation = subWrap.dataset.fxSubAnimation
			if (this.classList.contains('active')) {
				subItem.classList.remove('active')
				this.classList.remove('active')
				fxHide(subBlock, subAnimation)
				return
			}
			if (subType == 'single') {
				subWrap.querySelectorAll('[data-fx-sub-item]').forEach(function (each) {
					each.classList.remove('active')
					each.querySelector('[data-fx-sub-button]').classList.remove('active')
					fxHide(each.querySelector('[data-fx-sub-block]'), subAnimation)
				})
			}
			subItem.classList.add('active')
			this.classList.add('active')
			fxShow(subBlock, subAnimation)
		})
	})
})

/* Build - data-fx-toggle */
document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll('[data-fx-toggle]').forEach(function (each) {
		each.querySelectorAll('[data-fx-toggle-start]').forEach(function (each) {
			const toggleId = each.dataset.fxToggleButton
			const toggleNumber = each.dataset.fxToggleNumber
			const toggleBlock = document.querySelectorAll(`[data-fx-toggle-block='${toggleId}'][data-fx-toggle-number='${toggleNumber}']`)
			each.classList.add('active')
			toggleBlock.forEach(function (each) {
				each.classList.add('active')
				fxShow(each)
			})
		})
	})
	document.querySelectorAll('[data-fx-toggle-button]').forEach(function (each) {
		each.addEventListener('click', function (e) {
			e.preventDefault()
			if (!this.classList.contains('active')) {
				const toggleId = this.dataset.fxToggleButton
				const toggleNumber = this.dataset.fxToggleNumber
				const toggleAnimation = getClosest(this, '[data-fx-toggle]').dataset.fxToggleAnimation
				const toggleBlock = document.querySelectorAll(`[data-fx-toggle-block='${toggleId}'][data-fx-toggle-number='${toggleNumber}']`)
				document.querySelectorAll(`[data-fx-toggle-button='${toggleId}']`).forEach(function (each) {
					each.classList.remove('active')
				})
				document.querySelectorAll(`[data-fx-toggle-block='${toggleId}']`).forEach(function (each) {
					each.classList.remove('active')
					fxHide(each)
				})
				this.classList.add('active')
				toggleBlock.forEach(function (each) {
					each.classList.add('active')
					fxShow(each, toggleAnimation)
				})
			}
		})
	})
})

/* Build - data-fx-animate */
function fxAnimate(element, animation, transition = 1000, reverse = false) {
	if (element) {
		element.dataset.fxAnimate = animation
		element.dataset.fxAnimateTransition = transition
		if (reverse != false) {
			element.dataset.fxAnimateReverse = ''
		}
		fxAnimateCheck()
	}
}
function fxAnimateCheck() {
	document.querySelectorAll('[data-fx-animate]').forEach(function (each) {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop
		const windowHeight = window.innerHeight || document.documentElement.clientHeight
		const elementOffsetTop = each.getBoundingClientRect().top + scrollTop
		const elementHeight = each.offsetHeight
		const isVisible = elementOffsetTop < scrollTop + windowHeight && elementOffsetTop + elementHeight > scrollTop
		if (isVisible) {
			if (!each.classList.contains('animated')) {
				const animation = each.dataset.fxAnimate
				const transition = parseInt(each.dataset.fxAnimateTransition) || 1000
				const transitionMiddle = transition * 1.4
				const transitionMax = transition * 2.4
				const stepMiddle = transition / 14
				const stepMax = transition / 24
				const count = getSiblings(each, '.animated').length
				let transitionTotal = transition + count * stepMiddle
				transitionTotal = transitionTotal >= transitionMiddle ? transitionTotal + count * stepMax : transitionTotal
				transitionTotal = transitionTotal >= transitionMax ? transitionMax : transitionTotal
				const animationValue = `${animation} ${transitionTotal}ms forwards`
				each.style.animation = animationValue
				each.classList.add('animated')
				setTimeout(() => {
					each.style.animation = ''
				}, transitionTotal + 100)
			}
			if (each.hasAttribute('data-fx-animate-reverse')) {
				each.classList.add('animatedReverse')
			}
		} else {
			if (each.hasAttribute('data-fx-animate-reverse')) {
				if (each.classList.contains('animatedReverse')) {
					each.style.animation = ''
					each.classList.remove('animated')
					each.classList.remove('animatedReverse')
				}
			}
		}
	})
}
document.addEventListener('DOMContentLoaded', function () {
	window.addEventListener('load', () => fxAnimateCheck())
	window.addEventListener('resize', () => fxAnimateCheck())
	window.addEventListener('scroll', () => fxAnimateCheck())
})

/* Build - data-fx-upload */
function fxUploadCheck() {
	document.querySelectorAll('[data-fx-upload]').forEach(function (each) {
		if (each.dataset.fxUploadType === 'auto') {
			let step = parseInt(each.dataset.fxUploadStep)
			let wt = window.pageYOffset || document.documentElement.scrollTop
			let wh = window.innerHeight || document.documentElement.clientHeight
			let et = each.getBoundingClientRect().top + wt
			let eh = each.offsetHeight
			while (et + eh <= wt + wh && each.querySelectorAll('.hidden').length) {
				Array.from(each.querySelectorAll('.hidden')).slice(0, step).forEach(function (each) {
					each.classList.remove('hidden')
					fxShow(each, 'fade')
				})
				wt = window.pageYOffset || document.documentElement.scrollTop
				wh = window.innerHeight || document.documentElement.clientHeight
				et = each.getBoundingClientRect().top + wt
				eh = each.offsetHeight
			}
		}
	})
	fxAnimateCheck()
}
document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll('[data-fx-upload]').forEach(function (each) {
		const uploadStart = each.dataset.fxUploadStart
		const uploadItems = each.querySelectorAll('[data-fx-upload-item]')
		const uploadMore = each.querySelector('[data-fx-upload-more]')
		Array.from(uploadItems).slice(0, uploadStart).forEach(function (each) {
			each.style.display = 'flex'
		})
		Array.from(uploadItems).slice(uploadStart).forEach(function (each) {
			each.classList.add('hidden')
		})
		if (each.querySelectorAll('.hidden').length === 0 && uploadMore) {
			uploadMore.remove()
		}
	})
	document.querySelectorAll('[data-fx-upload-more]').forEach(function (each) {
		each.addEventListener('click', function (e) {
			e.preventDefault()
			const uploadList = getClosest(this, '[data-fx-upload]')
			const uploadType = uploadList.dataset.fxUploadType
			const uploadStep = uploadList.dataset.fxUploadStep
			if (uploadType === 'semi') {
				Array.from(uploadList.querySelectorAll('.hidden')).slice(0, uploadStep).forEach(function (each) {
					each.classList.remove('hidden')
					fxShow(each, 'fade')
				})
				if (uploadList.querySelectorAll('.hidden').length === 0) {
					this.remove()
				}
			} else if (uploadType === 'semiauto') {
				uploadList.dataset.fxUploadType = 'auto'
				this.remove()
				fxUploadCheck()
			}
			fxAnimateCheck()
		})
	})
})
document.addEventListener('DOMContentLoaded', function () {
	window.addEventListener('load', () => fxUploadCheck())
	window.addEventListener('resize', () => fxUploadCheck())
	window.addEventListener('scroll', () => fxUploadCheck())
})

/* Build - data-fx-popup */
function fxPopupCall(id) {
	const popupArea = document.querySelector('.sPopup')
	const popupWindow = document.querySelector(`.sPopup__window[data-fx-popup-window='${id}']`)
	const popupWindowActive = document.querySelector('.sPopup__window.active')
	if (popupArea && popupWindow) {
		if (!popupArea.classList.contains('active')) {
			fxShow(popupArea, 'fade', 200)
			popupArea.classList.add('active')
			if (isMobileDevice()) {
				document.body.classList.add('sPopup__bodyhidden')
			} else if (document.body.scrollHeight > window.innerHeight) {
				document.body.classList.add('sPopup__bodyhidden-pc')
			}
		}
		if (popupWindowActive) {
			fxHide(popupWindowActive)
			popupWindowActive.classList.remove('active')
		}
		fxShow(popupWindow, 'fade', 300)
		setTimeout(() => {
			popupWindow.classList.add('active')
		}, 10)
		if (popupWindow.getAttribute('data-fx-popup-hash') !== null) {
			window.location.hash = `#popup-${id}`
		}
	}
}
function fxPopupClose() {
	const popupArea = document.querySelector('.sPopup')
	const popupWindowActive = document.querySelector('.sPopup__window.active')
	if (popupArea && popupWindowActive) {
		document.body.classList.remove('sPopup__bodyhidden', 'sPopup__bodyhidden-pc')
		popupArea.classList.remove('active')
		fxHide(popupArea, 'fade', 300)
		popupWindowActive.classList.remove('active')
		fxHide(popupWindowActive, 'fade', 300)
		history.replaceState(null, null, window.location.pathname + window.location.search)
	}
}
document.addEventListener('DOMContentLoaded', function () {
	const popupHash = window.location.hash
	const popupHashPattern = /^#popup-[a-zA-Z0-9]+$/
	if (popupHash && popupHashPattern.test(popupHash)) {
		const id = popupHash.split('-')[1]
		const window = document.querySelector(`[data-fx-popup-window='${id}']`)
		if (window && window.getAttribute('data-fx-popup-hash') !== null) {
			fxPopupCall(id)
		}
	}
	document.querySelectorAll('[data-fx-popup-call]').forEach(function (each) {
		each.addEventListener('click', function (e) {
			e.preventDefault()
			fxPopupCall(this.dataset.fxPopupCall)
		})
	})
	document.querySelectorAll('[data-fx-popup-submit]').forEach(function (each) {
		each.addEventListener('submit', function (e) {
			e.preventDefault()
			fxPopupCall(each.dataset.fxPopupSubmit)
		})
	})
	document.querySelectorAll('[data-fx-popup-close]').forEach(function (each) {
		each.addEventListener('click', function (e) {
			e.preventDefault()
			fxPopupClose()
		})
	})
	document.addEventListener('mousedown', function (e) {
		const popupWindowActive = document.querySelector('.sPopup__window.active')
		if (popupWindowActive && !popupWindowActive.contains(e.target)) {
			fxPopupClose()
		}
	})
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape') {
			const popupWindowActive = document.querySelector('.sPopup__window.active')
			if (popupWindowActive && !popupWindowActive.contains(e.target)) {
				fxPopupClose()
			}
		}
	})
})

/* Build - data-fx-alert */
let fxAlertTimeout
function fxAlertTimer(time) {
	clearTimeout(fxAlertTimeout)
	fxAlertTimeout = setTimeout(fxAlertClose, time)
}
function fxAlertCall(id) {
	const alertArea = document.querySelector('.sAlert')
	const alertWindow = document.querySelector(`.sAlert__window[data-fx-alert-window='${id}']`)
	const alertWindowActive = document.querySelector('.sAlert__window.active')
	if (alertArea && alertWindow) {
		if (!alertArea.classList.contains('active')) {
			alertArea.classList.add('active')
			fxShow(alertArea, 'fade')
		}
		if (alertWindowActive) {
			fxHide(alertWindowActive)
			alertWindowActive.classList.remove('active')
		}
		fxShow(alertWindow, 'fade')
		setTimeout(() => {
			alertWindow.classList.add('active')
		}, 10)
		const timer = alertWindow.dataset.fxAlertTimer
		if (timer) {
			fxAlertTimer(timer)
		}
	}
}
function fxAlertCustomCall(icon, text, timer) {
	const alertWindowCustom = document.querySelector('.sAlert__window[data-fx-alert-window="custom"]')
	if (alertWindowCustom) {
		alertWindowCustom.querySelector('.sAlert__icon img').setAttribute('src', icon)
		alertWindowCustom.querySelector('.sAlert__content').textContent = text
		if (timer) {
			alertWindowCustom.dataset.fxAlertTimer = timer
		}
		fxAlertCall('custom')
	}
}
function fxAlertClose() {
	const alertArea = document.querySelector('.sAlert')
	const alertWindowActive = document.querySelector('.sAlert__window.active')
	if (alertArea && alertWindowActive) {
		alertArea.classList.remove('active')
		fxHide(alertArea, 'fade')
		alertWindowActive.classList.remove('active')
		fxHide(alertWindowActive, 'fade')
	}
}
document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll('[data-fx-alert-call]').forEach(function (each) {
		each.addEventListener('click', function (e) {
			e.preventDefault()
			fxAlertCall(each.dataset.fxAlertCall)
		})
	})
	document.querySelectorAll('[data-fx-alert-submit]').forEach(function (each) {
		each.addEventListener('submit', function (e) {
			e.preventDefault()
			fxAlertCall(each.dataset.fxAlertSubmit)
		})
	})
	document.querySelectorAll('[data-fx-alert-close]').forEach(function (each) {
		each.addEventListener('click', function (e) {
			e.preventDefault()
			fxAlertClose()
		})
	})
})

/* Build */
document.addEventListener('DOMContentLoaded', function () {
	/* selectArea */
	document.querySelectorAll('.selectArea').forEach(function (each) {
		const li = each.querySelectorAll('li')
		const button = each.querySelector('.selectArea__button')
		const input = each.querySelector('input')
		button.addEventListener('click', function (e) {
			e.preventDefault()
			const list = getSibling(this, '.selectArea__list')
			const animation = getClosest(this, '.selectArea').dataset.selectAnimation
			if (this.classList.contains('active')) {
				fxHide(list, animation)
			} else {
				fxShow(list, animation)
			}
			this.classList.toggle('active')
		})
		if (input) {
			input.addEventListener('focus', function (e) {
				this.blur()
			})
		}
		li.forEach(function (each) {
			each.addEventListener('click', function (e) {
				e.preventDefault()
				const selectArea = getClosest(this, '.selectArea')
				const button = selectArea.querySelector('.selectArea__button')
				const list = selectArea.querySelector('.selectArea__list')
				const input = selectArea.querySelector('input')
				const valueForInput = this.dataset.selectValue
				const valueForButton = this.innerHTML
				const animation = selectArea.dataset.selectAnimation
				input.value = valueForInput
				button.innerHTML = valueForButton
				button.classList.remove('active')
				fxHide(list, animation)
			})
		})
	})
	document.addEventListener('mousedown', function (e) {
		document.querySelectorAll('.selectArea').forEach(function (each) {
			const button = each.querySelector('.selectArea__button')
			const list = each.querySelector('.selectArea__list')
			const animation = each.dataset.selectAnimation
			if (button.classList.contains('active') && !each.contains(e.target)) {
				button.classList.remove('active')
				fxHide(list, animation)
			}
		})
	})
	/* passwordArea */
	document.querySelectorAll('.passwordArea').forEach(function (each) {
		const button = each.querySelector('.passwordArea__button')
		button.addEventListener('click', function (e) {
			e.preventDefault()
			const input = getSibling(this, 'input')
			if (input.type == 'text') {
				input.setAttribute('type', 'password')
			} else {
				input.setAttribute('type', 'text')
			}
		})
	})
	/* numberArea */
	document.querySelectorAll('.numberArea').forEach(function (each) {
		const input = each.querySelector('input')
		const minusButton = each.querySelector('.numberArea__minus')
		const plusButton = each.querySelector('.numberArea__plus')
		input.addEventListener('input', function () {
			const min = input.dataset.numberMin
			const max = input.dataset.numberMax
			let current = parseFloat(this.value)
			if (!isNaN(current)) {
				current = Math.min(max, Math.max(min, current))
				this.value = current
			}
			calc()
		})
		function calc(el) {
			const min = parseFloat(input.dataset.numberMin) || 1
			const max = parseFloat(input.dataset.numberMax) || Infinity
			const step = parseFloat(input.dataset.numberStep) || 1
			let current = parseFloat(input.value) || min - step
			if (el) {
				if (el.classList.contains('numberArea__plus')) {
					current += step
				} else {
					current -= step
				}
			}
			current = Math.min(max, Math.max(min, current))
			if (Number.isInteger(step)) {
				input.value = current
			} else {
				input.value = current.toFixed(2)
			}
			if (input.value == min) {
				minusButton.dataset.numberDisabled = true
			} else {
				minusButton.dataset.numberDisabled = false
			}
			if (input.value == max) {
				plusButton.dataset.numberDisabled = true
			} else {
				plusButton.dataset.numberDisabled = false
			}
		}
		calc()
		minusButton.addEventListener('click', function (e) {
			e.preventDefault()
			if (this.dataset.numberDisabled == 'true') {
				return
			}
			calc(this)
		})
		plusButton.addEventListener('click', function (e) {
			e.preventDefault()
			if (this.dataset.numberDisabled == 'true') {
				return
			}
			calc(this)
		})
	})
	/* time */
	document.querySelectorAll('time[data-fx-time-format]').forEach(function (each) {
		const datetime = each.getAttribute('datetime')
		const format = each.dataset.fxTimeFormat
		const type = each.dataset.fxTimeType
		const current = moment(datetime, 'YYYY-MM-DD HH:mm')
		if (type == '1') {
			if (current.isSame(moment(), 'day')) {
				each.textContent = 'Сегодня в ' + current.format('HH:mm')
			} else if (current.isSame(moment().subtract(1, 'day'), 'day')) {
				each.textContent = 'Вчера в ' + current.format('HH:mm')
			} else {
				each.textContent = current.format(format)
			}
		} else if (type == '2') {
			each.textContent = current.fromNow()
		} else {
			each.textContent = current.format(format)
		}
	})
	/* input[type=email] pattern */
	document.querySelectorAll('input[type="email"]').forEach(function (each) {
		each.setAttribute('pattern', '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$')
	})
	/* textarea */
	document.querySelectorAll('.textareaArea textarea').forEach(function (each) {
		each.setAttribute('style', 'height: ' + each.scrollHeight + 'px; min-height: ' + each.scrollHeight + 'px;')
		each.addEventListener('input', function () {
			each.style.height = 0
			each.style.height = each.scrollHeight + 'px'
		})
	})
})

/* Libs - Other */
document.addEventListener('DOMContentLoaded', function () {
	/* Inputmask */
	if (typeof Inputmask !== 'undefined') {
		Inputmask({
			mask: '+7 999 999-99-99',
			placeholder: '',
			clearIncomplete: true,
			showMaskOnHover: false,
			jitMasking: true
		}).mask(document.querySelectorAll('input[type=tel]'))
	}
	/* Fancybox */
	if (typeof Fancybox !== 'undefined') {
		Fancybox.bind('[data-fancybox]', {})
	}
})